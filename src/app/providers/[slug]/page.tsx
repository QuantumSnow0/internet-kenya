import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProviderCountyStep } from "./_components/ProviderCountyStep";

const PROVIDERS: Record<
  string,
  {
    name: string;
    description: string;
    accent: "emerald" | "red" | "white";
    logoSrc: string;
    logoWidth: number;
    logoHeight: number;
  }
> = {
  safaricom: {
    name: "Safaricom",
    description: "View and sign up for Safaricom internet plans.",
    accent: "emerald",
    logoSrc: "/safaricom-logo.png",
    logoWidth: 176,
    logoHeight: 88,
  },
  airtel: {
    name: "Airtel",
    description: "View and sign up for Airtel internet plans.",
    accent: "red",
    logoSrc: "/airtel-logo.png",
    logoWidth: 112,
    logoHeight: 56,
  },
  faiba: {
    name: "Faiba",
    description: "View and sign up for Faiba internet plans.",
    accent: "white",
    logoSrc: "/faiba-logo.jpg",
    logoWidth: 96,
    logoHeight: 48,
  },
};

export async function generateStaticParams() {
  return Object.keys(PROVIDERS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const provider = PROVIDERS[slug];
  if (!provider) return { title: "Provider" };
  return {
    title: `${provider.name} – Internet plans`,
    description: provider.description,
  };
}

/**
 * Dynamic provider page controller:
 * shared routing + metadata with provider-specific content components.
 */
export default async function ProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = PROVIDERS[slug];

  if (!provider) notFound();
  return (
    <ProviderCountyStep
      providerName={provider.name}
      logoSrc={provider.logoSrc}
      logoWidth={provider.logoWidth}
      logoHeight={provider.logoHeight}
      accent={provider.accent}
    />
  );
}
