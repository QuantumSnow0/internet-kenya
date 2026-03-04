"use client";

import Image from "next/image";
import Link from "next/link";
import {
  getUnsupportedLocationMessage,
  isLocationSupportedForProvider,
} from "@/app/data/locationCoverage";
import { providers } from "@/app/data/providers";
import {
  getProviderKesPerMbps,
  getProviderSlugsWithValue,
} from "@/app/data/providerValueComparison";

const providerAccentClass: Record<string, string> = {
  emerald: "from-emerald-300 via-emerald-100 to-white",
  red: "from-red-300 via-red-100 to-white",
  white: "from-neutral-300 via-neutral-100 to-white",
};

type ProviderValueComparisonProps = {
  currentSlug: string;
  county?: string;
};

/** Other-provider cards with KES/Mbps and green ↑ (cheaper) or red ↓ (more expensive) vs current provider. */
export function ProviderValueComparison({
  currentSlug,
  county,
}: ProviderValueComparisonProps) {
  const currentValue = getProviderKesPerMbps(currentSlug);
  const slugsWithValue = new Set(getProviderSlugsWithValue());

  if (currentValue == null || currentValue <= 0) return null;

  const others = providers.filter(
    (p) => p.slug !== currentSlug && slugsWithValue.has(p.slug)
  );
  if (others.length === 0) return null;

  return (
    <div className="mt-3 flex flex-nowrap items-center justify-between gap-2 md:mt-4 md:justify-start md:flex-wrap md:gap-4">
      {others.map((provider) => {
        const value = getProviderKesPerMbps(provider.slug);
        if (value == null || value <= 0) return null;

        const isCheaperThanCurrent = value < currentValue;
        const isMoreExpensiveThanCurrent = value > currentValue;
        const displayValue = Math.round(value);
        const canSwitch =
          !county ||
          isLocationSupportedForProvider(provider.slug, county);
        const href = county
          ? `/providers/${provider.slug}?county=${encodeURIComponent(county)}`
          : `/providers/${provider.slug}`;

        const cardContent = (
          <>
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-b p-1 shadow-md md:h-11 md:w-11 ${providerAccentClass[provider.accent] ?? ""}`}
            >
              <Image
                src={provider.logo}
                alt={provider.name}
                width={provider.imageSize.width}
                height={provider.imageSize.height}
                className="h-full w-full object-contain object-center"
                sizes="44px"
              />
            </div>
            <div className="flex flex-col items-end leading-tight">
              <span className="font-mono text-sm font-semibold text-white md:text-base">
                {displayValue}
              </span>
              <span className="text-[10px] text-white/50" aria-hidden>
                KSh/Mb
              </span>
            </div>
            {isCheaperThanCurrent && (
              <span
                className="inline-flex items-center text-emerald-400"
                title="Cheaper than this provider"
              >
                <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M10 16.5a1 1 0 0 1-.7-.3l-4-4a1 1 0 1 1 1.4-1.4L9 13.58V3.5a1 1 0 1 1 2 0v10.08l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-.7.32Z"
                  />
                </svg>
              </span>
            )}
            {isMoreExpensiveThanCurrent && (
              <span
                className="inline-flex items-center text-red-400"
                title="More expensive than this provider"
              >
                <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M10 3.5a1 1 0 0 1 .7.3l4 4a1 1 0 0 1-1.4 1.4L11 6.42V16.5a1 1 0 1 1-2 0V6.42l-2.3 2.3a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 .7-.32Z"
                  />
                </svg>
              </span>
            )}
          </>
        );

        const cardClass =
          "flex items-center gap-1.5 md:rounded-xl md:border md:border-white/12 md:bg-white/5 md:px-3 md:py-2.5 " +
          (canSwitch
            ? "md:transition-colors md:hover:bg-white/10"
            : "cursor-not-allowed opacity-70");

        const unsupportedMessage =
          county && !canSwitch
            ? getUnsupportedLocationMessage(provider.slug, county)
            : null;

        return canSwitch ? (
          <Link key={provider.slug} href={href} className={cardClass}>
            {cardContent}
          </Link>
        ) : (
          <div
            key={provider.slug}
            className="flex flex-col items-start gap-1 md:items-start"
          >
            <span
              className={cardClass}
              title={unsupportedMessage ?? undefined}
              aria-disabled="true"
            >
              {cardContent}
            </span>
            {unsupportedMessage && (
              <p
                className="max-w-48 text-left text-[11px] text-red-300 md:max-w-none"
                role="alert"
              >
                {unsupportedMessage}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
