import type { Metadata } from "next";
import { ButtonLink, Eyebrow, Shell } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Northstar" },
  description:
    "This page could not be found. Return to Northstar to explore business transformation services and insights.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="min-h-[65vh] py-20 sm:py-32">
      <Shell width="narrow">
        <Eyebrow>404</Eyebrow>
        <h1 className="font-display text-4xl sm:text-6xl">That direction doesn&apos;t exist.</h1>
        <p className="mt-5 leading-7 text-muted">Return to the Northstar home page to explore the available paths.</p>
        <ButtonLink className="mt-7" href="/">
          Back to home
        </ButtonLink>
      </Shell>
    </section>
  );
}
