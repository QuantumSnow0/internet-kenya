"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="bg-[rgb(25,28,41)] px-4 py-3 sm:px-6 sm:py-4">
      <div className="mx-auto max-w-6xl text-xs text-neutral-400 sm:text-sm">
        © {new Date().getFullYear()} Internet Kenya. Find and sign up for the best internet in your area.
      </div>
    </footer>
  );
}
