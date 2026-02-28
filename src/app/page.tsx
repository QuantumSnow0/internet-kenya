"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Carousel } from "./components/Carousel";
import { providers } from "./data/providers";

const CAROUSEL_IMAGES = [
  { src: "/home-carousel/installation1.jpg", alt: "installation1" },
  { src: "/home-carousel/installation2.jpg", alt: "installation2" },
  { src: "/home-carousel/installation3.jpg", alt: "installation3" },
] as const;

const baseCardClass =
  "group relative flex aspect-square w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(25,28,41)] sm:rounded-2xl";

const accentCardClass = {
  emerald:
    "border-emerald-500/30 bg-emerald-950/40 shadow-lg shadow-emerald-900/20 hover:scale-[1.04] hover:border-emerald-400/60 hover:bg-emerald-900/50 hover:shadow-xl hover:shadow-emerald-500/25 focus:ring-emerald-400",
  red: "border-red-500/30 bg-red-950/40 shadow-lg shadow-red-900/20 hover:scale-[1.04] hover:border-red-400/60 hover:bg-red-900/50 hover:shadow-xl hover:shadow-red-500/25 focus:ring-red-400",
} as const;

export default function Home() {
  const listRef = useRef<HTMLUListElement>(null);
  const [compactCards, setCompactCards] = useState(false);

  const sectionClassName =
    "section-below-carousel relative left-1/2 right-1/2 z-10 flex w-screen -translate-x-1/2 -mt-28 flex-col sm:-mt-32 md:mt-0 md:min-h-[calc(100vh-8rem)] md:flex-1 md:items-center md:justify-center md:gap-3 md:py-8";

  const curvedBlockClassName =
    "section-below-carousel-curved mt-5 flex flex-col items-center justify-start px-4 pt-6 pb-6 sm:mt-6 sm:pt-8 sm:pb-6 md:mt-0 md:flex-initial md:flex-col md:items-center md:justify-center md:px-4 md:pt-0 md:pb-0";
  const mobileCardSizeClass = compactCards
    ? "w-[4.25rem] sm:w-[5.25rem] md:w-24"
    : "w-[5.5rem] sm:w-[6.25rem] md:w-24";
  const cardPaddingClass = compactCards ? "p-2 sm:p-3 md:p-4 lg:p-4" : "p-3 sm:p-4 md:p-4 lg:p-4";

  useEffect(() => {
    const updateCompactMode = () => {
      const list = listRef.current;
      if (!list) return;

      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        setCompactCards(false);
        return;
      }

      const listWidth = list.clientWidth;
      const viewportHeight = window.innerHeight;
      const maxCardsAreaHeight = viewportHeight * 0.5;
      const isSmallMobile = window.innerWidth < 640;

      const gap = isSmallMobile ? 12 : 16;
      const normalCardSize = isSmallMobile ? 80 : 96;
      const cols = Math.max(1, Math.floor((listWidth + gap) / (normalCardSize + gap)));
      const rows = Math.ceil(providers.length / cols);
      const requiredHeight = rows * normalCardSize + Math.max(0, rows - 1) * gap;

      setCompactCards(requiredHeight > maxCardsAreaHeight);
    };

    updateCompactMode();
    window.addEventListener("resize", updateCompactMode);
    return () => window.removeEventListener("resize", updateCompactMode);
  }, []);

  return (
    <div className="flex min-h-full flex-col">
      <section className="relative left-1/2 right-1/2 w-screen shrink-0 -translate-x-1/2 md:hidden">
        <Carousel images={CAROUSEL_IMAGES} ariaLabel="Featured" />
      </section>

      <section className={sectionClassName} aria-label="Choose your internet provider">
        <h1 className="relative z-20 mb-0 px-4 pt-8 text-center font-sans text-xl font-bold tracking-wide text-white sm:pt-10 md:pt-0 md:text-3xl lg:text-4xl xl:text-5xl">
          Choose Your Internet Provider
        </h1>

        <div className={curvedBlockClassName}>
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 sm:gap-6 md:gap-4 lg:gap-5">
            <ul
              ref={listRef}
              className="flex max-h-[50svh] w-full max-w-72 flex-wrap content-start justify-evenly gap-3 overflow-y-auto sm:max-w-80 sm:gap-4 md:max-h-none md:max-w-136 md:justify-between md:gap-4 md:overflow-visible lg:max-w-136 lg:gap-5"
            >
              {providers.map(({ slug, name, logo, accent, logoSize, imageSize }) => (
                <li key={slug} className={`${mobileCardSizeClass} min-w-0`}>
                  <Link
                    href={`/providers/${slug}`}
                    className={`${baseCardClass} ${cardPaddingClass} ${accentCardClass[accent]}`}
                  >
                    <span
                      className={`relative flex min-w-0 max-w-full shrink items-center justify-center ${logoSize}`}
                    >
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

            <p className="text-center text-xs text-white/70">More providers coming soon.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
