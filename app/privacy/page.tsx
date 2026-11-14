import type { Metadata } from "next";
import { Eyebrow, Shell } from "@/components/ui";
export const metadata: Metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-24">
      <Shell width="narrow">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl">Privacy statement</h1>
        <p className="mt-5 leading-7 text-muted">
          Northstar collects only the information needed to respond to an
          enquiry submitted through this website. We do not sell personal
          information or use it for unrelated marketing.
        </p>
        <h2 className="mt-10 font-display text-2xl">Contact form information</h2>
        <p className="mt-3 leading-7 text-muted">
          When you contact us, we use the details you provide to respond to your
          request and discuss the relevant business need. Do not include
          sensitive information in the form.
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
