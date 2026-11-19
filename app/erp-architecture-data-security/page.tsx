import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ErpEnvironmentArchitecture } from "@/components/erp-environment-architecture";
import { CtaBand } from "@/components/cta-band";
import {
  ButtonLink,
  Eyebrow,
  PageHero,
  Section,
  SectionHeading,
  Shell,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "ERP Architecture and Data Security",
  "Explore how ERP implementations can separate development, UAT and staging from live operations, isolate each client’s production data, and assess optional end-to-end encryption.",
  "/erp-architecture-data-security",
);

const commitments = [
  {
    title: "Separate Dev, UAT and Staging",
    description:
      "Give configuration, business validation and release rehearsal dedicated non-production environments. Promote reviewed application changes through an agreed deployment process, not by testing against live records.",
  },
  {
    title: "Isolate every client’s production data",
    description:
      "Keep each client’s live ERP records in a separate production environment and database. Access stays within that client’s boundary, with no shared production database or cross-client data access.",
  },
  {
    title: "Make end-to-end encryption an option",
    description:
      "For supported workflows, assess configurable E2EE for sensitive records, including how keys, integrations, reporting, search, backups and recovery will work.",
  },
];

const designQuestions = [
  "Which data belongs in each environment, and how will test data be created or masked?",
  "Who can access production, and how are access grants reviewed and removed?",
  "How are releases tested, approved, deployed and rolled back if needed?",
  "Which records and workflows are suitable for end-to-end encryption?",
  "How will integrations, reporting, backups and recovery work with the selected encryption model?",
];

export default function ErpArchitectureDataSecurityPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="ERP architecture · Data security"
        title={
          <>
            Protect live ERP operations{" "}
            <span className="text-brand-gold-light">by design.</span>
          </>
        }
        description="A clear environment pipeline, isolated client production data and an optional encryption design for supported workflows."
      >
        <ButtonLink href="/erp-implementation" secondary className="border-white/30 text-white hover:bg-white/10">
          Explore ERP implementation
        </ButtonLink>
      </PageHero>

      <Section id="environment-isolation" className="scroll-mt-24">
        <Shell width="medium">
          <div className="max-w-3xl">
            <Eyebrow>Architecture commitments</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Keep implementation work separate from live business data.
            </h2>
            <p className="mt-5 leading-7 text-muted">
              ERP changes need room to be built, tested and reviewed without
              treating production as a test environment. We plan separate
              Dev, UAT and Staging environments, then define how approved
              releases move into each client&apos;s isolated production
              environment.
            </p>
            <p className="mt-4 leading-7 text-muted">
              Production data stays within that client&apos;s production
              boundary. Optional end-to-end encryption can be evaluated for
              sensitive data flows when the chosen platform and business
              workflows support it.
            </p>
          </div>

          <ErpEnvironmentArchitecture />
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell width="medium">
          <SectionHeading
            eyebrow="Three ways we protect the operating model"
            title="A practical separation of environments, data and access."
            copy="These commitments shape the implementation plan. The exact topology and controls are agreed against the ERP platform, hosting model and client requirements."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {commitments.map((item, index) => (
              <article
                className="border border-border bg-surface p-6 sm:p-7"
                key={item.title}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section id="end-to-end-encryption" className="scroll-mt-24">
        <Shell className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Optional E2EE"
            title="Encryption should fit the ERP workflow."
            copy="End-to-end encryption can add protection for selected sensitive records, but it affects how systems use and recover that data."
          />
          <div className="space-y-5 leading-7 text-muted">
            <p>
              With E2EE, data is encrypted before it leaves an approved
              endpoint and can be decrypted only by an authorized endpoint
              holding the required key. The ERP service may not be able to
              inspect that content while it remains encrypted.
            </p>
            <p>
              That can affect search, reporting, automation, integrations and
              support workflows that need to process the underlying records.
              We identify those needs first, then confirm which data flows can
              use E2EE and how keys, backups and recovery will be managed.
            </p>
            <p className="border-l-2 border-brand-gold pl-4 text-sm leading-6">
              Encryption reduces exposure; it does not eliminate every risk.
              Endpoint security, identity and access controls, key handling,
              monitoring and recovery remain part of the design.
            </p>
          </div>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Plan before configuration"
            title="Security decisions belong in the implementation plan."
            copy="We work through the operating and technical questions before environments and controls are finalized."
          />
          <ul className="divide-y divide-border border-y border-border">
            {designQuestions.map((question) => (
              <li className="flex gap-4 py-4" key={question}>
                <span aria-hidden="true" className="mt-1 text-brand-gold">
                  +
                </span>
                <span className="leading-7">{question}</span>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Plan an ERP implementation</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Start with the controls your business needs.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Discuss environment separation, production data isolation and
              encryption requirements as part of your ERP scope.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-bold transition-colors hover:border-brand-gold hover:bg-surface"
            href="/erp-implementation"
          >
            ERP implementation
            <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <CtaBand title="Talk through your ERP architecture needs." />
    </>
  );
}
