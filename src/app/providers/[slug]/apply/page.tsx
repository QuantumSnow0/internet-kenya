import { notFound } from "next/navigation";
import { providers } from "@/app/data/providers";
import { ApplyForm } from "./_components/ApplyForm";

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
  searchParams: Promise<{ plan?: string | string[]; speed?: string | string[]; price?: string | string[]; county?: string | string[]; device?: string | string[] }>;
}) {
  const { slug } = await params;
  if (!PROVIDER_SET.has(slug)) notFound();

  const query = await searchParams;
  const planRaw = getSingleQueryValue(query.plan);
  const planName = planRaw ? decodeURIComponent(planRaw) : "";
  const speed = getSingleQueryValue(query.speed);
  const priceRaw = getSingleQueryValue(query.price);
  const price = priceRaw ? decodeURIComponent(priceRaw) : "";
  const priceShort = price ? price.replace(/\s*KSh\/month$/i, " KSh/mo") : "";
  const county = getSingleQueryValue(query.county);
  const deviceRaw = getSingleQueryValue(query.device);
  const device = deviceRaw ? decodeURIComponent(deviceRaw) : "";

  return (
    <div className="min-h-screen bg-background">
      <main className="px-0 pt-2 sm:px-6 sm:pt-4">
        <div className="flex flex-col items-center gap-3">
          {(county || planName) && (
            <div className="flex w-full flex-row items-center justify-between gap-2 px-3 sm:px-0">
              {county && (
                <p className="text-sm font-medium text-white/60 sm:text-base">
                  {decodeURIComponent(county)}
                </p>
              )}
              {planName && (
                <p className="text-sm font-semibold text-white/90 sm:text-base">
                  {planName}
                </p>
              )}
            </div>
          )}
          {(speed || price || device) && (
            <>
              {/* Mobile: 2-row grid + horizontal separator, both vertical separators aligned */}
              <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-1.5 sm:hidden">
                {speed && (
                  <p className="col-start-1 row-start-1 min-w-0 bg-linear-to-br from-white via-violet-200 to-emerald-300 bg-clip-text text-xl font-extrabold tabular-nums tracking-tight text-transparent selection:bg-violet-500/30">
                    {decodeURIComponent(speed)}
                  </p>
                )}
                {(speed && price) && (
                  <span
                    className="col-start-2 row-start-1 h-6 w-px justify-self-center bg-white/40"
                    aria-hidden
                  />
                )}
                {price && (
                  <p className="col-start-3 row-start-1 min-w-0 text-right font-mono text-base font-bold text-white">
                    {priceShort}
                  </p>
                )}
                {device && (
                  <>
                    <span
                      className="col-span-3 row-start-2 h-px w-full bg-white/40"
                      aria-hidden
                    />
                    <span className="col-start-1 row-start-3 min-w-0 font-mono text-base font-bold text-white">
                      Device
                    </span>
                    <span
                      className="col-start-2 row-start-3 h-6 w-px justify-self-center bg-white/40"
                      aria-hidden
                    />
                    <span className="col-start-3 row-start-3 min-w-0 text-right font-mono text-base font-bold text-white">
                      {decodeURIComponent(device)}
                    </span>
                    <span
                      className="col-span-3 row-start-4 h-px w-full bg-white/40"
                      aria-hidden
                    />
                  </>
                )}
              </div>
              {/* Desktop: speed | sep | price | sep | device (separators in between), separator below */}
              <div className="hidden w-full flex-col sm:flex">
                <div className="grid w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-0">
                  {speed && (
                    <p className="justify-self-start bg-linear-to-br from-white via-violet-200 to-emerald-300 bg-clip-text text-xl font-extrabold tabular-nums tracking-tight text-transparent selection:bg-violet-500/30 sm:text-2xl md:text-3xl">
                      {decodeURIComponent(speed)}
                    </p>
                  )}
                  {(speed && price) && (
                    <span
                      className="h-6 w-px justify-self-center bg-white/40"
                      aria-hidden
                    />
                  )}
                  {price && (
                    <p className="justify-self-center font-mono text-base font-bold text-white sm:text-lg">
                      {price}
                    </p>
                  )}
                  {(price && device) && (
                    <span
                      className="h-6 w-px justify-self-center bg-white/40"
                      aria-hidden
                    />
                  )}
                  {device && (
                    <p className="justify-self-end font-mono text-base font-bold text-white sm:text-lg">
                      Device: {decodeURIComponent(device)}
                    </p>
                  )}
                </div>
                <span
                  className="mt-3 h-px w-full bg-white/40"
                  aria-hidden
                />
              </div>
            </>
          )}
          <div className="mt-3 w-full px-3 sm:px-0">
            <ApplyForm />
          </div>
        </div>
      </main>
    </div>
  );
}
