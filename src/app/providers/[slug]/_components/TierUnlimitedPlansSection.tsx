"use client";

import type { TieredPlan } from "@/app/data/safaricomPlans";

/** Tier name → accent for number, card, and Apply button. */
const tierAccent: Record<string, { number: string; card: string; button: string }> = {
  Bronze: {
    number: "text-amber-400",
    card: "from-amber-500/10 to-transparent border-amber-400/20",
    button: "border-amber-400/30 bg-amber-500/25 text-amber-100 hover:bg-amber-500/35 hover:border-amber-400/50 active:bg-amber-500/30",
  },
  Silver: {
    number: "text-slate-300",
    card: "from-slate-400/10 to-transparent border-slate-400/20",
    button: "border-slate-400/30 bg-slate-500/25 text-slate-100 hover:bg-slate-500/35 hover:border-slate-400/50 active:bg-slate-500/30",
  },
  Gold: {
    number: "text-amber-300",
    card: "from-amber-400/12 to-transparent border-amber-300/25",
    button: "border-amber-300/30 bg-amber-400/25 text-amber-50 hover:bg-amber-400/35 hover:border-amber-300/50 active:bg-amber-400/30",
  },
  Diamond: {
    number: "text-sky-400",
    card: "from-sky-500/10 to-transparent border-sky-400/20",
    button: "border-sky-400/30 bg-sky-500/25 text-sky-100 hover:bg-sky-500/35 hover:border-sky-400/50 active:bg-sky-500/30",
  },
  Platinum: {
    number: "text-neutral-200",
    card: "from-neutral-400/10 to-transparent border-neutral-300/20",
    button: "border-neutral-400/30 bg-neutral-500/25 text-neutral-100 hover:bg-neutral-500/35 hover:border-neutral-400/50 active:bg-neutral-500/30",
  },
};

type TierUnlimitedPlansSectionProps = {
  plans: TieredPlan[];
};

/** Horizontal row of tier unlimited plans: tier name, speed, price, "Unlimited" label. */
export function TierUnlimitedPlansSection({ plans }: TierUnlimitedPlansSectionProps) {
  if (plans.length === 0) return null;

  return (
    <div className="mt-4 sm:mt-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
          Tier unlimited plans
        </h2>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 sm:text-xs">
          Unlimited data
        </span>
      </div>
      <p className="mb-3 text-xs text-white/70 sm:text-sm">
        Free router included
      </p>
      <div className="recommended-deals-row flex gap-3 overflow-x-auto overflow-y-hidden pb-6 sm:gap-4">
        {plans.map((plan) => {
          const accent = tierAccent[plan.tier] ?? {
            number: "text-white/80",
            card: "from-white/5 to-transparent border-white/12",
            button: "border-white/20 bg-white/15 text-white hover:bg-white/25 active:bg-white/20",
          };
          return (
            <div
              key={plan.tier}
              className={`relative flex min-w-40 shrink-0 flex-col rounded-2xl border bg-linear-to-br ${accent.card} px-4 py-4 pb-8 sm:pb-12 shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.99] sm:min-w-36 sm:px-4 sm:py-4`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span
                  className={`font-extrabold tabular-nums leading-none tracking-tight text-4xl sm:text-5xl ${accent.number}`}
                >
                  {plan.speedMbps}
                </span>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70 sm:text-xs">
                    {plan.tier}
                  </span>
                  <span className="text-xs font-medium text-white/60 sm:text-sm">
                    Mbps
                  </span>
                </div>
              </div>
              <div className="mt-3 border-t border-white/10 pt-3">
                <p className="font-mono text-lg font-bold text-white sm:text-xl">
                  {plan.priceCurrentKes.toLocaleString("en-KE")}
                  <span className="ml-0.5 text-xs font-normal text-white/50">
                    KSh/mo
                  </span>
                </p>
                {plan.priceOriginalKes != null && (
                  <span className="mt-0.5 block text-[10px] text-white/45 line-through sm:text-xs">
                    was {plan.priceOriginalKes.toLocaleString("en-KE")} KSh
                  </span>
                )}
              </div>
              <div
                className="absolute bottom-0 left-1/2 min-w-28 -translate-x-1/2 translate-y-1/4 rounded-lg bg-[var(--background)]"
                aria-hidden
              >
                <button
                  type="button"
                  className={`w-full rounded-lg border px-4 py-2 text-xs font-semibold transition-colors ${accent.button}`}
                >
                  Apply now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
