import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { Eyebrow, PageHero, Section, SectionHeading, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { industries } from "@/lib/site-data";

export const metadata: Metadata = pageMetadata(
  "Business Technology Solutions by Industry",
  "Explore ERP, CRM, data and digital solutions for manufacturing, distribution, retail, healthcare, professional services and other complex operations.",
  "/industries",
);

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Solutions by industry"
        title={
          <>
            Start with the work{" "}
            <span className="text-brand-gold-light">your industry depends on.</span>
          </>
        }
        description="Browse common operational challenges and the Northstar services that may help. These are starting points for a conversation, not fixed industry templates or claims about past client work."
      >
        <Link
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline"
          href="#industry-directory"
        >
          Browse industries <ArrowUpRight />
        </Link>
      </PageHero>

      <Section id="industry-directory" tone="muted">
        <Shell>
          <Eyebrow>Find your industry</Eyebrow>
          <nav
            aria-label="Browse industry solutions"
            className="flex flex-wrap gap-2"
          >
            {industries.map(({ slug, title }) => (
              <Link
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-gold hover:text-brand-gold"
                href={`#${slug}`}
                key={slug}
              >
                {title}
              </Link>
            ))}
          </nav>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry, index) => (
              <article
                className="scroll-mt-24 rounded-sm border border-border bg-surface p-5 sm:p-6"
                id={industry.slug}
                key={industry.slug}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-2xl leading-tight">
                  {industry.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {industry.summary}
                </p>

                <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                  Workflows to consider
                </h3>
                <ul className="mt-3 space-y-2">
                  {industry.workflows.map((workflow) => (
                    <li
                      className="flex gap-2 text-sm leading-5 text-muted"
                      key={workflow}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold"
                      />
                      {workflow}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                    Relevant services
                  </p>
                  <ul className="mt-2 space-y-1">
                    {industry.services.map(([label, href]) => (
                      <li key={href}>
                        <Link
                          className="inline-flex items-center gap-1 py-1 text-sm font-semibold text-brand-gold hover:underline"
                          href={href}
                        >
                          {label} <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {"consideration" in industry && industry.consideration ? (
                  <p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-muted">
                    <strong className="text-foreground">Important context:</strong>{" "}
                    {industry.consideration}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="A context-led approach"
            title="Industry knowledge should inform the work, not dictate a template."
          />
          <div className="space-y-5 leading-7 text-muted">
            <p>
              We start with the actual workflow, the people involved, the
              systems already in place and the constraints that matter. Then we
              decide whether process improvement, ERP, CRM, data, automation or
              digital product work is the best fit.
            </p>
            <p>
              In regulated or safety-critical environments, requirements vary
              by organization and jurisdiction. We surface those needs early
              and involve qualified specialists where the work calls for them.
            </p>
          </div>
        </Shell>
      </Section>

      <CtaBand
        title="Start with the workflow that needs attention."
        copy="Tell us what is slowing your team down or making information hard to trust. We’ll help you identify a practical next step for your business."
      />
    </>
  );
}
