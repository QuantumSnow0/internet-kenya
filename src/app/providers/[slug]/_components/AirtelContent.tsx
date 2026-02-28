import Link from "next/link";

export function AirtelContent() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Airtel Home Internet
      </h1>
      <p className="text-center text-lg text-neutral-300">
        Airtel-specific plans, setup details, and sign-up flow will appear here.
      </p>
      <div className="rounded-2xl border border-red-400/30 bg-red-950/30 p-6 text-center">
        <p className="text-sm text-neutral-200">Placeholder design block for Airtel.</p>
      </div>
      <div className="text-center">
        <Link
          href="/"
          className="inline-block text-base font-medium text-foreground underline underline-offset-4 hover:no-underline"
        >
          ← Choose another provider
        </Link>
      </div>
    </div>
  );
}
