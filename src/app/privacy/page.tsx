import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Internet Kenya collects, uses, and protects your information.",
};

const sectionClass = "mb-8";
const headingClass = "mb-3 text-lg font-semibold text-white sm:text-xl";
const paraClass = "text-sm leading-relaxed text-white/80 sm:text-base";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-0 py-8 sm:py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-white/60 transition-colors hover:text-white"
      >
        ← Back to Home
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl">Privacy Policy</h1>
      <p className={`${paraClass} mb-6`}>
        Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.
        This policy describes how Internet Kenya (“we”, “the site”) handles your information.
      </p>

      <section className={sectionClass}>
        <h2 className={headingClass}>1. Information we collect</h2>
        <p className={paraClass}>
          When you use the site, we may collect: (a) information you provide when filling forms
          (e.g. name, email, phone, address, installation preferences) to submit applications or
          requests to ISPs; (b) technical data such as IP address, device type, and browser
          type; (c) usage data (e.g. pages visited, actions taken) to improve the service.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>2. How we use your information</h2>
        <p className={paraClass}>
          We use your information to: operate and improve the site; process and pass on your
          applications or requests to the relevant internet providers; communicate with you about
          your requests or the service; and comply with legal obligations. We may use aggregated,
          non-personal data for analytics.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>3. Sharing with third parties</h2>
        <p className={paraClass}>
          When you submit an application (e.g. for Airtel or another provider), the data you
          provide may be sent to that provider or their systems (such as Microsoft Forms). Each
          provider has its own privacy policy governing how they use your data. We do not sell
          your personal information to third parties for marketing.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>4. Data retention and security</h2>
        <p className={paraClass}>
          We retain your information only as long as needed to fulfil the purposes described
          here or as required by law. We take reasonable steps to protect your data; however,
          no transmission over the internet is completely secure, and we cannot guarantee
          absolute security.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>5. Your rights</h2>
        <p className={paraClass}>
          Depending on applicable law (including Kenyan data protection law), you may have
          rights to access, correct, or delete your personal data, or to object to or restrict
          certain processing. To exercise these rights or ask questions, please contact us via
          our{" "}
          <Link href="/contact" className="text-white underline decoration-white/50 underline-offset-2 hover:decoration-white">
            Contact
          </Link>{" "}
          page.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>6. Cookies and similar technologies</h2>
        <p className={paraClass}>
          The site may use cookies and similar technologies for essential operation, preferences,
          and analytics. You can adjust your browser settings to limit or block cookies; some
          features may not work fully if you do.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>7. Changes to this policy</h2>
        <p className={paraClass}>
          We may update this privacy policy from time to time. The “Last updated” date at the
          top will change when we do. We encourage you to review this page periodically.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>8. Contact</h2>
        <p className={paraClass}>
          For privacy-related questions or requests, please use our{" "}
          <Link href="/contact" className="text-white underline decoration-white/50 underline-offset-2 hover:decoration-white">
            Contact
          </Link>{" "}
          page.
        </p>
      </section>
    </div>
  );
}
