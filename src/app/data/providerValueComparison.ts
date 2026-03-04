/**
 * Value comparison at 15 Mbps tier: KES per Mbps (price ÷ speed).
 * Lower = better value. Safaricom from safaricomPlans (Home Fiber); Airtel/Faiba from user.
 */

import { getSafaricom15MbpsHomePrice } from "./safaricomPlans";

const SPEED_MBPS = 15;

export type ProviderValueRef = {
  slug: string;
  /** Monthly price in KES at 15 Mbps */
  priceKes: number;
};

const safaricomPrice = getSafaricom15MbpsHomePrice();

/** 15 Mbps tier: Safaricom from safaricomPlans; Airtel/Faiba from user. */
export const providerValueRefs: readonly ProviderValueRef[] = [
  ...(safaricomPrice != null
    ? [{ slug: "safaricom" as const, priceKes: safaricomPrice }]
    : []),
  { slug: "airtel", priceKes: 2_000 },
  { slug: "faiba", priceKes: 1_500 },
];

/** KES per Mbps = price / speed. Lower is better value. */
export function kesPerMbps(priceKes: number): number {
  return SPEED_MBPS > 0 ? priceKes / SPEED_MBPS : 0;
}

const refBySlug = new Map(providerValueRefs.map((r) => [r.slug, r]));

export function getProviderKesPerMbps(slug: string): number | null {
  const ref = refBySlug.get(slug);
  return ref ? kesPerMbps(ref.priceKes) : null;
}

/** All provider slugs that have a value ref (for comparison cards). */
export function getProviderSlugsWithValue(): string[] {
  return providerValueRefs.map((r) => r.slug);
}
