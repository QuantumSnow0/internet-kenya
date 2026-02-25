"use client";

import { useCallback, useEffect, useState } from "react";

export type CarouselImage = { src: string; alt: string };

export type CarouselProps = {
  images: readonly CarouselImage[];
  intervalMs?: number;
  className?: string;
  slideClassName?: string;
  ariaLabel?: string;
};

const DEFAULT_INTERVAL_MS = 3500;
const TRANSITION_MS = 700;
const FADE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * Full-bleed carousel: infinite loop via fade. No position reset — just cycle opacity.
 */
export function Carousel({
  images,
  intervalMs = DEFAULT_INTERVAL_MS,
  className = "",
  slideClassName,
  ariaLabel = "Carousel",
}: CarouselProps) {
  const [index, setIndex] = useState(0);

  const goNext = useCallback(() => {
    if (images.length === 0) return;
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (intervalMs <= 0 || images.length === 0) return;
    const id = setInterval(goNext, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, images.length, goNext]);

  const defaultSlideClass =
    "relative h-[72vh] min-h-[320px] w-full overflow-hidden";

  if (images.length === 0) return null;

  return (
    <div role="region" aria-label={ariaLabel} className={className}>
      <div className="relative w-screen h-[72vh] min-h-[320px] overflow-hidden">
        {images.map((img, i) => (
          <div
            key={i}
            className={slideClassName ?? defaultSlideClass}
            style={{
              position: "absolute",
              inset: 0,
              opacity: index === i ? 1 : 0,
              transition: `opacity ${TRANSITION_MS}ms ${FADE_EASING}`,
              pointerEvents: index === i ? "auto" : "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 h-full w-full object-cover"
              width={800}
              height={440}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 min-h-[140px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgb(25, 28, 41) 0%, rgba(25, 28, 41, 0.9) 40%, rgba(25, 28, 41, 0.4) 70%, transparent 100%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
