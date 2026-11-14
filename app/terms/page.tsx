import type { Metadata } from "next";
import { Eyebrow, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = pageMetadata(
  "Terms",
  "Terms for using the Northstar website and its content.",
  "/terms",
);
export default function TermsPage() {
  return (
    <section className="py-16 sm:py-24">
      <Shell width="narrow">
        <Eyebrow>Terms</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl">Website terms</h1>
        <p className="mt-5 leading-7 text-muted">
          The content on this website is provided for general information about
          Northstar&apos;s capabilities. It does not form a proposal, commitment
          or professional advice.
        </p>
        <h2 className="mt-10 font-display text-2xl">Intellectual property</h2>
        <p className="mt-3 leading-7 text-muted">
          Northstar&apos;s brand, website content and visual assets may not be
          reused without permission.
        </p>
        <h2 className="mt-10 font-display text-2xl">Contact</h2>
        <p className="mt-3 leading-7 text-muted">
          For questions about these terms, email{" "}
          <a className="text-brand-gold underline" href="mailto:hello@northstar53.com">hello@northstar53.com</a>.
        </p>
      </Shell>
    </section>
  );
}
