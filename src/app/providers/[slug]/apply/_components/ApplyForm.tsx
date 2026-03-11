"use client";

import { useState } from "react";

const inputClass =
  "w-full border-0 border-b-2 border-white/25 bg-transparent px-0 pb-2 pt-1 text-sm text-white placeholder:text-white/40 focus:border-emerald-400/80 focus:outline-none focus:ring-0 sm:text-base";
const labelClass = "text-xs font-medium text-white/60 sm:text-sm";

/** Apply / account creation form with underline-style inputs. */
export function ApplyForm() {
  const [fullNames, setFullNames] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [idNo, setIdNo] = useState("");
  const [dob, setDob] = useState("");
  const [estate, setEstate] = useState("");
  const [houseNo, setHouseNo] = useState("");

  return (
    <section className="flex w-full max-w-md flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="apply-full-names" className={labelClass}>
          Full names
        </label>
        <input
          id="apply-full-names"
          type="text"
          value={fullNames}
          onChange={(e) => setFullNames(e.target.value)}
          placeholder="Enter your full names"
          className={inputClass}
          autoComplete="name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="apply-email" className={labelClass}>
          Email address
        </label>
        <input
          id="apply-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={inputClass}
          autoComplete="email"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="apply-contact" className={labelClass}>
          Contact (Safaricom number)
        </label>
        <input
          id="apply-contact"
          type="tel"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="07XX XXX XXX"
          className={inputClass}
          autoComplete="tel"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="apply-id" className={labelClass}>
          ID no.
        </label>
        <input
          id="apply-id"
          type="text"
          value={idNo}
          onChange={(e) => setIdNo(e.target.value)}
          placeholder="Enter ID number"
          className={inputClass}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="apply-dob" className={labelClass}>
          Date of birth
        </label>
        <input
          id="apply-dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className={inputClass}
          autoComplete="bday"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="apply-estate" className={labelClass}>
          Estate name or apartment name
        </label>
        <input
          id="apply-estate"
          type="text"
          value={estate}
          onChange={(e) => setEstate(e.target.value)}
          placeholder="Kileleshwa Apartments"
          className={inputClass}
          autoComplete="address-level2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="apply-house-no" className={labelClass}>
          House no.
        </label>
        <input
          id="apply-house-no"
          type="text"
          value={houseNo}
          onChange={(e) => setHouseNo(e.target.value)}
          placeholder="B12"
          className={inputClass}
          autoComplete="address-line1"
        />
      </div>
    </section>
  );
}
