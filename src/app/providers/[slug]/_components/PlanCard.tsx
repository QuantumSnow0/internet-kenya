"use client";

type PlanCardProps = {
  planName: string;
  speed: string;
  priceKsh: number;
  installationKsh: number;
  validity: string;
  /** When set, shown instead of "Installation: Ksh. x" (e.g. "Free router included"). */
  installationLabel?: string;
  /** Optional label shown above plan name (e.g. "Safaricom Fiber"). */
  productLabel?: string;
  /** Optional image (e.g. router). Shown as small icon next to plan name. */
  iconImageSrc?: string;
  /** Tailwind class for the header bar. Unused in this design. */
  headerClass?: string;
  selected?: boolean;
  recommended?: boolean;
  onSelect?: () => void;
  className?: string;
};

export function PlanCard({
  planName,
  speed,
  priceKsh,
  installationKsh,
  validity,
  installationLabel,
  productLabel,
  iconImageSrc,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for API
  selected = false,
  recommended = false,
  onSelect,
  className = "",
}: PlanCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.();
        }
      }}
      className={`group relative flex flex-none w-[220px] flex-col rounded-xl border border-white/12 bg-[rgb(30,33,45)] transition-all duration-200 hover:border-green-400/25 hover:shadow-lg sm:w-[240px] ${className}`.trim()}
    >
      <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
        {/* Row 1: Product label only (full width) */}
        {productLabel && (
          <p className="text-[10px] font-semibold uppercase tracking-wide text-green-400/90">
            {productLabel}
          </p>
        )}

        {/* One row: bigger image | plan name + price (stacked) */}
        <div className="mt-1.5 flex items-center gap-3">
          {iconImageSrc ? (
            <div className="h-16 w-20 shrink-0 sm:h-20 sm:w-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={iconImageSrc}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="truncate font-discover text-base font-bold text-white">
              {planName}
            </p>
            <p className="font-discover text-base font-bold tabular-nums text-white">
              Ksh {priceKsh.toLocaleString("en-KE")}
            </p>
            <p className="text-[10px] text-white/50">{validity}</p>
          </div>
        </div>

        {/* Row 4: Speed (main focus) */}
        <p className="mt-3 font-discover text-xl font-bold tabular-nums text-white sm:text-2xl">
          {speed}
        </p>

        {/* Row 5: Installation */}
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-white/70">
          <svg
            className="h-3 w-3 shrink-0 text-green-400/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {installationLabel ? (
            <span className="text-green-400/90">{installationLabel}</span>
          ) : (
            <>
              Installation{" "}
              <span className="text-green-400/90">
                Ksh. {installationKsh.toLocaleString("en-KE")}
              </span>
            </>
          )}
        </p>

        {/* Row 6: CTA (separated) */}
        <div className="mt-4 border-t border-white/10 pt-3">
          <p className="flex items-center gap-1 text-xs font-semibold text-green-400 group-hover:text-green-300">
            Apply now
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}
