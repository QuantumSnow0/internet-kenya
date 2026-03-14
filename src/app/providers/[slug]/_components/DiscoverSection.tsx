"use client";

import { useState } from "react";
import { PlanCard } from "./PlanCard";

const TABS = ["Popular", "Cheapest", "Fastest"] as const;

const POPULAR_PLANS = [
  { planName: "Bronze", speed: "15 Mbps", priceKsh: 2250, installationKsh: 0, validity: "30 days validity" },
  { planName: "Premium", speed: "50 Mbps", priceKsh: 4000, installationKsh: 2999, validity: "30 days validity" },
  { planName: "Unlimited", speed: "50 Mbps", priceKsh: 4999, installationKsh: 2000, validity: "30 days validity" },
];

export function DiscoverSection() {
  const [active, setActive] = useState<(typeof TABS)[number]>("Popular");
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);

  return (
    <>
      <div className="mt-6 flex gap-10" role="tablist" aria-label="Sort plans by">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={`font-discover flex flex-col items-start text-sm font-semibold transition-colors ${
              active === tab
                ? "text-green-500"
                : "text-white/70 hover:text-white"
            }`}
          >
            <span>{tab}</span>
            {active === tab && (
              <span className="mt-1 h-0.5 min-w-6 w-full bg-green-500" aria-hidden />
            )}
          </button>
        ))}
      </div>

      {active === "Popular" && (
        <section className="mt-1 pt-6" aria-label="Popular plans">
          <div className="relative left-1/2 w-screen -translate-x-1/2">
            <div className="recommended-deals-row flex gap-4 overflow-x-auto overflow-y-visible pt-3 pb-4 pl-3 pr-3 sm:pl-6 sm:pr-6">
            {POPULAR_PLANS.map((plan, index) => (
              <PlanCard
                key={plan.planName}
                planName={plan.planName}
                speed={plan.speed}
                priceKsh={plan.priceKsh}
                installationKsh={plan.installationKsh}
                validity={plan.validity}
                installationLabel={index === 0 ? "Free router included" : index === 1 ? "5G device: Ksh. 2,999" : undefined}
                productLabel={index === 0 ? "Safaricom Fiber" : index === 1 ? "Safaricom 5G" : undefined}
                iconImageSrc={index === 0 ? "/safaricom-router.png" : index === 1 ? "/safaricom-5g-router.png" : undefined}
                selected={selectedPlanIndex === index}
                recommended={index === 1}
                onSelect={() => setSelectedPlanIndex(index)}
              />
            ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
