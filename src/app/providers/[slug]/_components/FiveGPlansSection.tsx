"use client";

import { ApplyNowButton } from "./ApplyNowButton";
import type { FiveGPlan } from "@/app/data/safaricomPlans";

type FiveGPlansSectionProps = {
  plans: FiveGPlan[];
  /** Device/router original and discounted price (shown once in section). */
  devicePricing?: { originalKes: number; discountedKes: number } | null;
  /** Card/button accent: violet (Safaricom) or red (Airtel). */
  accent?: "violet" | "red";
};

const cardStyles = {
  violet: {
    card: "border-white/10 bg-linear-to-b from-violet-500/8 to-transparent hover:border-violet-400/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
    button: "border-violet-400/30 bg-violet-500/25 text-violet-100 hover:bg-violet-500/35 hover:border-violet-400/50 active:bg-violet-500/30",
  },
  red: {
    card: "border-white/10 bg-linear-to-b from-red-500/8 to-transparent hover:border-red-400/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
    button: "border-red-400/30 bg-red-500/25 text-red-100 hover:bg-red-500/35 hover:border-red-400/50 active:bg-red-500/30",
  },
};

/** 5G plan cards: speed, price. Device discount shown once when provided. */
export function FiveGPlansSection({ plans, devicePricing, accent = "violet" }: FiveGPlansSectionProps) {
  if (plans.length === 0) return null;
  const style = cardStyles[accent];

  return (
    <div className="mt-4 sm:mt-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
          5G data plans
        </h2>
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
      <div className="recommended-deals-row flex justify-between gap-3 overflow-x-auto overflow-y-hidden pb-6 sm:justify-start sm:gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex min-w-40 shrink-0 flex-col rounded-2xl border px-4 py-4 pb-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] sm:pb-12 sm:min-w-36 sm:px-4 sm:py-4 ${style.card}`}
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
                  KSh/month
                </span>
              </p>
            </div>
            <ApplyNowButton
              planName="5G data plans"
              speedLabel={`${plan.speedMbps} Mbps`}
              priceLabel={`${plan.priceKes.toLocaleString("en-KE")} KSh/month`}
              devicePriceLabel={
                devicePricing == null
                  ? "Free"
                  : devicePricing.discountedKes === 0
                    ? "Free"
                    : `${devicePricing.discountedKes.toLocaleString("en-KE")} KSh`
              }
              buttonClassName={style.button}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
