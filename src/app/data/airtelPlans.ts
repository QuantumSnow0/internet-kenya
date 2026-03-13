import type { FiveGPlan } from "./safaricomPlans";

/** Airtel 5G plans: 15 Mbps @ 1999, 30 Mbps @ 2999. Device is free. */
export function getAirtel5GPlans(): FiveGPlan[] {
  return [
    {
      name: "Airtel 15 Mbps",
      speedMbps: 15,
      priceKes: 1999,
      dataCap: "Unlimited",
      primaryBundle: "Included",
      fupBundle: "Included",
      fupSpeedMbps: 5,
    },
    {
      name: "Airtel 30 Mbps",
      speedMbps: 30,
      priceKes: 2999,
      dataCap: "Unlimited",
      primaryBundle: "Included",
      fupBundle: "Included",
      fupSpeedMbps: 5,
    },
  ];
}
