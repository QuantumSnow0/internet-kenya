 "use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ProviderCard } from "../data/providers";

type ProviderCardsPanelProps = {
  providers: readonly ProviderCard[];
};

const baseCardClass =
  "group relative flex aspect-square w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(25,28,41)] sm:rounded-2xl";

const accentCardClass = {
  emerald:
    "bg-gradient-to-b from-emerald-300 via-emerald-100 to-white shadow-lg shadow-black/15 md:hover:scale-[1.04] md:hover:from-emerald-400 md:hover:via-emerald-200 md:hover:to-white md:hover:shadow-xl md:hover:shadow-black/20 focus:ring-white",
  red: "bg-gradient-to-b from-red-300 via-red-100 to-white shadow-lg shadow-black/15 md:hover:scale-[1.04] md:hover:from-red-400 md:hover:via-red-200 md:hover:to-white md:hover:shadow-xl md:hover:shadow-black/20 focus:ring-white",
  white:
    "bg-gradient-to-b from-neutral-300 via-neutral-100 to-white shadow-lg shadow-black/15 md:hover:scale-[1.04] md:hover:from-neutral-400 md:hover:via-neutral-200 md:hover:to-white md:hover:shadow-xl md:hover:shadow-black/20 focus:ring-white",
} as const;

export function ProviderCardsPanel({ providers }: ProviderCardsPanelProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [county, setCounty] = useState("");
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const countyInputRef = useRef<HTMLInputElement>(null);
  const isMobileFocusMode = selectedSlug !== null && showLocationPrompt && isInputFocused;
  const showOnlyLocationOnMobile = isMobileFocusMode && !isDesktop;
  const curvedBlockClassName = `section-below-carousel-curved relative mt-7 flex flex-col items-center px-4 sm:mt-8 md:mt-0 ${
    selectedSlug
      ? isMobileFocusMode
        ? "min-h-[100svh] justify-start pt-8 pb-0 sm:pt-10 md:justify-center md:pt-0"
        : "min-h-[100svh] justify-center pb-0"
      : "justify-start pb-8 sm:pb-10 md:pb-6"
  }`;
  const cardSizeClass = "w-[5.5rem] sm:w-[6.25rem] md:w-24";
  const cardPaddingClass = "p-3 sm:p-4 md:p-4 lg:p-4";

  useLayoutEffect(() => {
    document.body.classList.toggle("provider-selection-active", selectedSlug !== null);
    return () => document.body.classList.remove("provider-selection-active");
  }, [selectedSlug]);

  useEffect(() => {
    if (!selectedSlug) return;

    const timeout = window.setTimeout(() => {
      setShowLocationPrompt(true);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [selectedSlug]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectProvider = (slug: string) => {
    setShowLocationPrompt(false);
    setIsInputFocused(false);
    setSelectedSlug(slug);
    setCounty("");
  };

  const handleCountyFocus = () => {
    if (window.innerWidth >= 768) return;

    setIsInputFocused(true);
    window.setTimeout(() => {
      countyInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 220);
  };

  const handleCountyBlur = () => {
    if (window.innerWidth >= 768) return;
    setIsInputFocused(false);
  };

  const anchorY = selectedSlug
    ? isDesktop
      ? -20
      : isMobileFocusMode
      ? 0
      : -64
    : isDesktop
    ? 0
    : -40;

  return (
    <div
      className={curvedBlockClassName}
      style={selectedSlug ? { backgroundColor: "rgb(25, 28, 41)" } : undefined}
    >
      <motion.div
        className="curve-cards-anchor relative mx-auto flex w-full max-w-3xl flex-col items-center justify-start gap-3 sm:gap-4 md:justify-center md:gap-4 lg:gap-5"
        animate={{ y: anchorY }}
        transition={{ type: "spring", stiffness: 170, damping: 24, mass: 0.55 }}
      >
        {!showOnlyLocationOnMobile && (
          <motion.ul
            layout
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex w-full ${
              selectedSlug
                ? "max-w-sm items-center justify-center overflow-visible"
                : "max-w-80 flex-wrap content-start justify-evenly gap-4 overflow-visible sm:max-w-80 sm:gap-5 md:max-w-136 md:justify-between md:gap-4 lg:max-w-136 lg:gap-5"
            }`}
          >
            {providers.map(({ slug, name, logo, accent, logoSize, imageSize }) => {
              const isSelected = selectedSlug === slug;
              const isHidden = selectedSlug !== null && !isSelected;

              return (
              <motion.li
                key={slug}
                layout
                animate={
                  isSelected
                    ? { opacity: 1, scale: isMobileFocusMode ? 1.55 : 1.8, y: 0 }
                    : isHidden
                    ? { opacity: 0, scale: 0.96, y: 6 }
                    : { opacity: 1, scale: 1, y: 0 }
                }
                transition={
                  isHidden
                    ? { duration: 0 }
                    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                }
                className={`${cardSizeClass} min-w-0 ${
                  isHidden ? "pointer-events-none absolute" : ""
                }`}
              >
                <button
                  type="button"
                  onPointerDown={() => handleSelectProvider(slug)}
                  onClick={() => handleSelectProvider(slug)}
                  className={`${baseCardClass} ${cardPaddingClass} ${accentCardClass[accent]} w-full`}
                >
                  <span className={`relative flex min-w-0 max-w-full shrink items-center justify-center ${logoSize}`}>
                    <Image
                      src={logo}
                      alt={name}
                      width={imageSize.width}
                      height={imageSize.height}
                      className="h-full w-full scale-110 object-contain object-center transition-transform duration-300 md:group-hover:scale-[1.18]"
                      priority
                      sizes={`${imageSize.width}px`}
                    />
                  </span>
                </button>
                <p className={`mt-1 text-center font-heading text-[11px] font-semibold tracking-[0.08em] text-white/95 sm:text-xs ${selectedSlug ? "invisible" : ""}`}>
                  {name}
                </p>
              </motion.li>
            );
          })}
          </motion.ul>
        )}
        <AnimatePresence>
          {selectedSlug && showLocationPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`w-full max-w-sm ${showOnlyLocationOnMobile ? "mt-2" : "mt-6"}`}
            >
              <p className="text-center font-heading text-xl font-semibold tracking-wide text-white sm:text-2xl">
                Where are you located?
              </p>
              <div className="relative mt-4">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="pointer-events-none absolute left-4 top-1/2 z-20 h-5 w-5 -translate-y-1/2 text-white/55"
                >
                  <path
                    d="M8.5 3a5.5 5.5 0 0 1 4.37 8.84l3.64 3.65a1 1 0 0 1-1.42 1.41l-3.64-3.64A5.5 5.5 0 1 1 8.5 3Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  ref={countyInputRef}
                  type="text"
                  value={county}
                  onChange={(event) => setCounty(event.target.value)}
                  onFocus={handleCountyFocus}
                  onBlur={handleCountyBlur}
                  placeholder="Find your county..."
                  className="relative z-10 w-full rounded-2xl border border-white/14 bg-[rgb(25,28,41)] py-3.5 pr-4 pl-12 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] placeholder:text-white/45 transition-all duration-300 focus:border-[rgb(58,66,96)] focus:shadow-[0_0_0_2px_rgba(58,66,96,0.35)] focus:outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {!selectedSlug && (
        <p className="home-provider-footnote mt-4 text-center text-xs text-white/70 md:mt-4">
          More providers coming soon.
        </p>
      )}
    </div>
  );
}
