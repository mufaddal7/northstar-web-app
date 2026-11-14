import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Card, PageHero, Section, Shell, Eyebrow } from "@/components/ui";
import { insightArticles, insightTopics } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Northstar perspectives on modernization, data, AI, digital engineering and technology strategy.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Northstar insights"
        title={<>Perspectives with <span className="text-brand-gold">practical value.</span></>}
        description="Practical guidance to help leaders make better decisions about modernization, data, AI and digital engineering."
      />
      <Section tone="muted">
        <Shell className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insightTopics.map(([category, description], index) => (
            <Card key={category} className="p-6">
              <span className="text-xs font-bold tracking-widest text-brand-gold">0{index + 1}</span>
              <h2 className="mt-6 font-display text-2xl">{category}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
            </Card>
          ))}
        </Shell>
      </Section>
      <Section>
        <Shell>
          <Eyebrow>Ideas to put to work</Eyebrow>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insightArticles.map(({ category, title, summary }, index) => (
              <Card key={title} className="p-6 sm:p-7">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">{category} · 0{index + 1}</span>
                <h2 className="mt-5 font-display text-2xl leading-tight">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{summary}</p>
              </Card>
            ))}
          </div>
        </Shell>
      </Section>
      <CtaBand />
    </>
  );
}
