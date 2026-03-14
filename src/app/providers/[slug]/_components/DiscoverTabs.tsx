"use client";

import { useState } from "react";

const TABS = ["Popular", "Cheapest", "Fastest"] as const;
export type DiscoverTab = (typeof TABS)[number];

export function DiscoverTabs() {
  const [active, setActive] = useState<DiscoverTab>("Popular");

  return (
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
  );
}
