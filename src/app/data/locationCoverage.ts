export const kenyaCounties = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita-Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
] as const;

const normalizeLocation = (value: string) => value.trim().toLowerCase();

const locationAliases: Record<string, string> = {
  eldoret: "uasin gishu",
  kitale: "trans nzoia",
};

const airtelSupportedLocations = new Set(
  [
    "Bungoma",
    "Garissa",
    "Kakamega",
    "Kilifi",
    "Kisii",
    "Kisumu",
    "Machakos",
    "Meru",
    "Migori",
    "Mombasa",
    "Nairobi",
    "Nakuru",
    "Uasin Gishu",
    "Trans Nzoia",
  ].map(normalizeLocation)
);

const resolveLocationKey = (value: string) => {
  const key = normalizeLocation(value);
  return locationAliases[key] ?? key;
};

export function isLocationSupportedForProvider(
  providerSlug: string,
  location: string
): boolean {
  const key = resolveLocationKey(location);
  if (providerSlug === "airtel") return airtelSupportedLocations.has(key);
  return true;
}

export function getUnsupportedLocationMessage(
  providerSlug: string,
  location: string
): string | null {
  if (providerSlug !== "airtel") return null;
  if (isLocationSupportedForProvider(providerSlug, location)) return null;
  return `Airtel isn't available in ${location.trim()} yet.`;
}

export function getCountiesForProvider(providerSlug: string): readonly string[] {
  if (providerSlug !== "airtel") return kenyaCounties;
  return kenyaCounties.filter((county) => isLocationSupportedForProvider(providerSlug, county));
}
