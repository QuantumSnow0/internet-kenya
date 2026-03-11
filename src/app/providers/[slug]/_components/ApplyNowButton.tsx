"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type ApplyNowButtonProps = {
  /** Theme classes for the button (e.g. violet, sky, or tier accent). */
  buttonClassName: string;
  /** Plan name for apply page header (e.g. "Home Fiber", "5G data plans"). Passed as query param. */
  planName?: string;
  /** Speed/label to show on apply page (e.g. "15 Mbps"). Passed as query param. */
  speedLabel?: string;
  /** Price to show on apply page (e.g. "2,999 KSh/month"). Passed as query param. */
  priceLabel?: string;
  /** Device price line for apply page (e.g. "10,000 KSh → 2,999 KSh"). Only for 5G. */
  devicePriceLabel?: string;
  children?: React.ReactNode;
};

/** Apply now CTA: links to provider apply page; wrapper covers card border. */
export function ApplyNowButton({
  buttonClassName,
  planName,
  speedLabel,
  priceLabel,
  devicePriceLabel,
  children = "Apply now",
}: ApplyNowButtonProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const baseApply = pathname?.endsWith("/apply") ? pathname : `${pathname}/apply`;
  const params = new URLSearchParams(searchParams?.toString() ?? "");
  if (planName) params.set("plan", planName);
  if (speedLabel) params.set("speed", speedLabel);
  if (priceLabel) params.set("price", priceLabel);
  if (devicePriceLabel) params.set("device", devicePriceLabel);
  const query = params.toString() ? `?${params.toString()}` : "";
  const applyHref = `${baseApply}${query}`;

  return (
    <div
      className="absolute bottom-0 left-1/2 min-w-28 -translate-x-1/2 translate-y-1/4 rounded-lg bg-background"
      aria-hidden
    >
      <Link
        href={applyHref}
        className={`block w-full rounded-lg border px-4 py-2 text-center text-xs font-semibold transition-colors ${buttonClassName}`}
      >
        {children}
      </Link>
    </div>
  );
}
