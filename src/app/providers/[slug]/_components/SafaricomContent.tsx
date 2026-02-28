import Link from "next/link";

export function SafaricomContent() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-8">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Safaricom Home Internet
      </h1>
      <p className="text-center text-lg text-neutral-300">
        Safaricom-specific plans, setup details, and sign-up flow will appear here.
      </p>
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-950/30 p-6 text-center">
        <p className="text-sm text-neutral-200">Placeholder design block for Safaricom.</p>
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
