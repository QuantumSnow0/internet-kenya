"use client";

import Link from "next/link";
import { providers } from "@/app/data/providers";

const linkSectionClass = "flex flex-col gap-3";
const linkHeadingClass = "text-xs font-semibold uppercase tracking-wider text-white/50";
const linkClass = "text-sm text-white/80 transition-colors hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto shrink-0 border-t border-white/10 bg-[rgb(25,28,41)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Main footer content: brand + link columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-12">
          {/* Brand – full width on mobile, first column on desktop */}
          <div className="flex flex-col gap-2 sm:max-w-sm">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-white transition-colors hover:text-white/90 sm:text-xl"
            >
              Internet Kenya
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              Find and sign up for the best internet in your area. Compare plans by speed, price, and coverage.
            </p>
          </div>

          {/* Providers */}
          <div className={linkSectionClass}>
            <h3 className={linkHeadingClass}>Providers</h3>
            <nav className="flex flex-col gap-2" aria-label="Provider links">
              {providers.map((p) => (
                <Link key={p.slug} href={`/providers/${p.slug}`} className={linkClass}>
                  {p.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Site */}
          <div className={linkSectionClass}>
            <h3 className={linkHeadingClass}>Site</h3>
            <nav className="flex flex-col gap-2" aria-label="Site links">
              <Link href="/" className={linkClass}>Home</Link>
              <Link href="/about" className={linkClass}>About</Link>
              <Link href="/contact" className={linkClass}>Contact</Link>
            </nav>
          </div>

          {/* Legal */}
          <div className={linkSectionClass}>
            <h3 className={linkHeadingClass}>Legal</h3>
            <nav className="flex flex-col gap-2" aria-label="Legal links">
              <Link href="/terms" className={linkClass}>Terms & Conditions</Link>
              <Link href="/privacy" className={linkClass}>Privacy Policy</Link>
            </nav>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12 sm:pt-8">
          <p className="text-center text-xs text-white/50 sm:text-left sm:text-sm">
            © {year} Internet Kenya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
