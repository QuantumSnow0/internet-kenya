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
  /** Optional image for the left icon (e.g. router image). When set, shown instead of the default WiFi icon. */
  iconImageSrc?: string;
  selected?: boolean;
  recommended?: boolean;
  onSelect?: () => void;
};

const CARD_BG = "rgb(30, 33, 45)"; /* Slightly lighter than page for border-cut */

export function PlanCard({
  planName,
  speed,
  priceKsh,
  installationKsh,
  validity,
  installationLabel,
  productLabel,
  iconImageSrc,
  selected = false,
  recommended = false,
  onSelect,
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
      className={`group relative flex flex-none w-[220px] flex-col overflow-visible rounded-lg border-2 border-green-400/60 backdrop-blur-sm transition-all duration-300 sm:w-[240px]`}
      style={{ background: "rgba(30,33,45,0.9)" }}
    >
      {/* Price - top strip inside card so it’s not cut off */}
      <div
        className="absolute left-2 top-0 pointer-events-none"
        style={{ zIndex: 30 }}
      >
        <div className="relative flex flex-col" style={{ marginTop: "-2px" }}>
          <div
            className="absolute left-0 rounded-t-lg"
            style={{
              top: 0,
              background: CARD_BG,
              height: "2px",
              width: "calc(100% + 8px)",
              marginLeft: "-4px",
            }}
          />
          <div
            className="relative px-1.5"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <span
              className="font-discover text-lg font-extrabold leading-tight tabular-nums whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #ffffff, #22c55e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ksh. {priceKsh.toLocaleString("en-KE")}
            </span>
          </div>
        </div>
      </div>

      {/* Content - clear sections and spacing; flex-1 so Apply now can sit at bottom */}
      <div className="relative z-10 flex flex-1 flex-col pointer-events-none px-3 pt-4 pb-3">
        {/* Section 1: Plan header (icon + name + speed) */}
        <div className="flex items-start gap-2">
          {iconImageSrc ? (
            <div className="relative h-16 w-20 shrink-0 self-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={iconImageSrc} alt="" className="h-full w-full object-contain" />
            </div>
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-green-400/30 bg-linear-to-br from-green-400/20 to-green-500/10">
              <svg className="h-4 w-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1 12a9 9 0 1118 0 9 9 0 01-18 0z" />
              </svg>
            </div>
          )}
          <div className="min-w-0 flex-1">
            {productLabel && (
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.04em] text-green-400/90 whitespace-nowrap">
                {productLabel}
              </p>
            )}
            <p
              className={`font-discover text-base font-bold leading-tight text-white ${productLabel ? "mt-0.5" : ""}`}
              style={selected ? { background: "linear-gradient(135deg, #ffffff, #22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } : undefined}
            >
              {planName}
            </p>
            <p className="mt-0.5 text-xs leading-tight text-white/80">{speed}</p>
          </div>
        </div>

        {/* Installation / Free router */}
        <div className="mt-2 flex items-center gap-2 px-2 py-1.5 text-[10px] leading-tight text-white/80">
          <svg className="h-3 w-3 shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>
            {installationLabel ? (
              <span className="font-semibold text-green-400">{installationLabel}</span>
            ) : (
              <>
                Installation: <span className="font-semibold text-green-400">Ksh. {installationKsh.toLocaleString("en-KE")}</span>
              </>
            )}
          </span>
        </div>

        {/* Apply now at bottom (whole card is clickable) */}
        <div className="mt-auto border-t border-white/10 pt-2">
          <p className="text-center text-xs font-semibold text-green-400">
            Apply now
          </p>
        </div>
      </div>

      {/* Recommended - center of bottom border */}
      {recommended && (
        <div
          className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none"
          style={{ zIndex: 30 }}
        >
          <div className="relative flex flex-col items-center" style={{ marginBottom: "-2px" }}>
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-b-lg"
              style={{
                bottom: 0,
                background: CARD_BG,
                height: "2px",
                width: "calc(100% + 16px)",
                minWidth: "80px",
              }}
            />
            <div className="relative flex justify-center" style={{ transform: "translateY(50%)" }}>
              <span
                className="font-discover text-xs font-extrabold leading-tight whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #22c55e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Recommended
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
