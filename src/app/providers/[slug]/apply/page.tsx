import Link from "next/link";
import { notFound } from "next/navigation";
import { providers } from "@/app/data/providers";

const PROVIDER_SLUGS = providers.map((p) => p.slug);
const PROVIDER_SET = new Set(PROVIDER_SLUGS);

export async function generateStaticParams() {
  return PROVIDER_SLUGS.map((slug) => ({ slug }));
}

function getSingleQueryValue(value: string | string[] | undefined) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] ?? "";
  return "";
}

export default async function ApplyPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ county?: string | string[] }>;
}) {
  const { slug } = await params;
  if (!PROVIDER_SET.has(slug)) notFound();

  const query = await searchParams;
  const county = getSingleQueryValue(query.county);
  const backHref = county
    ? `/providers/${slug}?county=${encodeURIComponent(county)}`
    : `/providers/${slug}`;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-white/15 bg-background px-3 py-3 sm:px-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
        >
          <svg
            aria-hidden
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>
      </header>
      <main className="px-3 py-6 sm:px-6" />
    </div>
  );
}
