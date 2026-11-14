import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { ImplementationJourney } from "@/components/implementation-journey";
import { PageHero, Section, SectionHeading, Shell, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "How we work",
  "Northstar brings business-first thinking, practical strategy and strong engineering together from discovery through optimization.",
  "/how-we-work",
);

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title={<>From strategy <span className="text-brand-gold">to execution.</span></>}
        description="Transformation happens when strategy, technology and execution move together."
      />
      <Section tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="The approach"
            title="A clear path from business challenge to working capability."
            copy="See the decisions, handoffs and checkpoints that turn a complex initiative into manageable work."
          />
          <div className="mt-12 rounded-sm bg-surface p-5 sm:p-8 lg:p-10">
            <ImplementationJourney />
          </div>
        </Shell>
      </Section>
      <Section>
        <Shell className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow>What stays true</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-5xl">
              Business-first thinking. Practical strategy. Strong engineering.
            </h2>
          </div>
          <p className="leading-7 text-muted">
            We use a structured approach without treating every challenge the
            same. The work stays grounded in the business context, delivered
            iteratively and optimized around meaningful outcomes.
          </p>
        </Shell>
      </Section>
      <CtaBand />
    </>
  );
}
