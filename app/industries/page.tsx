import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Card, PageHero, Section, Shell, Eyebrow } from "@/components/ui";
import { industries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Northstar applies modern technology with an understanding of the business context in which it operates.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Technology built <span className="text-brand-gold">around your business.</span></>}
        description="Every industry has different customers, processes, regulations and operational realities. We apply modern technology with an understanding of that context."
      />
      <Section tone="muted">
        <Shell className="grid gap-4 sm:grid-cols-2">
          {industries.map(([title, copy], index) => (
            <Card key={title} className="p-6 sm:p-8">
              <span className="text-xs font-bold tracking-widest text-brand-gold">0{index + 1}</span>
              <h2 className="mt-8 font-display text-3xl sm:text-4xl">{title}</h2>
              <p className="mt-3 max-w-lg leading-7 text-muted">{copy}</p>
            </Card>
          ))}
        </Shell>
      </Section>
      <Section>
        <Shell className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>A context-led approach</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-5xl">Start with how your business works.</h2>
          </div>
          <p className="leading-7 text-muted">
            Industry experience is a starting point, not a template. We look at
            your customers, operations, regulatory environment and existing
            systems to shape a practical transformation path for your
            organization.
          </p>
        </Shell>
      </Section>
      <CtaBand />
    </>
  );
}
