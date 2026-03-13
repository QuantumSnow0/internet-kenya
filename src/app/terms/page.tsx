import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions of use for Internet Kenya.",
};

const sectionClass = "mb-8";
const headingClass = "mb-3 text-lg font-semibold text-white sm:text-xl";
const paraClass = "text-sm leading-relaxed text-white/80 sm:text-base";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-0 py-8 sm:py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-white/60 transition-colors hover:text-white"
      >
        ← Back to Home
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl">Terms and Conditions</h1>
      <p className={`${paraClass} mb-6`}>
        Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.
        By using Internet Kenya (“the site”), you agree to these terms.
      </p>

      <section className={sectionClass}>
        <h2 className={headingClass}>1. Use of the service</h2>
        <p className={paraClass}>
          Internet Kenya provides information and tools to compare internet service providers (ISPs)
          and to submit applications or requests for connection. You may use the site only for
          lawful purposes and in line with these terms.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>2. Accuracy of information</h2>
        <p className={paraClass}>
          We strive to keep plan details, prices, and coverage information accurate and up to date.
          However, offers and availability are set by the respective ISPs. Final terms, pricing,
          and eligibility are determined by the provider. We recommend confirming details on the
          provider’s official channels before committing.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>3. Applications and submissions</h2>
        <p className={paraClass}>
          When you submit an application or request through our site (for example, for Airtel or
          other providers), you agree to provide accurate and complete information. Submission
          may be passed to the relevant provider or processed via their systems (e.g. Microsoft
          Forms). The provider’s own terms and privacy policies apply to how they use your data.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>4. Third-party services</h2>
        <p className={paraClass}>
          The site may link to or integrate with third-party services (including ISP sites and
          forms). We are not responsible for their content, availability, or practices. Your
          use of those services is at your own risk and subject to their terms and policies.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>5. Limitation of liability</h2>
        <p className={paraClass}>
          To the fullest extent permitted by law, Internet Kenya and its operators shall not be
          liable for any indirect, incidental, or consequential damages arising from your use of
          the site or from any actions taken by ISPs or third parties. Our liability is limited
          to the extent permitted under applicable Kenyan law.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>6. Changes</h2>
        <p className={paraClass}>
          We may update these terms from time to time. The “Last updated” date at the top will
          be revised when we do. Continued use of the site after changes constitutes acceptance
          of the updated terms.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>7. Contact</h2>
        <p className={paraClass}>
          For questions about these terms, please use our{" "}
          <Link href="/contact" className="text-white underline decoration-white/50 underline-offset-2 hover:decoration-white">
            Contact
          </Link>{" "}
          page.
        </p>
      </section>
    </div>
  );
}
