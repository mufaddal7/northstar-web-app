import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero, Section, Shell, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Enterprise Developer Platform Case Study",
  "Explore an enterprise developer-platform modernization initiative involving repository migration, GitHub Enterprise, CI/CD and developer experience. Client identity and quantified results are not disclosed.",
  "/case-studies",
);

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Case studies"
        title={<>Transformation <span className="text-brand-gold-light">in practice.</span></>}
        description="See how a complex platform challenge can be framed around the business need, the work and the outcomes that matter."
      />
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
