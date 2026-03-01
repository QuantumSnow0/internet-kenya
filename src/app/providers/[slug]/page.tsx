import { notFound } from "next/navigation";
import { ProviderPageNoScroll } from "./_components/ProviderPageNoScroll";

const PROVIDER_SLUGS = ["safaricom", "airtel", "faiba"] as const;
const PROVIDER_SET = new Set<string>(PROVIDER_SLUGS);

export async function generateStaticParams() {
  return PROVIDER_SLUGS.map((slug) => ({ slug }));
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!PROVIDER_SET.has(slug)) notFound();
  return (
    <>
      <ProviderPageNoScroll />
      <section className="h-full min-h-0 bg-[rgb(25,28,41)]" />
    </>
  );
}
