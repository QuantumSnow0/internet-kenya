"use client";

type ApplyNowButtonProps = {
  /** Theme classes for the button (e.g. violet, sky, or tier accent). */
  buttonClassName: string;
  children?: React.ReactNode;
};

/** Apply now CTA: wrapper covers card border; button uses theme accent. */
export function ApplyNowButton({
  buttonClassName,
  children = "Apply now",
}: ApplyNowButtonProps) {
  return (
    <div
      className="absolute bottom-0 left-1/2 min-w-28 -translate-x-1/2 translate-y-1/4 rounded-lg bg-background"
      aria-hidden
    >
      <button
        type="button"
        className={`w-full rounded-lg border px-4 py-2 text-xs font-semibold transition-colors ${buttonClassName}`}
      >
        {children}
      </button>
    </div>
  );
}
