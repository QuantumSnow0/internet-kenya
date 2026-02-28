"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ProviderCountyStepProps = {
  providerName: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  accent: "emerald" | "red" | "white";
};

const KENYA_COUNTIES = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita-Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
] as const;

const accentCardClass = {
  emerald: "from-emerald-300 via-emerald-100 to-white",
  red: "from-red-300 via-red-100 to-white",
  white: "from-neutral-300 via-neutral-100 to-white",
} as const;

export function ProviderCountyStep({
  providerName,
  logoSrc,
  logoWidth,
  logoHeight,
  accent,
}: ProviderCountyStepProps) {
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    const timer = setTimeout(() => setShowForm(true), 320);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  const filteredCounties = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return KENYA_COUNTIES;
    return KENYA_COUNTIES.filter((county) => county.toLowerCase().includes(value));
  }, [query]);

  const handleSelectCounty = (county: string) => {
    setSelectedCounty(county);
    setQuery(county);
    setShowSuggestions(false);
  };

  return (
    <div className="mx-auto max-w-md space-y-5 py-8">
      <p className="text-center text-sm font-medium tracking-wide text-white/75">
        Selected provider
      </p>

      <div
        className={`mx-auto w-44 rounded-2xl bg-linear-to-b ${accentCardClass[accent]} p-4 shadow-lg shadow-black/20 transition-all duration-500 ease-out ${
          mounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-90 opacity-0"
        }`}
      >
        <div className="relative flex aspect-square items-center justify-center">
          <Image
            src={logoSrc}
            alt={providerName}
            width={logoWidth}
            height={logoHeight}
            className="h-full w-full object-contain"
            priority
          />
        </div>
        <p className="mt-2 text-center font-heading text-xs font-semibold tracking-[0.08em] text-neutral-900">
          {providerName}
        </p>
      </div>

      <div
        className={`rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm transition-all duration-500 ease-out ${
          showForm ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <label htmlFor="county" className="mb-2 block text-sm font-medium text-white/90">
          Pick your county
        </label>
        <input
          id="county"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedCounty("");
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Start typing county..."
          className="w-full rounded-xl border border-white/20 bg-neutral-950/70 px-3 py-2 text-sm text-white placeholder:text-white/45 focus:border-white/40 focus:outline-none"
        />

        {showSuggestions && filteredCounties.length > 0 && (
          <ul className="mt-2 max-h-44 overflow-y-auto rounded-xl border border-white/15 bg-neutral-950/95 p-1">
            {filteredCounties.slice(0, 8).map((county) => (
              <li key={county}>
                <button
                  type="button"
                  onClick={() => handleSelectCounty(county)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10"
                >
                  {county}
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          disabled={!selectedCounty}
          className="mt-4 w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          View plans in {selectedCounty || "your county"}
        </button>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-block text-sm font-medium text-white/80 underline underline-offset-4 hover:text-white"
        >
          ← Change provider
        </Link>
      </div>
    </div>
  );
}
