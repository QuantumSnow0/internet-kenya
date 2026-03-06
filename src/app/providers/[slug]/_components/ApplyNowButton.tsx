"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type ApplyNowButtonProps = {
  /** Theme classes for the button (e.g. violet, sky, or tier accent). */
  buttonClassName: string;
  children?: React.ReactNode;
};

/** Apply now CTA: links to provider apply page; wrapper covers card border. */
export function ApplyNowButton({
  buttonClassName,
  children = "Apply now",
}: ApplyNowButtonProps) {
  const pathname = usePathname();
  const applyHref = pathname?.endsWith("/apply") ? pathname : `${pathname}/apply`;

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
