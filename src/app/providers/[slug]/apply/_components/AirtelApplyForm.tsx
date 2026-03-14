"use client";

import { useState } from "react";

const buttonClass =
  "mt-2 w-full rounded-lg border-2 border-red-400/50 bg-red-500/25 px-4 py-3 text-sm font-semibold text-red-100 transition-colors hover:bg-red-500/35 hover:border-red-400/60 active:bg-red-500/30 disabled:opacity-50 disabled:pointer-events-none mb-10";
const inputClass =
  "w-full border-0 border-b-2 border-white/25 bg-transparent px-0 pb-2 pt-1 text-sm text-white placeholder:text-white/40 focus:border-red-400/80 focus:outline-none focus:ring-0 sm:text-base";
const labelClass = "text-xs font-medium text-white/85 sm:text-sm";
const selectClass =
  "w-full border-0 border-b-2 border-white/25 bg-transparent px-0 pb-2 pt-1 text-sm text-white focus:border-red-400/80 focus:outline-none focus:ring-0 sm:text-base [&>option]:bg-[rgb(25,28,41)]";

/** Visit time options (12-hour display, 24-hour value for API). */
const VISIT_TIME_OPTIONS: { label: string; value: string }[] = [
  { label: "8:00 AM", value: "08:00" },
  { label: "9:00 AM", value: "09:00" },
  { label: "10:00 AM", value: "10:00" },
  { label: "11:00 AM", value: "11:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "1:00 PM", value: "13:00" },
  { label: "2:00 PM", value: "14:00" },
  { label: "3:00 PM", value: "15:00" },
  { label: "4:00 PM", value: "16:00" },
  { label: "5:00 PM", value: "17:00" },
  { label: "6:00 PM", value: "18:00" },
];

type AirtelApplyFormProps = {
  /** Towns for installation (e.g. Airtel-supported counties). */
  installationTowns: readonly string[];
  /** Pre-fill from plan: 15 Mbps → standard, 30 Mbps → premium. */
  defaultPackage?: "standard" | "premium";
  /** Pre-fill from URL county param. */
  defaultTown?: string;
};

/** Airtel SmartConnect registration form – 10 customer fields. Submit/MS Forms later. */
export function AirtelApplyForm({
  installationTowns,
  defaultPackage,
  defaultTown = "",
}: AirtelApplyFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [airtelNumber, setAirtelNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [email, setEmail] = useState("");
  const [preferredPackage, setPreferredPackage] = useState<"standard" | "premium">(
    defaultPackage ?? "standard"
  );
  const [installationTown, setInstallationTown] = useState(defaultTown);
  const [deliveryLandmark, setDeliveryLandmark] = useState("");
  const [installationLocation, setInstallationLocation] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitMessage(null);
    setSubmitting(true);

    const payload = {
      customerName: customerName.trim(),
      airtelNumber: airtelNumber.replace(/\s/g, ""),
      alternateNumber: alternateNumber.replace(/\s/g, ""),
      email: email.trim(),
      preferredPackage,
      installationTown,
      deliveryLandmark: deliveryLandmark.trim(),
      installationLocation: installationLocation.trim(),
      visitDate,
      visitTime,
    };

    try {
      const res = await fetch("/api/airtel/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        console.log("[Airtel apply] MS Forms submission succeeded:", data);
        setSubmitMessage({ type: "success", text: data.message ?? "Submitted successfully." });
      } else {
        console.error("[Airtel apply] MS Forms submission failed:", res.status, data);
        setSubmitMessage({ type: "error", text: data.message ?? "Submission failed." });
      }
    } catch (err) {
      console.error("[Airtel apply] Submit request error:", err);
      setSubmitMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="airtel-customer-name" className={labelClass}>
          Full names
        </label>
        <input
          id="airtel-customer-name"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="John Kamau"
          className={inputClass}
          autoComplete="name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="airtel-airtel-number" className={labelClass}>
          Airtel number
        </label>
        <input
          id="airtel-airtel-number"
          type="tel"
          value={airtelNumber}
          onChange={(e) => setAirtelNumber(e.target.value)}
          placeholder="0712345678 or 254712345678"
          className={inputClass}
          autoComplete="tel"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="airtel-alternate-number" className={labelClass}>
          Alternate number
        </label>
        <input
          id="airtel-alternate-number"
          type="tel"
          value={alternateNumber}
          onChange={(e) => setAlternateNumber(e.target.value)}
          placeholder="0722123456"
          className={inputClass}
          autoComplete="tel-national"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="airtel-email" className={labelClass}>
          Email address
        </label>
        <input
          id="airtel-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="customer@example.com"
          className={inputClass}
          autoComplete="email"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="airtel-package" className={labelClass}>
          Preferred package
        </label>
        <select
          id="airtel-package"
          value={preferredPackage}
          onChange={(e) => setPreferredPackage(e.target.value as "standard" | "premium")}
          className={selectClass}
        >
          <option value="standard">Standard (15 Mbps)</option>
          <option value="premium">Premium (30 Mbps)</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="airtel-town" className={labelClass}>
          Installation town
        </label>
        <select
          id="airtel-town"
          value={installationTown}
          onChange={(e) => setInstallationTown(e.target.value)}
          className={selectClass}
        >
          <option value="">Select town</option>
          {installationTowns.map((town) => (
            <option key={town} value={town}>
              {town}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="airtel-landmark" className={labelClass}>
          Delivery landmark
        </label>
        <input
          id="airtel-landmark"
          type="text"
          value={deliveryLandmark}
          onChange={(e) => setDeliveryLandmark(e.target.value)}
          placeholder="Near Total station"
          className={inputClass}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="airtel-location" className={labelClass}>
          Installation location
        </label>
        <input
          id="airtel-location"
          type="text"
          value={installationLocation}
          onChange={(e) => setInstallationLocation(e.target.value)}
          placeholder="Kangemi, Langata"
          className={inputClass}
          autoComplete="address-level2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="airtel-visit-date" className={labelClass}>
          Visit date
        </label>
        <input
          id="airtel-visit-date"
          type="date"
          value={visitDate}
          onChange={(e) => setVisitDate(e.target.value)}
          className={inputClass}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="airtel-visit-time" className={labelClass}>
          Visit time
        </label>
        <select
          id="airtel-visit-time"
          value={visitTime}
          onChange={(e) => setVisitTime(e.target.value)}
          className={selectClass}
          required
        >
          <option value="">Select time</option>
          {VISIT_TIME_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {submitMessage && (
        <p
          className={
            submitMessage.type === "success"
              ? "text-sm font-medium text-emerald-400"
              : "text-sm font-medium text-red-400"
          }
        >
          {submitMessage.text}
        </p>
      )}

      <button type="submit" disabled={submitting} className={buttonClass}>
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
