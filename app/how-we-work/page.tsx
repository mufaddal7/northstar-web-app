import type { Metadata } from "next";
import { ContactDialog } from "@/components/contact-dialog";
import { CtaBand } from "@/components/cta-band";
import { WorkProcessStory } from "@/components/work-process-story";
import { PageHero, Section, SectionHeading, Shell, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Our Business Transformation Process",
  "See how Northstar takes a business challenge from discovery and prioritization through solution design, delivery, adoption and ongoing improvement.",
  "/how-we-work",
);

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title={<>From strategy <span className="text-brand-gold">to execution.</span></>}
        description="Transformation happens when strategy, technology and execution move together."
      >
        <ContactDialog
          initialInterest="ERP implementation"
          label="Talk through your project"
        />
      </PageHero>
      <Section tone="muted" className="py-12 sm:py-14 lg:py-16">
        <Shell>
          <SectionHeading
            eyebrow="The approach"
            title="A clear path from business challenge to working capability."
            copy="Follow each stage while keeping the outcome, people and operating process in view."
          />
          <div className="mt-8">
            <WorkProcessStory />
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
