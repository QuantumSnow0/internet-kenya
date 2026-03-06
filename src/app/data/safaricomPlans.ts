/**
 * Safaricom data plans – single source of truth for provider page and comparison.
 * Organised by product line; safaricom.md remains the reference doc.
 */

// —— Shared types ——

export type ProductLineId =
  | "homeFiber"
  | "businessFiber"
  | "dedicatedWifi"
  | "tiered"
  | "fiveG";

/** Simple speed + price (uncapped fiber). */
export type FiberPlan = {
  speedMbps: number;
  priceKes: number;
};

/** Tiered plan with promo pricing and optional features. */
export type TieredPlan = {
  tier: string;
  speedMbps: number;
  priceOriginalKes: number | null;
  priceCurrentKes: number;
  featuresSummary?: string;
};

/** 5G data-capped plan with FUP. */
export type FiveGPlan = {
  name: string;
  speedMbps: number;
  priceKes: number;
  dataCap: string;
  primaryBundle: string;
  fupBundle: string;
  fupSpeedMbps: number;
  category?: "new" | "existing";
};

/** Product line with display info and plans. */
export type ProductLineBase = {
  id: ProductLineId;
  name: string;
  tagline?: string;
  note?: string;
  /** Who it's for (e.g. "Home", "Business"). */
  audience?: string;
};

export type ProductLineFiber = ProductLineBase & {
  kind: "fiber";
  plans: FiberPlan[];
};

export type ProductLineTiered = ProductLineBase & {
  kind: "tiered";
  plans: TieredPlan[];
  validity?: string; // e.g. "Valid for 30 days"
};

export type ProductLineFiveG = ProductLineBase & {
  kind: "fiveG";
  plans: FiveGPlan[];
  fupNote?: string;
  /** Original device/router price (KES). */
  devicePriceOriginalKes?: number;
  /** Discounted device price (KES). */
  devicePriceDiscountedKes?: number;
};

export type SafaricomProductLine =
  | ProductLineFiber
  | ProductLineTiered
  | ProductLineFiveG;

// —— Safaricom product lines (order = display order) ——

export const safaricomProductLines: SafaricomProductLine[] = [
  {
    id: "homeFiber",
    kind: "fiber",
    name: "Home Fiber",
    tagline: "1.5X More Speed at the Same Price",
    audience: "Home",
    note: "Router KES 10,000 → KES 2,999 (T&C apply).",
    plans: [
      { speedMbps: 15, priceKes: 2_999 },
      { speedMbps: 50, priceKes: 4_000 },
      { speedMbps: 100, priceKes: 5_000 },
      { speedMbps: 250, priceKes: 10_000 },
    ],
  },
  {
    id: "businessFiber",
    kind: "fiber",
    name: "Business Fiber",
    audience: "Business",
    plans: [
      { speedMbps: 15, priceKes: 2_999 },
      { speedMbps: 50, priceKes: 5_000 },
      { speedMbps: 100, priceKes: 6_299 },
      { speedMbps: 500, priceKes: 12_499 },
      { speedMbps: 1000, priceKes: 20_000 },
    ],
  },
  {
    id: "dedicatedWifi",
    kind: "fiber",
    name: "Dedicated WiFi",
    tagline: "Blazing Fast Speeds for Your Business.",
    audience: "Business (premium)",
    note: "Dedicated link; prices monthly KES.",
    plans: [
      { speedMbps: 100, priceKes: 26_680 },
      { speedMbps: 155, priceKes: 48_024 },
      { speedMbps: 200, priceKes: 61_364 },
      { speedMbps: 250, priceKes: 76_304.8 },
      { speedMbps: 300, priceKes: 90_712 },
      { speedMbps: 350, priceKes: 105_386 },
    ],
  },
  {
    id: "tiered",
    kind: "tiered",
    name: "Tiered (Bronze – Platinum)",
    audience: "Home / general",
    validity: "Valid for 30 days",
    plans: [
      {
        tier: "Bronze",
        speedMbps: 15,
        priceOriginalKes: 2_999,
        priceCurrentKes: 2_250,
        featuresSummary:
          "Browsing, SD streaming, surfing/social/email. No multi-device streaming, superfast downloads, or CCTV.",
      },
      {
        tier: "Silver",
        speedMbps: 30,
        priceOriginalKes: 4_100,
        priceCurrentKes: 3_075,
        featuresSummary:
          "Browsing, video calls, HD TV (up to 3 devices), surfing, moderate streaming, superfast downloads, CCTV.",
      },
      {
        tier: "Gold",
        speedMbps: 80,
        priceOriginalKes: 6_299,
        priceCurrentKes: 4_725,
        featuresSummary:
          "Browsing, 4K movies/TV, online gaming/downloading, multi-device music, superfast downloads, CCTV.",
      },
      {
        tier: "Diamond",
        speedMbps: 500,
        priceOriginalKes: 12_499,
        priceCurrentKes: 9_375,
        featuresSummary:
          "Browsing, 4K, heavy gaming, multi-device streaming, superfast downloads & music, CCTV.",
      },
      {
        tier: "Platinum",
        speedMbps: 1000,
        priceOriginalKes: null,
        priceCurrentKes: 20_000,
        featuresSummary:
          "4K/8K streaming, heavy gaming, home automation, multi-device streaming, superfast downloads & music.",
      },
    ],
  },
  {
    id: "fiveG",
    kind: "fiveG",
    name: "5G",
    audience: "Home / on-the-go",
    fupNote:
      "Primary bundle = 60% of data cap; FUP bundle = 40%. After FUP, speed drops to FUP speed.",
    devicePriceOriginalKes: 10_000,
    devicePriceDiscountedKes: 2_999,
    plans: [
      {
        name: "5G 10 Mbps",
        speedMbps: 10,
        priceKes: 2_999,
        dataCap: "250 GB",
        primaryBundle: "150 GB",
        fupBundle: "100 GB",
        fupSpeedMbps: 5,
        category: "new",
      },
      {
        name: "5G 50 Mbps",
        speedMbps: 50,
        priceKes: 4_000,
        dataCap: "1.5 TB",
        primaryBundle: "900 GB",
        fupBundle: "600 GB",
        fupSpeedMbps: 10,
        category: "existing",
      },
      {
        name: "5G 100 Mbps",
        speedMbps: 100,
        priceKes: 5_000,
        dataCap: "2.0 TB",
        primaryBundle: "1.2 TB",
        fupBundle: "800 GB",
        fupSpeedMbps: 10,
        category: "existing",
      },
      {
        name: "5G 250 Mbps",
        speedMbps: 250,
        priceKes: 10_000,
        dataCap: "4.0 TB",
        primaryBundle: "2.4 TB",
        fupBundle: "1.6 TB",
        fupSpeedMbps: 10,
        category: "existing",
      },
    ],
  },
];

