import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero, Section, SectionHeading, Shell, Eyebrow } from "@/components/ui";
import { processSteps } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Northstar brings business-first thinking, practical strategy and strong engineering together from discovery through optimization.",
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title={<>From strategy <span className="text-brand-gold">to execution.</span></>}
        description="Transformation happens when strategy, technology and execution move together."
      />
      <Section tone="navy">
        <Shell>
          <SectionHeading
            inverse
            eyebrow="The approach"
            title="A considered path from ambition to working capability."
          />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map(([number, title, copy]) => (
              <li key={number} className="border-t border-white/20 py-5">
                <span className="text-xs font-bold tracking-widest text-brand-gold-light">{number}</span>
                <h2 className="mt-5 font-display text-2xl">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/70">{copy}</p>
              </li>
            ))}
          </ol>
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
