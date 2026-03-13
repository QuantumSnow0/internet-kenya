"use client";

import Link from "next/link";
import { providers } from "@/app/data/providers";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto shrink-0 border-t border-white/10 bg-[rgb(25,28,41)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-white transition-colors hover:text-white/90 sm:text-xl"
            >
              Internet Kenya
            </Link>
            <p className="max-w-xs text-sm text-white/60">
              Find and sign up for the best internet in your area. Compare plans by speed, price, and coverage.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                Providers
              </h3>
              <nav className="flex flex-col gap-2" aria-label="Provider links">
                {providers.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/providers/${p.slug}`}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {p.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                Site
              </h3>
              <nav className="flex flex-col gap-2" aria-label="Site links">
                <Link href="/" className="text-sm text-white/80 transition-colors hover:text-white">
                  Home
                </Link>
                <Link href="/about" className="text-sm text-white/80 transition-colors hover:text-white">
                  About
                </Link>
                <Link href="/contact" className="text-sm text-white/80 transition-colors hover:text-white">
                  Contact
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                Legal
              </h3>
              <nav className="flex flex-col gap-2" aria-label="Legal links">
                <Link href="/terms" className="text-sm text-white/80 transition-colors hover:text-white">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="text-sm text-white/80 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
          <p className="text-center text-xs text-white/50 sm:text-left sm:text-sm">
            © {year} Internet Kenya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
