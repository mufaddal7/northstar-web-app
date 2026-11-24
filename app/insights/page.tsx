import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { ErpPeriodicTablePromo } from "@/components/erp-periodic-table-promo";
import { Card, PageHero, Section, Shell, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { insightArticles, insightTopics } from "@/lib/site-data";

export const metadata: Metadata = pageMetadata(
  "Business Technology Insights & Perspectives",
  "Practical guidance on ERP and business modernization, AI automation, data analytics, digital product engineering and technology strategy.",
  "/insights",
);

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
          <ErpPeriodicTablePromo />
        </Shell>
      </Section>
      <Section>
        <Shell>
          <Eyebrow>Ideas to put to work</Eyebrow>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insightArticles.map(({ category, slug, title, summary }, index) => (
              <Link
                className="group block rounded-sm focus-visible:outline-offset-4"
                href={`/insights/${slug}`}
                key={slug}
              >
                <Card className="h-full p-6 transition-colors group-hover:border-brand-gold sm:p-7">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">{category} · 0{index + 1}</span>
                  <h2 className="mt-5 font-display text-2xl leading-tight transition-colors group-hover:text-brand-gold">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-gold">
                    Read the article <ArrowUpRight />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Shell>
      </Section>
      <CtaBand />
    </>
  );
}
