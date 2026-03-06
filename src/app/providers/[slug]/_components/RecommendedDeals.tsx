"use client";

import type { TieredPlan } from "@/app/data/safaricomPlans";

/** Tier name → accent for number and optional card accent. */
const tierAccent: Record<
  string,
  { number: string; card: string }
> = {
  Bronze: {
    number: "text-amber-400",
    card: "from-amber-500/10 to-transparent border-amber-400/20",
  },
  Silver: {
    number: "text-slate-300",
    card: "from-slate-400/10 to-transparent border-slate-400/20",
  },
  Gold: {
    number: "text-amber-300",
    card: "from-amber-400/12 to-transparent border-amber-300/25",
  },
  Diamond: {
    number: "text-sky-400",
    card: "from-sky-500/10 to-transparent border-sky-400/20",
  },
  Platinum: {
    number: "text-neutral-200",
    card: "from-neutral-400/10 to-transparent border-neutral-300/20",
  },
};

export type RecommendedDealItem = Pick<
  TieredPlan,
  "tier" | "speedMbps" | "priceCurrentKes" | "priceOriginalKes"
>;

type RecommendedDealsProps = {
  /** Section heading. e.g. "Deals you will like" (later from DB/CMS). */
  title: string;
  items: RecommendedDealItem[];
};

/** Horizontal row of recommended plan cards: big speed (tier color), tier name, price. */
export function RecommendedDeals({ title, items }: RecommendedDealsProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-4 sm:mt-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
          {title}
        </h2>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 sm:text-xs">
          Unlimited data
        </span>
      </div>
      <p className="mb-3 text-xs text-white/70 sm:text-sm">
        Free router included
      </p>
      <div className="recommended-deals-row flex gap-3 overflow-x-auto overflow-y-hidden pb-6 sm:gap-4">
        {items.map((item) => {
          const accent = tierAccent[item.tier] ?? {
            number: "text-white/80",
            card: "from-white/5 to-transparent border-white/12",
          };
          return (
            <div
              key={item.tier}
              className={`relative flex min-w-40 shrink-0 flex-col rounded-2xl border bg-linear-to-br ${accent.card} px-4 py-4 pb-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.99] sm:min-w-36 sm:px-4 sm:py-4`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span
                  className={`font-extrabold tabular-nums leading-none tracking-tight text-4xl sm:text-5xl ${accent.number}`}
                >
                  {item.speedMbps}
                </span>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70 sm:text-xs">
                    {item.tier}
                  </span>
                  <span className="text-xs font-medium text-white/60 sm:text-sm">
                    Mbps
                  </span>
                </div>
              </div>
              <div className="mt-3 border-t border-white/10 pt-3">
                <p className="font-mono text-lg font-bold text-white sm:text-xl">
                  {item.priceCurrentKes.toLocaleString("en-KE")}
                  <span className="ml-0.5 text-xs font-normal text-white/50">
                    KSh/mo
                  </span>
                </p>
                {item.priceOriginalKes != null && (
                  <span className="mt-0.5 block text-[10px] text-white/45 line-through sm:text-xs">
                    was {item.priceOriginalKes.toLocaleString("en-KE")} KSh
                  </span>
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 left-1/2 min-w-28 -translate-x-1/2 translate-y-1/2 rounded-lg bg-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/25 active:bg-white/20"
              >
                Apply now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
