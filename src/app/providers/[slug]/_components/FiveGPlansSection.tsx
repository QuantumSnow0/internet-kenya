"use client";

import type { FiveGPlan } from "@/app/data/safaricomPlans";

type FiveGPlansSectionProps = {
  plans: FiveGPlan[];
  /** Device/router original and discounted price (shown once in section). */
  devicePricing?: { originalKes: number; discountedKes: number } | null;
};

/** 5G plan cards: speed, price, primary/FUP data. No plan name (speed is enough). Device discount shown once. */
export function FiveGPlansSection({ plans, devicePricing }: FiveGPlansSectionProps) {
  if (plans.length === 0) return null;

  return (
    <div className="mt-4 sm:mt-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
          5G data plans
        </h2>
        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-300 sm:text-xs">
          Data-capped
        </span>
      </div>
      {devicePricing && (
        <p className="mb-4 text-xs text-white/70 sm:text-sm">
          Device:{" "}
          <span className="line-through text-white/50">
            {devicePricing.originalKes.toLocaleString("en-KE")} KSh
          </span>{" "}
          → <span className="font-semibold text-emerald-400">{devicePricing.discountedKes.toLocaleString("en-KE")} KSh</span>
        </p>
      )}
      <div className="recommended-deals-row flex gap-3 overflow-x-auto overflow-y-hidden pb-6 sm:gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative flex min-w-40 shrink-0 flex-col rounded-2xl border border-white/10 bg-linear-to-b from-violet-500/8 to-transparent px-4 py-4 pb-8 sm:pb-12 shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-200 hover:border-violet-400/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.99] sm:min-w-36 sm:px-4 sm:py-4"
          >
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-2xl font-extrabold tabular-nums tracking-tight text-white sm:text-3xl">
                {plan.speedMbps}
              </span>
              <span className="text-xs font-medium text-white/60 sm:text-sm">
                Mbps
              </span>
              {plan.category === "new" && (
                <span className="rounded-md bg-emerald-500/25 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-400 sm:text-[10px]">
                  New
                </span>
              )}
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="font-mono text-lg font-bold text-white sm:text-xl">
                {plan.priceKes.toLocaleString("en-KE")}
                <span className="ml-0.5 text-xs font-normal text-white/50">
                  KSh/mo
                </span>
              </p>
              <div className="mt-3 space-y-1.5 text-[10px] sm:text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white/55">Full speed</span>
                  <span className="font-semibold text-white/95">
                    {plan.primaryBundle}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white/55">Then at {plan.fupSpeedMbps} Mbps</span>
                  <span className="font-semibold text-white/90">
                    {plan.fupBundle}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="absolute bottom-0 left-1/2 min-w-28 -translate-x-1/2 translate-y-1/4 rounded-lg bg-[var(--background)]"
              aria-hidden
            >
              <button
                type="button"
                className="w-full rounded-lg border border-violet-400/30 bg-violet-500/25 px-4 py-2 text-xs font-semibold text-violet-100 transition-colors hover:bg-violet-500/35 hover:border-violet-400/50 active:bg-violet-500/30"
              >
                Apply now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
