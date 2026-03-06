"use client";

import type { FiberPlan } from "@/app/data/safaricomPlans";

type FiberPlansSectionProps = {
  title: string;
  tagline?: string;
  note?: string;
  plans: FiberPlan[];
  /** Optional pill label, e.g. "Uncapped" or "Business" */
  pill?: string;
};

/** Horizontal row of fiber (uncapped) plan cards: speed, price. */
export function FiberPlansSection({
  title,
  tagline,
  note,
  plans,
  pill = "Uncapped",
}: FiberPlansSectionProps) {
  if (plans.length === 0) return null;

  return (
    <div className="mt-4 sm:mt-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
          {title}
        </h2>
        <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sky-300 sm:text-xs">
          {pill}
        </span>
      </div>
      {(tagline || note) && (
        <p className="mb-3 text-xs text-white/70 sm:text-sm">
          {tagline && <span className="font-medium text-white/85">{tagline}</span>}
          {tagline && note && " · "}
          {note}
        </p>
      )}
      <div className="recommended-deals-row flex gap-3 overflow-x-auto overflow-y-hidden pb-6 sm:gap-4">
        {plans.map((plan) => (
          <div
            key={plan.speedMbps}
            className="relative flex min-w-40 shrink-0 flex-col rounded-2xl border border-white/10 bg-linear-to-b from-sky-500/8 to-transparent px-4 py-4 pb-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-200 hover:border-sky-400/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.99] sm:min-w-36 sm:px-4 sm:py-4"
          >
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-2xl font-extrabold tabular-nums tracking-tight text-white sm:text-3xl">
                {plan.speedMbps}
              </span>
              <span className="text-xs font-medium text-white/60 sm:text-sm">
                Mbps
              </span>
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="font-mono text-lg font-bold text-white sm:text-xl">
                {plan.priceKes.toLocaleString("en-KE")}
                <span className="ml-0.5 text-xs font-normal text-white/50">
                  KSh/mo
                </span>
              </p>
            </div>
            <button
              type="button"
              className="absolute bottom-0 left-1/2 min-w-28 -translate-x-1/2 translate-y-1/2 rounded-lg bg-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/25 active:bg-white/20"
            >
              Apply now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
