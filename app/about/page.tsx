import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero, Section, SectionHeading, Shell, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Northstar helps organizations navigate the space between business ambition and technology execution.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="About Northstar"
        title="A technology partner for businesses ready to move forward."
        description="Northstar exists to help organizations navigate the space between business ambition and technology execution."
      />
      <Section>
        <Shell className="grid gap-8 md:grid-cols-2 md:items-end lg:gap-16">
          <div>
            <Eyebrow>What we bring together</Eyebrow>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.035em] sm:text-5xl">
              Business understanding, strategy, engineering and intelligence.
            </h2>
          </div>
          <p className="max-w-xl leading-7 text-muted">
            Technology should make the business more capable. That means
            modernizing what exists, understanding what data can reveal, and
            building what is needed next.
          </p>
        </Shell>
      </Section>
      <Section tone="muted">
        <Shell className="grid gap-4 md:grid-cols-2">
          <article className="rounded-sm bg-surface p-7 sm:p-10">
            <Eyebrow>Our belief</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Technology should make the business more capable.
            </h2>
          </article>
          <article className="rounded-sm bg-surface p-7 sm:p-10">
            <Eyebrow>Our purpose</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Help businesses modernize what exists, understand what their data
              can reveal, and build what they need next.
            </h2>
          </article>
        </Shell>
      </Section>
      <CtaBand title="Let’s find your Northstar." />
    </>
  );
}
