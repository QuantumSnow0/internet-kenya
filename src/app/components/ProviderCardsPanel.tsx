import Image from "next/image";
import Link from "next/link";
import type { ProviderCard } from "../data/providers";

type ProviderCardsPanelProps = {
  providers: readonly ProviderCard[];
};

const baseCardClass =
  "group relative flex aspect-square w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(25,28,41)] sm:rounded-2xl";

const accentCardClass = {
  emerald:
    "bg-gradient-to-b from-emerald-300 via-emerald-100 to-white shadow-lg shadow-black/15 hover:scale-[1.04] hover:from-emerald-400 hover:via-emerald-200 hover:to-white hover:shadow-xl hover:shadow-black/20 focus:ring-white",
  red: "bg-gradient-to-b from-red-300 via-red-100 to-white shadow-lg shadow-black/15 hover:scale-[1.04] hover:from-red-400 hover:via-red-200 hover:to-white hover:shadow-xl hover:shadow-black/20 focus:ring-white",
  white:
    "bg-gradient-to-b from-neutral-300 via-neutral-100 to-white shadow-lg shadow-black/15 hover:scale-[1.04] hover:from-neutral-400 hover:via-neutral-200 hover:to-white hover:shadow-xl hover:shadow-black/20 focus:ring-white",
} as const;

export function ProviderCardsPanel({ providers }: ProviderCardsPanelProps) {
  const curvedBlockClassName =
    "section-below-carousel-curved relative mt-7 flex flex-col items-center justify-start px-4 pb-6 sm:mt-8 md:mt-0";
  const cardSizeClass = "w-[5.5rem] sm:w-[6.25rem] md:w-24";
  const cardPaddingClass = "p-3 sm:p-4 md:p-4 lg:p-4";

  return (
    <div className={curvedBlockClassName}>
      <div className="curve-cards-anchor relative mx-auto flex w-full max-w-3xl -translate-y-10 flex-col items-center justify-start gap-3 sm:-translate-y-12 sm:gap-4 md:translate-y-0 md:justify-center md:gap-4 lg:gap-5">
        <ul className="flex max-h-[50svh] w-full max-w-80 flex-wrap content-start justify-evenly gap-4 overflow-y-auto sm:max-w-80 sm:gap-5 md:max-h-none md:max-w-136 md:justify-between md:gap-4 md:overflow-visible lg:max-w-136 lg:gap-5">
          {providers.map(({ slug, name, logo, accent, logoSize, imageSize }) => (
            <li key={slug} className={`${cardSizeClass} min-w-0`}>
              <Link href={`/providers/${slug}`} className={`${baseCardClass} ${cardPaddingClass} ${accentCardClass[accent]}`}>
                <span className={`relative flex min-w-0 max-w-full shrink items-center justify-center ${logoSize}`}>
                  <Image
                    src={logo}
                    alt={name}
                    width={imageSize.width}
                    height={imageSize.height}
                    className="h-full w-full scale-110 object-contain object-center transition-transform duration-300 group-hover:scale-[1.18]"
                    priority
                    sizes={`${imageSize.width}px`}
                  />
                </span>
              </Link>
              <p className="mt-1 text-center font-heading text-[11px] font-semibold tracking-[0.08em] text-white/95 sm:text-xs">
                {name}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <p className="home-provider-footnote absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-white/70 md:static md:mt-4 md:translate-x-0">
        More providers coming soon.
      </p>
    </div>
  );
}
