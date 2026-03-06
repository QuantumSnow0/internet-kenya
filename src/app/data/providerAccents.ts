import type { ProviderAccent } from "./providers";

/** Gradient classes for provider logo boxes (header, value comparison). Use with bg-linear-to-b. */
export const providerLogoAccent: Record<ProviderAccent, string> = {
  emerald: "from-emerald-300 via-emerald-100 to-white",
  red: "from-red-300 via-red-100 to-white",
  white: "from-neutral-300 via-neutral-100 to-white",
};

/** Full card classes for provider selection cards on home (gradient + shadow + hover). */
export const providerCardAccent: Record<ProviderAccent, string> = {
  emerald:
    "bg-gradient-to-b from-emerald-300 via-emerald-100 to-white shadow-lg shadow-black/15 md:hover:scale-[1.04] md:hover:from-emerald-400 md:hover:via-emerald-200 md:hover:to-white md:hover:shadow-xl md:hover:shadow-black/20 focus:ring-white",
  red: "bg-gradient-to-b from-red-300 via-red-100 to-white shadow-lg shadow-black/15 md:hover:scale-[1.04] md:hover:from-red-400 md:hover:via-red-200 md:hover:to-white md:hover:shadow-xl md:hover:shadow-black/20 focus:ring-white",
  white:
    "bg-gradient-to-b from-neutral-300 via-neutral-100 to-white shadow-lg shadow-black/15 md:hover:scale-[1.04] md:hover:from-neutral-400 md:hover:via-neutral-200 md:hover:to-white md:hover:shadow-xl md:hover:shadow-black/20 focus:ring-white",
};
