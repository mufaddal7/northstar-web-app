import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { PageHero, Section, Shell, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Business Transformation Case Studies",
  "Explore case studies and illustrative engagement patterns for agentic AI, manufacturing systems, and enterprise developer-platform modernization.",
  "/case-studies",
);

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Case studies"
        title={<>Transformation <span className="text-brand-gold-light">in practice.</span></>}
        description="Explore documented platform modernization work and illustrative examples for agentic AI and connected manufacturing systems."
      />
      <Section tone="muted">
        <Shell width="medium">
          <Eyebrow>Illustrative engagements</Eyebrow>
          <h2 className="max-w-3xl font-display text-3xl leading-tight sm:text-4xl">
            Explore two connected-system challenges.
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted">
            These examples explain possible approaches and evaluation
            frameworks. They are illustrative patterns, not reports of
            completed client projects or claims of measured results.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="flex flex-col border border-border bg-surface p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                Agentic AI
              </p>
              <h3 className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
                Put agents to work inside controlled workflows.
              </h3>
              <p className="mt-4 flex-1 leading-7 text-muted">
                Follow an order exception from initial signal through
                information gathering, human approval, system action and
                verification.
              </p>
              <Link
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
                href="/case-studies/agentic-ai-workflows"
              >
                Read the agentic AI case study
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
            <article className="flex flex-col border border-border bg-surface p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                Manufacturing systems
              </p>
              <h3 className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
                Connect manufacturing from demand to delivery.
              </h3>
              <p className="mt-4 flex-1 leading-7 text-muted">
                See how new connected systems can link planning, purchasing,
                production, quality, inventory, shipping and finance.
              </p>
              <Link
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
                href="/case-studies/manufacturing-closed-loop"
              >
                Read the manufacturing case study
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </Shell>
      </Section>
      <Section>
        <Shell width="medium">
          <Eyebrow>Enterprise development</Eyebrow>
          <h2 className="max-w-4xl font-display text-3xl leading-tight sm:text-5xl">
            Modernizing enterprise development at scale
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            A large enterprise needed to modernize its developer platform and
            migrate thousands of repositories to a new enterprise development
            environment.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="rounded-sm bg-surface-muted p-6 sm:p-8">
              <h3 className="font-display text-2xl">The transformation</h3>
              <p className="mt-3 leading-7 text-muted">
                The work brings platform engineering and developer experience
                together with GitHub Enterprise, CI/CD modernization and
                automation.
              </p>
            </article>
            <article className="rounded-sm bg-surface-muted p-6 sm:p-8">
              <h3 className="font-display text-2xl">How success is measured</h3>
              <p className="mt-3 leading-7 text-muted">
                Relevant measures include repository migration coverage and
                velocity, manual effort, developer experience and operational
                efficiency.
              </p>
            </article>
          </div>
          <p className="mt-6 text-sm leading-6 text-muted">
            Client identity and quantified results are not included in the
            approved material, so no client details or performance claims are
            presented here.
          </p>
        </Shell>
      </Section>
      <CtaBand title="Have a transformation challenge of your own?" />
    </>
  );
}
