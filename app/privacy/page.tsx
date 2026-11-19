import type { Metadata } from "next";
import { Eyebrow, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata(
  "Privacy and Data Use",
  "Learn how Northstar handles contact enquiries, newsletter subscriptions, modernization scan responses, feedback and website analytics.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-24">
      <Shell width="narrow">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl">Privacy statement</h1>
        <p className="mt-5 leading-7 text-muted">
          Northstar uses information submitted through this website to respond
          to enquiries, send updates when you explicitly subscribe, and uses
          Google Analytics to understand site usage. We do not sell personal
          information or use enquiry details for unrelated marketing.
        </p>
        <h2 className="mt-10 font-display text-2xl">Contact form information</h2>
        <p className="mt-3 leading-7 text-muted">
          When you contact us, we use the details you provide to respond to your
          request and discuss the relevant business need. Do not include
          sensitive information in the form.
        </p>
        <h2 className="mt-10 font-display text-2xl">Newsletter subscriptions</h2>
        <p className="mt-3 leading-7 text-muted">
          If you subscribe, we collect your email address, your consent and the
          signup source so we can send occasional Northstar news and insights.
          Newsletter addresses are stored in a private Postgres database hosted
          through Neon and recorded in our Google Sheets contact-management
          system. We do not use contact enquiry details for newsletters unless
          you separately opt in. You can ask us to remove your address at any
          time by emailing{" "}
          <a
            className="text-brand-gold underline"
            href="mailto:hello@northstar53.com?subject=Newsletter%20unsubscribe"
          >
            hello@northstar53.com
          </a>
          .
        </p>
        <h2 className="mt-10 font-display text-2xl">
          Business modernization scan
        </h2>
        <p className="mt-3 leading-7 text-muted">
          If you complete the scan, we collect your name, company, work email,
          answers and calculated score to generate your personalized results,
          email you a copy of the report, and follow up about your business
          needs. If you send feedback, we store
          the rating and comment with the scan and send them as a separate
          inquiry under Business modernization scan. Scan details are sent to
          our contact management service and stored in a private Postgres
          database hosted through Neon. Do not submit confidential or sensitive
          business information.
        </p>
        <h2 className="mt-10 font-display text-2xl">Website analytics</h2>
        <p className="mt-3 leading-7 text-muted">
          This website uses Google Analytics 4 to measure visits and
          interactions. Google may process information such as pages viewed,
          browser and device details, referring pages and online identifiers
          using cookies or similar technologies. For more information, see{" "}
          <a
            className="text-brand-gold underline"
            href="https://policies.google.com/privacy"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google&apos;s Privacy Policy
          </a>
          . You can manage cookies through your browser settings.
        </p>
        <h2 className="mt-10 font-display text-2xl">Contact</h2>
        <p className="mt-3 leading-7 text-muted">
          For privacy questions, email{" "}
          <a className="text-brand-gold underline" href="mailto:hello@northstar53.com">hello@northstar53.com</a>.
        </p>
      </Shell>
    </section>
  );
}
