import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Internet Kenya for questions or feedback.",
};

const sectionClass = "mb-8";
const headingClass = "mb-3 text-lg font-semibold text-white sm:text-xl";
const paraClass = "text-sm leading-relaxed text-white/80 sm:text-base";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-0 py-8 sm:py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-white/60 transition-colors hover:text-white"
      >
        ← Back to Home
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl">Contact Us</h1>

      <section className={sectionClass}>
        <h2 className={headingClass}>Get in touch</h2>
        <p className={paraClass}>
          Have a question about our comparison service, a problem with an application, or
          feedback to share? We’d like to hear from you.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Ways to reach us</h2>
        <p className={paraClass}>
          You can reach us by email. We aim to respond within a few business days. For
          issues specific to your internet connection or plan (billing, installation, coverage),
          please contact your provider directly—Safaricom, Airtel, Faiba, or whichever ISP
          you signed up with.
        </p>
        <p className={`${paraClass} mt-3`}>
          <strong className="text-white">Email:</strong>{" "}
          <a
            href="mailto:support@internetkenya.co.ke"
            className="text-white underline decoration-white/50 underline-offset-2 hover:decoration-white"
          >
            support@internetkenya.co.ke
          </a>
        </p>
        <p className="mt-2 text-xs text-white/60">
          
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Other links</h2>
        <p className={paraClass}>
          <Link href="/about" className="text-white underline decoration-white/50 underline-offset-2 hover:decoration-white">About Us</Link>
          {" · "}
          <Link href="/terms" className="text-white underline decoration-white/50 underline-offset-2 hover:decoration-white">Terms and Conditions</Link>
          {" · "}
          <Link href="/privacy" className="text-white underline decoration-white/50 underline-offset-2 hover:decoration-white">Privacy Policy</Link>
        </p>
      </section>
    </div>
  );
}
