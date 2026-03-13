/**
 * Hardcoded values for Airtel SmartConnect MS Forms submission.
 * Used when building the payload (no Supabase/auth yet).
 */

export const AIRTEL_MS_FORMS_INTERNAL = {
  agentType: "Enterprise",
  enterpriseCP: "WAM APPLICATIONS",
  agentName: "samson karau maingi",
  /** Stored as 07...; normalize to 254... for the API. */
  agentMobile: "0789457580",
  leadType: "Confirmed",
  connectionType: "SmartConnect (5G ODU)",
  totalUnitsRequired: "1",
  optionalField: null as null,
} as const;

/** MS Forms question IDs – order must match the form. */
export const AIRTEL_MS_FORMS_QUESTION_IDS = {
  agentType: "r0feee2e2bc7c44fb9af400709e7e6276",
  enterpriseCP: "r52e9f6e788444e2a96d9e30de5d635d8",
  agentName: "rcf88d2d33e8c4ed4b33ccc91fec1d771",
  agentMobile: "r2855e7f8fcfb44c98a2c5797e8e9b087",
  leadType: "rd897bb0eb8344bafaaf8db07a535a049",
  totalUnitsRequired: "r5d2a658a265b4f3ea2ad9aee1c8bc9c5",
  connectionType: "r4ceb180775c04d5a92a39fd687573090",
  customerName: "r3af4eebb47ff46b78eb4118311884f53",
  airtelNumber: "r8b0d2eb8e038433f8ce4888e07bed122",
  alternateNumber: "r401284e3fee94602a39ed9a0a14890ea",
  email: "r5dbc62a93dc64f3d84a2442f5ea4a856",
  preferredPackage: "r819c212e954f4367acaba71082424415",
  visitDate: "r68b858271107400189b8d681d1b19c38",
  visitTime: "rae98a58cb06949c1a3222443368aa64e",
  deliveryLandmark: "r7a69684d43ec4bf1b6971b21a8b4dd18",
  installationTown: "rc89257414e57426dac9a183c60a4b556",
  installationLocation: "r55f328ec020a4a629f58639cd56ecd85",
  optionalField: "r1e3b5a91acaa465b8aab76bab2cad94a",
} as const;

/** Normalize phone to 254XXXXXXXXX (digits only, 254 prefix). */
export function normalizePhoneForMsForms(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 9) return `254${digits}`;
  if (digits.length === 10 && digits.startsWith("0")) return `254${digits.slice(1)}`;
  if (digits.length >= 10 && digits.startsWith("254")) return digits.slice(0, 12);
  return digits.length >= 9 ? `254${digits.slice(-9)}` : `254${digits}`;
}

/** Normalize town for MS Forms: no spaces, UPPERCASE (e.g. "Homa Bay" → "HOMABAY"). */
export function normalizeTownForMsForms(town: string): string {
  return town.replace(/\s+/g, "").toUpperCase();
}

/** Preferred package value for MS Forms. */
export function preferredPackageForMsForms(pkg: "standard" | "premium"): string {
  return pkg === "premium"
    ? "5G _30Mbps_30days at Ksh.3999"
    : "5G _15Mbps_30days at Ksh.2999";
}
