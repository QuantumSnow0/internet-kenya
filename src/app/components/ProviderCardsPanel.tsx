"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  getUnsupportedLocationMessage,
  isLocationSupportedForProvider,
  kenyaCounties,
} from "../data/locationCoverage";
import { providerCardAccent } from "../data/providerAccents";
import type { ProviderCard } from "../data/providers";

type ProviderCardsPanelProps = {
  providers: readonly ProviderCard[];
};

type SelectProviderOptions = {
  preserveLocation?: boolean;
  autoContinueWithLocation?: boolean;
};

const baseCardClass =
  "group relative flex aspect-square w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(25,28,41)] sm:rounded-2xl";

// Canonical county list used for suggestions + strict validation.
const LOCATION_PROMPT_DELAY_MS = 1300;
const COUNTY_ERROR_MESSAGE = "Please select a county from the list.";
const SWITCH_PROVIDER_AUTO_REDIRECT_DELAY_MS = 1500;
const AUTO_SWITCH_PROVIDER_OPTIONS: SelectProviderOptions = {
  preserveLocation: true,
  autoContinueWithLocation: true,
};

export function ProviderCardsPanel({ providers }: ProviderCardsPanelProps) {
  const router = useRouter();

  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [county, setCounty] = useState("");
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showCountySuggestions, setShowCountySuggestions] = useState(false);
  const [showAllCounties, setShowAllCounties] = useState(false);
  const [countyError, setCountyError] = useState<string | null>(null);
  const [autoContinueAfterSwitch, setAutoContinueAfterSwitch] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const countyInputRef = useRef<HTMLInputElement>(null);
  const lockedScrollYRef = useRef(0);
  const suppressCountyBlurRef = useRef(false);
  const availableProviderTapLockRef = useRef(false);

  const validCountySet = useMemo(
    () => new Set(kenyaCounties.map((countyName) => countyName.toLowerCase())),
    []
  );

  const isValidCounty = useCallback(
    (value: string) =>
      value.trim().length > 0 && validCountySet.has(value.trim().toLowerCase()),
    [validCountySet]
  );

  const selectedProvider = selectedSlug
    ? providers.find((provider) => provider.slug === selectedSlug) ?? null
    : null;
  const remainingProviders = selectedSlug
    ? providers.filter((provider) => provider.slug !== selectedSlug)
    : [];
  const trimmedCounty = county.trim().toLowerCase();
  const countySuggestions = showAllCounties
    ? kenyaCounties
    : trimmedCounty.length > 0
    ? kenyaCounties.filter((countyName) =>
        countyName.toLowerCase().includes(trimmedCounty)
      )
    : [];
  const getLocationValidationError = (value: string): string | null => {
    if (!isValidCounty(value)) return COUNTY_ERROR_MESSAGE;
    if (!selectedSlug) return null;
    return getUnsupportedLocationMessage(selectedSlug, value);
  };
  const showSupportedProvidersHint =
    selectedSlug !== null &&
    isValidCounty(county) &&
    !isLocationSupportedForProvider(selectedSlug, county);
  const supportedProvidersForCounty = showSupportedProvidersHint
    ? providers.filter((provider) => isLocationSupportedForProvider(provider.slug, county))
    : [];
  const canContinue = selectedSlug !== null && !getLocationValidationError(county);

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

  const anchorY = (() => {
    if (!selectedSlug) return isDesktop ? 0 : -40;
    if (isDesktop) return -20;
    if (isMobileFocusMode || autoContinueAfterSwitch) return 0;
    return -64;
  })();
  const selectedCardScale = (() => {
    if (isDesktop) return 1.42;
    if (isMobileFocusMode || autoContinueAfterSwitch) return 1.55;
    return 1.8;
  })();

  // Toggles homepage "selected provider mode" styles in globals.css.
  useLayoutEffect(() => {
    document.body.classList.toggle("provider-selection-active", selectedSlug !== null);
    return () => document.body.classList.remove("provider-selection-active");
  }, [selectedSlug]);

  // Lightweight class toggle for mobile keyboard-focus mode.
  useEffect(() => {
    const shouldLockScroll = isMobileFocusMode && !isDesktop;
    document.body.classList.toggle("provider-input-focus-active", shouldLockScroll);
    return () => document.body.classList.remove("provider-input-focus-active");
  }, [isMobileFocusMode, isDesktop]);

  // Hard lock scroll while mobile keyboard is open to prevent page drift.
  useEffect(() => {
    const shouldLockScroll = isMobileFocusMode && !isDesktop;
    const html = document.documentElement;
    const body = document.body;
    const main = document.querySelector("main") as HTMLElement | null;

    if (!shouldLockScroll) return;

    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlOverscrollBehavior = html.style.overscrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousBodyLeft = body.style.left;
    const previousBodyRight = body.style.right;
    const previousMainOverflow = main?.style.overflow ?? "";
    const previousMainHeight = main?.style.height ?? "";
    const previousMainTouchAction = main?.style.touchAction ?? "";

    lockedScrollYRef.current = window.scrollY;
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${lockedScrollYRef.current}px`;
    body.style.width = "100%";
    body.style.left = "0";
    body.style.right = "0";
    if (main) {
      main.style.overflow = "hidden";
      main.style.height = "100dvh";
      main.style.touchAction = "none";
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      html.style.overscrollBehavior = previousHtmlOverscrollBehavior;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      body.style.left = previousBodyLeft;
      body.style.right = previousBodyRight;
      if (main) {
        main.style.overflow = previousMainOverflow;
        main.style.height = previousMainHeight;
        main.style.touchAction = previousMainTouchAction;
      }
      window.scrollTo(0, lockedScrollYRef.current);
    };
  }, [isMobileFocusMode, isDesktop]);

  // Show location step after the selected-card animation has time to settle.
  useEffect(() => {
    if (!selectedSlug || autoContinueAfterSwitch) return;
    const timeout = window.setTimeout(
      () => setShowLocationPrompt(true),
      LOCATION_PROMPT_DELAY_MS
    );
    return () => window.clearTimeout(timeout);
  }, [selectedSlug, autoContinueAfterSwitch]);

  // When switching from unsupported provider suggestions, show slogan then auto-continue.
  useEffect(() => {
    if (!autoContinueAfterSwitch || !selectedSlug) return;
    if (!isValidCounty(county)) return;
    if (getUnsupportedLocationMessage(selectedSlug, county)) return;

    const selectedCounty = county.trim();
    const timeout = window.setTimeout(() => {
      router.push(`/providers/${selectedSlug}?county=${encodeURIComponent(selectedCounty)}`);
      setAutoContinueAfterSwitch(false);
    }, SWITCH_PROVIDER_AUTO_REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [autoContinueAfterSwitch, selectedSlug, county, router, isValidCounty]);

  // Keep a simple responsive flag for desktop/mobile behavior branches.
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Resets location-step state whenever provider changes.
  const handleSelectProvider = (
    slug: string,
    options?: SelectProviderOptions
  ) => {
    const preserveLocation = options?.preserveLocation === true;
    const autoContinueWithLocation = options?.autoContinueWithLocation === true;

    setShowLocationPrompt(preserveLocation && !autoContinueWithLocation);
    setAutoContinueAfterSwitch(autoContinueWithLocation);
    setIsInputFocused(false);
    setShowCountySuggestions(false);
    setShowAllCounties(false);
    setCountyError(null);
    setSelectedSlug(slug);
    if (!preserveLocation) setCounty("");
  };

  const handleCountyFocus = () => {
    if (window.innerWidth < 768) setIsInputFocused(true);
  };

  // Validate on blur (not while typing) and collapse county menus.
  const handleCountyBlur = () => {
    if (suppressCountyBlurRef.current) {
      suppressCountyBlurRef.current = false;
      return;
    }

    const trimmedValue = county.trim();
    if (trimmedValue.length > 0) {
      setCountyError(getLocationValidationError(trimmedValue));
    } else {
      setCountyError(null);
    }

    window.setTimeout(() => {
      setShowCountySuggestions(false);
      setShowAllCounties(false);
    }, 120);

    if (window.innerWidth < 768) setIsInputFocused(false);
  };

  // Chevron opens "all counties" list; second tap closes it.
  const handleToggleCountySuggestions = () => {
    if (showCountySuggestions && showAllCounties) {
      setShowCountySuggestions(false);
      setShowAllCounties(false);
      return;
    }

    setShowAllCounties(true);
    setShowCountySuggestions(true);
    countyInputRef.current?.focus();
  };

  // Mobile can emit touch + pointer + click for one tap; lock to one switch action.
  const handleAvailableProviderSwitch = (slug: string) => {
    if (availableProviderTapLockRef.current) return;
    availableProviderTapLockRef.current = true;
    window.setTimeout(() => {
      availableProviderTapLockRef.current = false;
    }, 0);

    suppressCountyBlurRef.current = true;
    handleSelectProvider(slug, AUTO_SWITCH_PROVIDER_OPTIONS);
  };

  // Gate navigation until county is valid, then pass county in querystring.
  const handleContinue = () => {
    if (!selectedSlug) return;

    const validationError = getLocationValidationError(county);
    if (validationError) {
      setCountyError(validationError);
      if (validationError === COUNTY_ERROR_MESSAGE) {
        setShowAllCounties(true);
        setShowCountySuggestions(true);
      }
      countyInputRef.current?.focus();
      return;
    }

    const selectedCounty = county.trim();
    router.push(`/providers/${selectedSlug}?county=${encodeURIComponent(selectedCounty)}`);
  };

  return (
    <div
      className={curvedBlockClassName}
      style={selectedSlug ? { backgroundColor: "rgb(25, 28, 41)" } : undefined}
    >
      <motion.div
        initial={false}
        className="curve-cards-anchor relative mx-auto flex w-full max-w-3xl flex-col items-center justify-start gap-3 sm:gap-4 md:justify-center md:gap-4 lg:gap-5"
        animate={{ y: anchorY }}
        transition={
          isDesktop
            ? { duration: 0.58, ease: [0.22, 1, 0.36, 1] }
            : { type: "spring", stiffness: 170, damping: 24, mass: 0.55 }
        }
      >
        {!showOnlyLocationOnMobile && (
          <motion.ul
            initial={false}
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
                      ? { opacity: 1, scale: selectedCardScale, y: 0 }
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
                    onClick={() => handleSelectProvider(slug)}
                    className={`${baseCardClass} ${cardPaddingClass} ${providerCardAccent[accent]} w-full`}
                  >
                    <span
                      className={`relative flex min-w-0 max-w-full shrink items-center justify-center ${logoSize}`}
                    >
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
                  <p
                    className={`mt-1 text-center font-heading text-[11px] font-semibold tracking-[0.08em] text-white/95 sm:text-xs ${
                      selectedSlug ? "invisible" : ""
                    }`}
                  >
                    {name}
                  </p>
                </motion.li>
              );
            })}
          </motion.ul>
        )}

        {selectedSlug && (
          <div
            className={`w-full max-w-sm min-h-38 ${showOnlyLocationOnMobile ? "mt-2" : "mt-6"}`}
          >
            {/* Slogan step -> county step, swapped in-place to avoid layout jumps. */}
            <AnimatePresence mode="wait" initial={false}>
              {selectedProvider && !showLocationPrompt ? (
                <motion.div
                  key="provider-slogan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{
                    duration: autoContinueAfterSwitch ? 0.5 : 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pt-2"
                >
                  <motion.p
                    initial={{ letterSpacing: "0.2em" }}
                    animate={{ letterSpacing: "0.14em" }}
                    transition={{
                      duration: autoContinueAfterSwitch ? 0.66 : 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-center font-heading text-base font-semibold text-white/92 drop-shadow-[0_8px_22px_rgba(0,0,0,0.42)] sm:text-lg"
                  >
                    {selectedProvider.slogan}
                  </motion.p>
                </motion.div>
              ) : (
                showLocationPrompt && (
                  <motion.div
                    key="location-step"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="w-full"
                  >
                    <p className="text-center font-heading text-xl font-semibold tracking-wide text-white sm:text-2xl">
                      Where are you located?
                    </p>

                    <div className="relative mt-4">
                      {/* Search field shell keeps icons perfectly centered cross-device. */}
                      <div
                        className={`relative z-10 flex h-12 w-full items-center rounded-2xl border bg-[rgb(25,28,41)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 ${
                          countyError
                            ? "border-red-300/60 focus-within:border-red-300/70 focus-within:shadow-[0_0_0_2px_rgba(248,113,113,0.35)]"
                            : "border-white/14 focus-within:border-[rgb(58,66,96)] focus-within:shadow-[0_0_0_2px_rgba(58,66,96,0.35)]"
                        }`}
                      >
                        <span className="pointer-events-none flex h-full w-11 items-center justify-center text-white/55">
                          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5">
                            <path
                              d="M8.5 3a5.5 5.5 0 0 1 4.37 8.84l3.64 3.65a1 1 0 0 1-1.42 1.41l-3.64-3.64A5.5 5.5 0 1 1 8.5 3Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>

                        <input
                          ref={countyInputRef}
                          type="text"
                          value={county}
                          onChange={(event) => {
                            const nextValue = event.target.value;
                            const trimmedValue = nextValue.trim();
                            const isExactValidCounty = isValidCounty(nextValue);
                            setCounty(nextValue);
                            // Keep "invalid county" quiet while typing, but surface unsupported coverage immediately.
                            if (trimmedValue.length > 0 && isExactValidCounty) {
                              setCountyError(getLocationValidationError(nextValue));
                            } else {
                              setCountyError(null);
                            }
                            setShowAllCounties(false);
                            setShowCountySuggestions(trimmedValue.length > 0 && !isExactValidCounty);
                          }}
                          onFocus={handleCountyFocus}
                          onBlur={handleCountyBlur}
                          onKeyDown={(event) => {
                            if (event.key !== "Enter") return;
                            event.preventDefault();
                            handleContinue();
                          }}
                          autoComplete="off"
                          placeholder="Find your county..."
                          className="h-full min-w-0 flex-1 bg-transparent pr-2 text-sm leading-5 text-white placeholder:text-white/45 focus:outline-none"
                        />

                        <button
                          type="button"
                          aria-label="Toggle county suggestions"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={handleToggleCountySuggestions}
                          className="flex h-full w-10 items-center justify-center text-white/65 transition-colors hover:text-white"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            className={`h-5 w-5 transition-transform duration-200 ${
                              showCountySuggestions ? "rotate-180" : "rotate-0"
                            }`}
                          >
                            <path
                              d="M5.3 7.8a1 1 0 0 1 1.4 0L10 11.1l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>

                      {showCountySuggestions && countySuggestions.length > 0 && (
                        // Mobile opens downward, desktop opens upward.
                        <div className="county-suggestions-scroll absolute top-full z-50 -mt-20 w-full max-h-56 overflow-y-auto rounded-2xl border border-white/12 bg-[rgb(25,28,41)]/95 shadow-[0_12px_28px_rgba(0,0,0,0.38)] md:top-auto md:bottom-full md:mt-0 md:mb-1">
                          {countySuggestions.map((countyName) => (
                            <button
                              key={countyName}
                              type="button"
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => {
                                setCounty(countyName);
                                setShowCountySuggestions(false);
                                setShowAllCounties(false);
                                setCountyError(getLocationValidationError(countyName));
                              }}
                              className="block w-full border-b border-white/8 py-2.5 pr-4 pl-12 text-left text-sm text-white/90 last:border-b-0 hover:bg-white/8"
                            >
                              {countyName}
                            </button>
                          ))}
                        </div>
                      )}

                      <p
                        className={`mt-2 min-h-4 text-xs ${
                          countyError ? "text-red-300" : "text-transparent"
                        }`}
                      >
                        {countyError ?? "."}
                      </p>

                      <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={handleContinue}
                        disabled={!canContinue}
                        className="mt-3 w-full rounded-xl border border-white/35 bg-linear-to-b from-white/95 to-white/85 py-2.5 text-sm font-semibold tracking-[0.03em] text-[rgb(25,28,41)] shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition-all duration-300 hover:from-white hover:to-white/92 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-linear-to-b disabled:from-white/35 disabled:to-white/30 disabled:text-white/70 disabled:shadow-none"
                      >
                        Continue with {selectedProvider?.name ?? "Provider"}
                      </button>
                      {showSupportedProvidersHint && (
                        <>
                          <p className="mt-3 text-xs font-medium text-white/80">
                            Here are the providers that serve your area:
                          </p>
                          <div className="available-providers-row mt-2 flex w-full items-center justify-center gap-2 overflow-x-auto overflow-y-hidden">
                            {supportedProvidersForCounty.map(
                              ({ slug, name, logo, accent, logoSize, imageSize }) => (
                                <motion.button
                                  key={slug}
                                  type="button"
                                  onPointerDown={(event) => {
                                    event.preventDefault();
                                    handleAvailableProviderSwitch(slug);
                                  }}
                                  onTouchStart={(event) => {
                                    event.preventDefault();
                                    handleAvailableProviderSwitch(slug);
                                  }}
                                  onClick={() => {
                                    handleAvailableProviderSwitch(slug);
                                  }}
                                  initial={{ opacity: 0, y: 10, scale: 0.94 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  transition={{ duration: 0.24, ease: "easeOut" }}
                                  className={`${baseCardClass} ${providerCardAccent[accent]} h-12 w-12 rounded-none p-1.5 sm:h-14 sm:w-14 sm:rounded-none sm:p-2`}
                                >
                                  <span
                                    className={`relative flex min-w-0 max-w-full shrink items-center justify-center ${logoSize}`}
                                  >
                                    <Image
                                      src={logo}
                                      alt={name}
                                      width={imageSize.width}
                                      height={imageSize.height}
                                      className="h-full w-full object-contain object-center"
                                      sizes="48px"
                                    />
                                  </span>
                                </motion.button>
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedSlug &&
          showLocationPrompt &&
          !showOnlyLocationOnMobile &&
          !showSupportedProvidersHint && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex w-max -translate-x-1/2 flex-col items-center justify-center gap-2"
          >
            <p className="text-[10px] font-semibold tracking-[0.16em] text-white/60 uppercase">
              Switch Provider
            </p>
            <div className="flex items-center justify-center gap-3">
              {remainingProviders.map(({ slug, name, logo, accent, logoSize, imageSize }) => (
                <motion.button
                  key={slug}
                  type="button"
                  onClick={() => handleSelectProvider(slug)}
                  initial={{ opacity: 0, y: 14, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.92 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={`${baseCardClass} ${providerCardAccent[accent]} h-14 w-14 rounded-none p-2.5 sm:h-16 sm:w-16 sm:rounded-none`}
                >
                  <span
                    className={`relative flex min-w-0 max-w-full shrink items-center justify-center ${logoSize}`}
                  >
                    <Image
                      src={logo}
                      alt={name}
                      width={imageSize.width}
                      height={imageSize.height}
                      className="h-full w-full object-contain object-center"
                      sizes="64px"
                    />
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedSlug && (
        <p className="home-provider-footnote mt-4 text-center text-xs text-white/70 md:mt-4">
          More providers coming soon.
        </p>
      )}
    </div>
  );
}
