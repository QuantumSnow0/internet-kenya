import Image from "next/image";
import Link from "next/link";
import { Carousel } from "./components/Carousel";

// Carousel images (add more to the array as you add files under public/home-carousel/)
const CAROUSEL_IMAGES = [
  { src: "/home-carousel/airtel5godu.jpg", alt: "airtel 5g router odu" },
  { src: "/home-carousel/safaricom5grouter.jpg", alt: "safaricom 5g router" },
  { src: "/home-carousel/airtel5grouterunit.jpg", alt: "airtel 5g router" },
] as const;

/**
 * Netflix-style landing: "Which provider?" with ISP cards.
 * Mobile: carousel at top, then provider cards. Desktop: no carousel.
 */
export default function Home() {
  const providers = [
    {
      slug: "safaricom",
      name: "Safaricom",
      logo: "/safaricom-logo.png",
      accent: "emerald",
      logoSize: "h-16 w-20 sm:h-20 sm:w-24 md:h-28 md:w-32 lg:h-36 lg:w-44",
      imageSize: { width: 176, height: 88 },
    },
    {
      slug: "airtel",
      name: "Airtel",
      logo: "/airtel-logo.png",
      accent: "red",
      logoSize: "h-7 w-12 sm:h-10 sm:w-16 md:h-12 md:w-24 lg:h-14 lg:w-28",
      imageSize: { width: 112, height: 56 },
    },
  ] as const;

  return (
    <div className="flex min-h-full flex-col">
      {/* Mobile-only: full-bleed carousel; images fade at bottom so "Which provider?" sits there. */}
      <section className="relative left-1/2 right-1/2 w-screen shrink-0 -translate-x-1/2 md:hidden">
        <Carousel images={CAROUSEL_IMAGES} ariaLabel="Featured" />
      </section>

      <section
        className="section-below-carousel relative left-1/2 right-1/2 z-10 flex min-h-0 flex-1 w-screen -translate-x-1/2 -mt-20 flex-col sm:-mt-24 md:mt-0 md:min-h-[calc(100vh-8rem)] md:flex-1 md:items-center md:justify-center md:gap-3 md:py-8"
        aria-label="Choose your internet provider"
      >
        {/* Title sits on the carousel (in the overlap) */}
        <h1 className="mb-0 px-4 pt-6 text-center font-sans text-xl font-bold tracking-wide text-white sm:pt-8 md:pt-0 md:text-3xl lg:text-4xl xl:text-5xl">
          Choose Your Internet Provider
        </h1>

        {/* Curved block below the title: cards centered in the bottom section */}
        <div className="section-below-carousel-curved flex min-h-0 flex-1 flex-col items-center justify-center px-4 pt-8 pb-4 sm:pt-12 sm:pb-5 md:flex-initial md:flex-col md:items-center md:justify-center md:px-4 md:pt-0 md:pb-0">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 sm:gap-6 md:gap-4 lg:gap-5">
        <ul className="grid w-full max-w-[14rem] grid-cols-2 gap-4 sm:max-w-[16rem] sm:gap-5 md:max-w-[14rem] md:gap-4 lg:max-w-[16rem] lg:gap-5">
          {providers.map(({ slug, name, logo, accent, logoSize, imageSize }) => (
            <li key={slug} className="min-w-0">
              <Link
                href={`/providers/${slug}`}
                className={`group relative flex aspect-square w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 p-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(25,28,41)] sm:rounded-2xl sm:p-5 md:p-5 lg:p-6
                  ${accent === "emerald"
                    ? "border-emerald-500/30 bg-emerald-950/40 shadow-lg shadow-emerald-900/20 hover:scale-[1.04] hover:border-emerald-400/60 hover:bg-emerald-900/50 hover:shadow-xl hover:shadow-emerald-500/25 focus:ring-emerald-400"
                    : "border-red-500/30 bg-red-950/40 shadow-lg shadow-red-900/20 hover:scale-[1.04] hover:border-red-400/60 hover:bg-red-900/50 hover:shadow-xl hover:shadow-red-500/25 focus:ring-red-400"
                  }
                `}
              >
                <span className={`relative flex min-w-0 max-w-full flex-shrink items-center justify-center ${logoSize}`}>
                  <Image
                    src={logo}
                    alt={name}
                    width={imageSize.width}
                    height={imageSize.height}
                    className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-110"
                    priority
                    sizes={`${imageSize.width}px`}
                  />
                </span>
                <span className="absolute bottom-2 right-2 text-[10px] font-medium uppercase tracking-wider text-white/50 opacity-0 transition-opacity group-hover:opacity-100 sm:text-xs">
                  View plans →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-center text-xs text-white/70">
          More providers coming soon.
        </p>
      </div>
        </div>
    </section>
    </div>
  );
}
