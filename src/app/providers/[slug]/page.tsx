import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const PROVIDERS: Record<string, { name: string }> = {
  safaricom: { name: "Safaricom" },
  airtel: { name: "Airtel" },
};

export async function generateStaticParams() {
  return Object.keys(PROVIDERS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params();
  const provider = PROVIDERS[slug];
  if (!provider) return { title: "Provider" };
  return {
    title: `${provider.name} – Internet plans`,
    description: `View and sign up for ${provider.name} internet plans. Compare speed, price, and coverage.`,
  };
}

/**
 * Provider landing: after user picks an ISP from the homepage, they land here.
 * Stub for now; we'll add plans and sign-up CTA when we have data.
 */
export default async function ProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params();
  const provider = PROVIDERS[slug];

  if (!provider) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-8 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {provider.name}
      </h1>
      <p className="text-lg text-neutral-600">
        Plans and sign-up for {provider.name} will appear here. We’ll hook this
        up to real data next.
      </p>
      <Link
        href="/"
        className="inline-block text-base font-medium text-foreground underline underline-offset-4 hover:no-underline"
      >
        ← Choose another provider
      </Link>
    </div>
  );
}