// —— Helpers (for UI and comparison) ——

/** Get Home Fiber plans (used e.g. for 15 Mbps comparison). */
export function getSafaricomHomeFiberPlans(): FiberPlan[] {
  const line = safaricomProductLines.find(
    (l) => l.id === "homeFiber" && l.kind === "fiber"
  ) as ProductLineFiber | undefined;
  return line?.plans ?? [];
}

/** Get 15 Mbps Home Fiber price for value comparison. */
export function getSafaricom15MbpsHomePrice(): number | null {
  const plans = getSafaricomHomeFiberPlans();
  const plan = plans.find((p) => p.speedMbps === 15);
  return plan?.priceKes ?? null;
}

/** All tiered plans (Bronze–Platinum) for "Tier unlimited plans" section. */
export function getSafaricomTieredPlans(): TieredPlan[] {
  const line = safaricomProductLines.find(
    (l) => l.id === "tiered" && l.kind === "tiered"
  ) as ProductLineTiered | undefined;
  return line?.plans ?? [];
}

/** Recommended/featured tiered plans (with offers). Excludes Platinum (no promo). Later driven by DB. */
export function getRecommendedTieredPlans(): TieredPlan[] {
  const plans = getSafaricomTieredPlans();
  return plans.filter((p) => p.tier !== "Platinum");
}

/** 5G data plans for the provider page. */
export function getSafaricom5GPlans(): FiveGPlan[] {
  const line = safaricomProductLines.find(
    (l) => l.id === "fiveG" && l.kind === "fiveG"
  ) as ProductLineFiveG | undefined;
  return line?.plans ?? [];
}

/** FUP note for 5G plans (e.g. primary bundle 60%, FUP 40%). */
export function getSafaricom5GFupNote(): string | undefined {
  const line = safaricomProductLines.find(
    (l) => l.id === "fiveG" && l.kind === "fiveG"
  ) as ProductLineFiveG | undefined;
  return line?.fupNote;
}

/** 5G device/router pricing (discounted). */
export function getSafaricom5GDevicePricing(): {
  originalKes: number;
  discountedKes: number;
} | null {
  const line = safaricomProductLines.find(
    (l) => l.id === "fiveG" && l.kind === "fiveG"
  ) as ProductLineFiveG | undefined;
  if (
    line?.devicePriceOriginalKes != null &&
    line?.devicePriceDiscountedKes != null
  ) {
    return {
      originalKes: line.devicePriceOriginalKes,
      discountedKes: line.devicePriceDiscountedKes,
    };
  }
  return null;
}

/** Get a fiber product line by id (Home Fiber, Business Fiber, Dedicated WiFi). */
export function getSafaricomFiberLine(
  id: "homeFiber" | "businessFiber" | "dedicatedWifi"
): ProductLineFiber | undefined {
  return safaricomProductLines.find(
    (l) => l.id === id && l.kind === "fiber"
  ) as ProductLineFiber | undefined;
}
