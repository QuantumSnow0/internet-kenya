export type ProviderAccent = "emerald" | "red";

export type ProviderCard = {
  slug: string;
  name: string;
  logo: string;
  accent: ProviderAccent;
  logoSize: string;
  imageSize: {
    width: number;
    height: number;
  };
};

export const providers: readonly ProviderCard[] = [
  {
    slug: "safaricom",
    name: "Safaricom",
    logo: "/safaricom-logo.png",
    accent: "emerald",
    logoSize: "h-16 w-20 sm:h-20 sm:w-24 md:h-28 md:w-32 lg:h-36 lg:w-44",
    imageSize: { width: 176, height: 88 },
  },
  {
    slug: "airtel",
    name: "Airtel",
    logo: "/airtel-logo.png",
    accent: "red",
    logoSize: "h-7 w-12 sm:h-10 sm:w-16 md:h-12 md:w-24 lg:h-14 lg:w-28",
    imageSize: { width: 112, height: 56 },
  }
];
