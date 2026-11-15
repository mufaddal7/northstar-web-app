import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { Eyebrow, PageHero, Section, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "ERP Software Comparisons for Business Leaders",
  "Compare ERP platforms and business systems by fit, capability, implementation needs and total cost. Start with Northstar’s practical ERP comparisons.",
  "/compare",
);

const comparisons = [
  {
    category: "ERP platforms",
    href: "/compare/netsuite-vs-oracle-fusion-erp",
    title: "NetSuite vs Oracle Fusion Cloud ERP",
    summary:
      "Compare product scope, modules, pricing considerations and implementation factors to decide which Oracle ERP is a better fit for your operating model.",
    label: "Read the comparison",
  },
  {
    category: "Business systems",
    href: "/erp-vs-crm",
    title: "ERP vs CRM",
    summary:
      "Understand how ERP and CRM support different work, where their responsibilities meet, and when connecting both systems makes sense.",
    label: "Read the guide",
  },
] as const;

export default function ComparePage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Northstar comparisons"
        title={
          <>
            Choose technology by{" "}
            <span className="text-brand-gold-light">fit, not hype.</span>
          </>
        }
        description="A growing series of practical comparisons to help business and technology leaders evaluate platforms, understand trade-offs and plan the right next step."
      />
      <Section>
        <Shell>
          <Eyebrow>Explore the series</Eyebrow>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Start with the decision in front of you.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {comparisons.map((comparison) => (
              <Link
                className="group rounded-sm border border-border p-5 transition-colors hover:border-brand-gold focus-visible:outline-offset-4 sm:p-7"
                href={comparison.href}
                key={comparison.href}
              >
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                  {comparison.category}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-tight group-hover:text-brand-gold sm:text-3xl">
                  {comparison.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {comparison.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-gold">
                  {comparison.label} <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Shell>
      </Section>
      <CtaBand
        title="Need to compare more than product features?"
        copy="Map the workflows, data, integrations and change effort behind the decision before committing to a platform."
      />
    </>
  );
}
