import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { ModelDiagram } from "@/components/model-diagram";
import { PageHero, Section, SectionHeading, Shell, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { pillars } from "@/lib/site-data";

export const metadata: Metadata = pageMetadata(
  "Business Transformation, ERP, Data & AI Services",
  "Explore Northstar services for ERP and business modernization, CRM and customer operations, data analytics, AI and automation, technology strategy and digital products.",
  "/what-we-do",
);

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="What we do"
        title={<>Transform the business. <span className="text-brand-gold-light">Build what comes next.</span></>}
        description="From modernizing the systems that run your business to building digital products that differentiate it, Northstar brings strategy, technology and execution together."
      />
      <Section tone="muted">
        <Shell>
          <ModelDiagram compact />
        </Shell>
      </Section>
      <Section>
        <Shell>
          <SectionHeading eyebrow="The three capabilities" title="A connected transformation model." />
          <div className="mt-8 divide-y divide-border border-y border-border">
            {pillars.map((pillar) => (
              <article key={pillar.slug} className="grid gap-5 py-7 md:grid-cols-[0.7fr_1.3fr_1fr_auto] md:items-start md:gap-8">
                <div>
                  <span className="text-xs font-bold tracking-widest text-brand-gold">{pillar.number}</span>
                  <p className="mt-2 font-display text-2xl">{pillar.name}</p>
                </div>
                <div>
                  <h2 className="font-display text-2xl">{pillar.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{pillar.description}</p>
                </div>
                <ul className="space-y-2 text-sm text-muted">
                  {pillar.services.map((service) => (
                    <li key={service.slug}>
                      <Link className="inline-flex items-center gap-1 hover:text-brand-gold" href={`/what-we-do/${pillar.slug}/${service.slug}`}>
                        {service.title}<ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline" href={`/what-we-do/${pillar.slug}`}>
                  Explore <ArrowUpRight />
                </Link>
              </article>
            ))}
          </div>
        </Shell>
      </Section>
      <CtaBand />
    </>
  );
}
