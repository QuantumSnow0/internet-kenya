"use client";

const FIVE_G_PLANS = [
  { speed: "15 Mbps", priceKsh: 2999 },
  { speed: "50 Mbps", priceKsh: 4000 },
  { speed: "100 Mbps", priceKsh: 5000 },
  { speed: "250 Mbps", priceKsh: 10000 },
] as const;

const ROUTER_PRICE = 2999;
const ROUTER_WAS = 10000;

function FiveGPlanCard({
  plan,
}: {
  plan: (typeof FIVE_G_PLANS)[number];
}) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[rgb(30,33,45)] shadow-lg sm:w-[280px] md:w-full md:min-w-0">
      <div className="flex items-center justify-center bg-linear-to-r from-emerald-500 via-green-600 to-green-700 px-3 py-2 text-sm font-bold uppercase tracking-wide text-white">
        Safaricom 5G
      </div>
      <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
        <p className="font-discover text-2xl font-bold tabular-nums text-white sm:text-3xl">
          {plan.speed}
        </p>
        <div className="mt-4 border-t border-white/10 pt-3">
          <span className="font-discover text-lg font-bold tabular-nums text-white">
            Ksh {plan.priceKsh.toLocaleString("en-KE")}
          </span>
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

export function Safaricom5GSection() {
  return (
    <section className="mt-4 pt-3" aria-label="Safaricom 5G plans">
      <h2 className="font-discover text-xl font-bold text-white sm:text-2xl">
        Safaricom 5G plans
      </h2>
      <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
        <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-300">
          Router offer
        </span>
        <span>
          Router available at{" "}
          <span className="text-white/50 line-through">
            Ksh {ROUTER_WAS.toLocaleString("en-KE")}
          </span>{" "}
          <span className="font-semibold text-green-400">
            Ksh {ROUTER_PRICE.toLocaleString("en-KE")}
          </span>
        </span>
      </p>
      <div className="recommended-deals-row -mx-3 mt-4 overflow-x-auto overflow-y-visible pb-6 pt-2 sm:-mx-6 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:mx-0">
        <div className="flex gap-4 pl-3 pr-0 sm:pl-6 sm:pr-0 md:contents">
          {FIVE_G_PLANS.map((plan) => (
            <FiveGPlanCard key={plan.speed} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
