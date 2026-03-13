import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Internet Kenya, we help you compare and sign up for the best internet plans from major Kenyan ISPs.",
};

const sectionClass = "mb-8";
const headingClass = "mb-3 text-lg font-semibold text-white sm:text-xl";
const paraClass = "text-sm leading-relaxed text-white/80 sm:text-base";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-0 py-8 sm:py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-white/60 transition-colors hover:text-white"
      >
        ← Back to Home
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl">About Internet Kenya</h1>

      <section className={sectionClass}>
        <h2 className={headingClass}>What we do</h2>
        <p className={paraClass}>
        At Internet Kenya, we put customers at the heart of their internet experience. We bring all internet providers together in one trusted marketplace, so you can see real speeds, transparent pricing, and honest customer reviews all in one place. Just like your trusted ride-share app, we match you with the best internet service for your location and needs—giving you confidence and simplicity in your choice. Your best internet is just a click away.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Our mission</h2>
        <p className={paraClass}>
          We believe everyone deserves clear, honest information about internet options. We put
          location first: see what’s available where you live, compare deals side by side, and
          complete sign-up or connection requests without the runaround.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Contact</h2>
        <p className={paraClass}>
          Questions or feedback? Visit our{" "}
          <Link href="/contact" className="text-white underline decoration-white/50 underline-offset-2 hover:decoration-white">
            Contact
          </Link>{" "}
          page to get in touch.
        </p>
      </section>
    </div>
  );
}
