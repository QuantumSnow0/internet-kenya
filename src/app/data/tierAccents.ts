/** Tier name → accent classes for speed number, card background, and Apply button. */
export const tierAccent: Record<
  string,
  { number: string; card: string; button: string }
> = {
  Bronze: {
    number: "text-amber-400",
    card: "from-amber-500/10 to-transparent border-amber-400/20",
    button:
      "border-amber-400/30 bg-amber-500/25 text-amber-100 hover:bg-amber-500/35 hover:border-amber-400/50 active:bg-amber-500/30",
  },
  Silver: {
    number: "text-slate-300",
    card: "from-slate-400/10 to-transparent border-slate-400/20",
    button:
      "border-slate-400/30 bg-slate-500/25 text-slate-100 hover:bg-slate-500/35 hover:border-slate-400/50 active:bg-slate-500/30",
  },
  Gold: {
    number: "text-amber-300",
    card: "from-amber-400/12 to-transparent border-amber-300/25",
    button:
      "border-amber-300/30 bg-amber-400/25 text-amber-50 hover:bg-amber-400/35 hover:border-amber-300/50 active:bg-amber-400/30",
  },
  Diamond: {
    number: "text-sky-400",
    card: "from-sky-500/10 to-transparent border-sky-400/20",
    button:
      "border-sky-400/30 bg-sky-500/25 text-sky-100 hover:bg-sky-500/35 hover:border-sky-400/50 active:bg-sky-500/30",
  },
  Platinum: {
    number: "text-neutral-200",
    card: "from-neutral-400/10 to-transparent border-neutral-300/20",
    button:
      "border-neutral-400/30 bg-neutral-500/25 text-neutral-100 hover:bg-neutral-500/35 hover:border-neutral-400/50 active:bg-neutral-500/30",
  },
};

export const defaultTierAccent = {
  number: "text-white/80",
  card: "from-white/5 to-transparent border-white/12",
  button: "border-white/20 bg-white/15 text-white hover:bg-white/25 active:bg-white/20",
} as const;

export function getTierAccent(tier: string) {
  return tierAccent[tier] ?? defaultTierAccent;
}
