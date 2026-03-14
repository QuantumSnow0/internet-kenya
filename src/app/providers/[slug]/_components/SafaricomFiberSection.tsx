"use client";

const FIBER_PLANS = [
  {
    tier: "Bronze",
    headerClass: "bg-amber-700",
    speed: "15 Mbps",
    included: [
      "Fast web browsing",
      "SD Movie & music streaming",
      "Internet surfing, social media & email",
    ],
    excluded: [
      "Multiple device streaming",
      "Superfast video downloads",
      "CCTV devices Capability",
    ],
    priceOriginal: 2999,
    priceCurrent: 2250,
  },
  {
    tier: "Silver",
    headerClass: "bg-slate-500",
    speed: "30 Mbps",
    included: [
      "Fast web browsing & Video calls",
      "HD TV shows and movies upto 3 connected devices",
      "Internet surfing, social media & email",
      "Moderate streaming",
      "Superfast video downloads",
      "CCTV devices Capability",
    ],
    excluded: [],
    priceOriginal: 4100,
    priceCurrent: 3075,
  },
  {
    tier: "Gold",
    headerClass: "bg-amber-500",
    speed: "80 Mbps",
    included: [
      "Fast web browsing",
      "4K Movies & TV Shows",
      "Online gaming and downloading",
      "Multiple device music streaming",
      "Superfast video downloads",
      "CCTV devices Capability",
    ],
    excluded: [],
    priceOriginal: 6299,
    priceCurrent: 4725,
  },
  {
    tier: "Diamond",
    headerClass: "bg-rose-700",
    speed: "500 Mbps",
    included: [
      "Fast web browsing",
      "4K Movie & TV Shows",
      "Heavy online gaming and downloading",
      "Multiple device streaming",
      "Superfast video downloads & music streaming",
      "CCTV devices Capability",
    ],
    excluded: [],
    priceOriginal: 12499,
    priceCurrent: 9375,
  },
  {
    tier: "Platinum",
    headerClass: "bg-violet-600",
    speed: "1000 Mbps",
    included: [
      "High-definition Movie and TV shows streaming 4K/8K",
      "Heavy online gaming and downloading",
      "Home Automation",
      "Multiple device streaming",
      "Superfast video downloads & music streaming",
    ],
    excluded: [],
    priceOriginal: null,
    priceCurrent: 20000,
  },
] as const;

function FiberPlanCard({
  plan,
}: {
  plan: (typeof FIBER_PLANS)[number];
}) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[rgb(30,33,45)] shadow-lg sm:w-[280px] md:w-full md:min-w-0">
      <div
        className={`flex items-center justify-center px-3 py-2 text-sm font-bold uppercase tracking-wide text-white ${plan.headerClass}`}
      >
        {plan.tier}
      </div>
      <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
        <p className="font-discover text-2xl font-bold tabular-nums text-white sm:text-3xl">
          {plan.speed}
        </p>
        <ul className="mt-3 space-y-1.5 text-[11px] leading-snug text-white/85">
          {plan.included.map((text) => (
            <li key={text} className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{text}</span>
            </li>
          ))}
          {plan.excluded.map((text) => (
            <li key={text} className="flex items-start gap-2 text-white/50">
              <svg
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-white/10 pt-3">
          <div className="flex flex-wrap items-baseline gap-2">
            {plan.priceOriginal != null && (
              <span className="text-sm text-white/50 line-through">
                Ksh {plan.priceOriginal.toLocaleString("en-KE")}
              </span>
            )}
            <span className="font-discover text-lg font-bold tabular-nums text-white">
              Ksh {plan.priceCurrent.toLocaleString("en-KE")}
            </span>
          </div>
          <p className="mt-1 text-[10px] text-white/60">Valid for 30 days</p>
          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-green-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 active:bg-green-700"
            onClick={() => {}}
          >
            Get Connected
          </button>
        </div>
      </div>
    </div>
  );
}

export function SafaricomFiberSection() {
  return (
    <section className="mt-3 pt-4" aria-label="Safaricom Fiber plans">
      <h2 className="font-discover text-xl font-bold text-white sm:text-2xl">
        Safaricom Fiber ( Home & Business)
      </h2>
      
      <div className="recommended-deals-row -mx-3 mt-4 overflow-x-auto overflow-y-visible pb-6 pt-2 sm:-mx-6 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:mx-0">
        <div className="flex gap-4 pl-3 pr-3 sm:pl-6 sm:pr-6 md:contents">
          {FIBER_PLANS.map((plan) => (
            <FiberPlanCard key={plan.tier} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
