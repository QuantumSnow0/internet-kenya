import Image from "next/image";
import { notFound } from "next/navigation";
import { getCountiesForProvider } from "@/app/data/locationCoverage";
import { providerLogoAccent } from "@/app/data/providerAccents";
import { providers } from "@/app/data/providers";
import { getAirtel5GPlans } from "@/app/data/airtelPlans";
import { ProviderLocationSelect } from "./_components/ProviderLocationSelect";
import { FiveGPlansSection } from "./_components/FiveGPlansSection";
import { Carousel } from "@/app/components/Carousel";
import { DiscoverSection } from "./_components/DiscoverSection";
import { SafaricomFiberSection } from "./_components/SafaricomFiberSection";
import { Safaricom5GSection } from "./_components/Safaricom5GSection";

const SAFARICOM_CAROUSEL_IMAGES = [
  { src: "/home-carousel/safaricom-5g-router.png", alt: "Safaricom 5G router" },
  { src: "/home-carousel/Safaricom-router.jpg", alt: "Safaricom router" },
] as const;

const PROVIDER_SLUGS = providers.map((provider) => provider.slug);
const PROVIDER_SET = new Set<string>(PROVIDER_SLUGS);

function getSingleQueryValue(value: string | string[] | undefined) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] ?? "";
  return "";
}

export async function generateStaticParams() {
  return PROVIDER_SLUGS.map((slug) => ({ slug }));
}

export default async function ProviderPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ county?: string | string[] }>;
}) {
  const { slug } = await params;
  if (!PROVIDER_SET.has(slug)) notFound();
  const provider = providers.find((item) => item.slug === slug);
  if (!provider) notFound();

  const query = await searchParams;
  const county = decodeURIComponent(getSingleQueryValue(query.county)).trim();
  const allowedCounties = getCountiesForProvider(provider.slug);

  // Safaricom: cleared for new design. Other providers keep existing sections.
  const fiveGPlans =
    provider.slug === "airtel" ? getAirtel5GPlans() : [];

  return (
    <div className="overflow-visible -mx-4 sm:-mx-6">
      {provider.slug !== "safaricom" && (
        <header className="sticky top-0 z-10 grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 border-b border-white/15 bg-[rgb(25,28,41)] px-3 pb-3 pt-3 max-[320px]:grid-cols-1 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-b p-2 shadow-[0_6px_16px_rgba(0,0,0,0.22)] max-[320px]:hidden ${providerLogoAccent[provider.accent]}`}
            >
              <Image
                src={provider.logo}
                alt={provider.name}
                width={provider.imageSize.width}
                height={provider.imageSize.height}
                className="h-full w-full object-contain object-center"
                priority
                sizes="48px"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white sm:text-base">
                {provider.name}
              </p>
              <p className="truncate text-[11px] text-white/70 max-[320px]:hidden sm:text-xs">
                {provider.slogan}
              </p>
            </div>
          </div>

          <div className="ml-3 text-right max-[320px]:ml-0 max-[320px]:text-left">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-white/55 uppercase">
              Location
            </p>
            <ProviderLocationSelect
              providerSlug={provider.slug}
              county={county}
              counties={allowedCounties}
            />
          </div>
        </header>
      )}

      {provider.slug === "safaricom" && (
        <section className="relative left-1/2 w-screen -translate-x-1/2 -mt-4 sm:-mt-6 md:left-0 md:right-0 md:w-full md:max-w-6xl md:mx-auto md:translate-x-0 md:rounded-xl" aria-label="Safaricom carousel">
          <Carousel
            images={SAFARICOM_CAROUSEL_IMAGES}
            ariaLabel="Safaricom"
            intervalMs={4000}
            className="w-full overflow-hidden"
            innerClassName="h-[40vh] min-h-[200px]"
          />
        </section>
      )}

      <div className="min-w-0 bg-[rgb(25,28,41)] pl-3 pr-0 pt-3 sm:pl-6 sm:pr-0 sm:pt-4">
        {provider.slug === "safaricom" ? (
          <main className="mt-2 min-h-[40vh]" aria-label="Safaricom plans">
            <h1 className="font-discover text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Discover
            </h1>
            <DiscoverSection />
            <SafaricomFiberSection />
            <Safaricom5GSection />
          </main>
        ) : (
          <>
            {fiveGPlans.length > 0 && (
              <FiveGPlansSection
                plans={fiveGPlans}
                devicePricing={null}
                accent={provider.slug === "airtel" ? "red" : "violet"}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
