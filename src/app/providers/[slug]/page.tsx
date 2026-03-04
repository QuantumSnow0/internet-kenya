import Image from "next/image";
import { notFound } from "next/navigation";
import { getCountiesForProvider } from "@/app/data/locationCoverage";
import { providers } from "@/app/data/providers";
import {
  getRecommendedTieredPlans,
  getSafaricom5GDevicePricing,
  getSafaricom5GPlans,
  getSafaricomTieredPlans,
} from "@/app/data/safaricomPlans";
import { ProviderLocationSelect } from "./_components/ProviderLocationSelect";
import { FiveGPlansSection } from "./_components/FiveGPlansSection";
import { RecommendedDeals } from "./_components/RecommendedDeals";
import { TierUnlimitedPlansSection } from "./_components/TierUnlimitedPlansSection";
import { ProviderValueComparison } from "./_components/ProviderValueComparison";

const PROVIDER_SLUGS = providers.map((provider) => provider.slug);
const PROVIDER_SET = new Set<string>(PROVIDER_SLUGS);
const providerAccentClass = {
  emerald: "from-emerald-300 via-emerald-100 to-white",
  red: "from-red-300 via-red-100 to-white",
  white: "from-neutral-300 via-neutral-100 to-white",
} as const;

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

  // Recommended deals: tiered plans with offers. Later from DB/CMS; title configurable.
  const recommendedTitle = "❤️ Deals you will like";
  const recommendedPlans =
    provider.slug === "safaricom" ? getRecommendedTieredPlans() : [];
  const fiveGPlans =
    provider.slug === "safaricom" ? getSafaricom5GPlans() : [];
  const fiveGDevicePricing =
    provider.slug === "safaricom" ? getSafaricom5GDevicePricing() : null;
  const tieredUnlimitedPlans =
    provider.slug === "safaricom" ? getSafaricomTieredPlans() : [];

  return (
    <>
      <section className="min-h-0 bg-[rgb(25,28,41)] -mx-4 px-3 pt-3 sm:mx-0 sm:px-6 sm:pt-4">
        <header className="sticky top-0 z-10 grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 border-b border-white/15 bg-[rgb(25,28,41)] pb-3 max-[320px]:grid-cols-1">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-b p-2 shadow-[0_6px_16px_rgba(0,0,0,0.22)] max-[320px]:hidden ${providerAccentClass[provider.accent]}`}
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
        <div className="pt-3 sm:pt-4">
          <ProviderValueComparison
            currentSlug={provider.slug}
            county={county.length > 0 ? county : undefined}
          />
        </div>
        {recommendedPlans.length > 0 && (
          <RecommendedDeals title={recommendedTitle} items={recommendedPlans} />
        )}
        {fiveGPlans.length > 0 && (
          <FiveGPlansSection
            plans={fiveGPlans}
            devicePricing={fiveGDevicePricing}
          />
        )}
        {tieredUnlimitedPlans.length > 0 && (
          <TierUnlimitedPlansSection plans={tieredUnlimitedPlans} />
        )}
      </section>
    </>
  );
}
