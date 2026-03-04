"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type ProviderLocationSelectProps = {
  providerSlug: string;
  county: string;
  counties: readonly string[];
};

export function ProviderLocationSelect({
  providerSlug,
  county,
  counties,
}: ProviderLocationSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const selectedCounty = county.length > 0 && counties.includes(county) ? county : "";
  const countyLabel = selectedCounty || "Set location";
  const isAirtelLimited = providerSlug === "airtel";

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSelectCounty = (nextCounty: string) => {
    const query = nextCounty.length > 0 ? `?county=${encodeURIComponent(nextCounty)}` : "";
    router.replace(`${pathname}${query}`);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open location picker"
        onClick={() => setIsOpen(true)}
        className="inline-flex max-w-48 items-center justify-end gap-1.5 bg-transparent text-sm font-semibold text-white transition-colors hover:text-white/80 max-[320px]:justify-start sm:max-w-none sm:text-base"
      >
        <span className="truncate">{countyLabel}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-white/75">
          <path
            d="M5.3 7.8a1 1 0 0 1 1.4 0L10 11.1l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-80 flex items-end justify-center bg-black/60 p-3 sm:items-center sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Choose county"
            className="w-full max-w-sm rounded-2xl border border-white/14 bg-[rgb(25,28,41)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.52)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-white/60 uppercase">
                  Location
                </p>
                <p className="text-base font-semibold text-white">Select your county</p>
                {isAirtelLimited && (
                  <p className="mt-1 text-xs text-white/72">Airtel supports 14 counties only.</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-white/15 px-2 py-1 text-xs font-medium text-white/85 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto rounded-xl border border-white/10">
              {counties.map((countyName) => {
                const isSelected = countyName === selectedCounty;
                return (
                  <button
                    key={countyName}
                    type="button"
                    onClick={() => handleSelectCounty(countyName)}
                    className={`flex w-full items-center justify-between border-b border-white/8 px-3 py-2.5 text-left text-sm last:border-b-0 ${
                      isSelected ? "bg-white/14 text-white" : "text-white/88 hover:bg-white/8"
                    }`}
                  >
                    <span>{countyName}</span>
                    {isSelected && <span className="text-xs text-white/75">Selected</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
