import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ContactDialog } from "@/components/contact-dialog";
import { CtaBand } from "@/components/cta-band";
import { ImplementationJourney } from "@/components/implementation-journey";
import { ErpReferenceArchitecture } from "@/components/erp-reference-architecture";
import {
  ButtonLink,
  Eyebrow,
  Section,
  SectionHeading,
  Shell,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL, WHATSAPP_URL } from "@/lib/site-data";

const pageTitle = "ERP Implementation Services for Growing Businesses";
const pageDescription =
  "Plan an ERP implementation that fits your workflows. Northstar supports process design, platform selection, data migration, integrations and user adoption.";

export const metadata: Metadata = pageMetadata(
  pageTitle,
  pageDescription,
  "/erp-implementation",
);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ERP implementation",
  serviceType: "Enterprise resource planning implementation",
  description: pageDescription,
  provider: {
    "@type": "Organization",
    name: "Northstar",
    url: SITE_URL,
  },
  url: `${SITE_URL}/erp-implementation`,
};

const businessAreas = [
  ["Finance", "Accounting, purchasing, costs and financial visibility."],
  ["Inventory", "Stock movement, warehouses, fulfilment and replenishment."],
  ["Sales & service", "Quotations, orders and handoffs to customer-facing teams."],
  ["Operations", "Production, projects, resources and delivery workflows."],
  ["People & administration", "The internal processes that support your teams."],
  ["Reporting", "More connected information for operational decisions."],
] as const;

const principles = [
  [
    "Fit before features",
    "Understand the work and decide which processes should change before configuring screens.",
  ],
  [
    "Phased scope",
    "Separate essential launch needs from later improvements so priorities remain visible.",
  ],
  [
    "Data you can trust",
    "Plan cleanup, ownership, migration and validation as part of the project.",
  ],
  [
    "People ready to use it",
    "Include users in decisions, testing and training, not just at go-live.",
  ],
] as const;

const operatingAreas = [
  "Finance",
  "Sales & CRM",
  "Inventory",
  "Procurement",
  "Manufacturing",
  "Projects",
] as const;

export default function ErpImplementationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <section className="relative isolate overflow-hidden bg-brand-navy py-12 text-white sm:py-14 lg:py-16">
        <div
          aria-hidden="true"
          className="absolute -right-36 -top-32 -z-10 h-[38rem] w-[38rem] rounded-full border border-white/10 sm:right-[-5rem]"
        >
          <div className="absolute inset-12 rounded-full border border-brand-gold/20" />
          <div className="absolute inset-28 rounded-full border border-brand-gold/30" />
          <div className="absolute inset-44 rounded-full border border-brand-gold/40" />
        </div>
        <Shell className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="max-w-3xl">
            <Eyebrow inverse>ERP implementation · Business transformation</Eyebrow>
            <h1 className="font-display text-4xl leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              ERP implementation that helps your business{" "}
              <span className="text-brand-gold-light">run as one.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:mt-7 sm:text-lg sm:leading-8">
              Connect finance, sales, inventory and delivery in a system shaped
              around how your teams work. Start with the business problem, then
              build a practical path to implementation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ContactDialog
                initialInterest="ERP implementation"
                label="Plan an ERP conversation"
                className="min-h-14 px-6"
              />
              <ButtonLink
                href="#erp-scope"
                secondary
                className="min-h-14 border-white/35"
              >
                What ERP can connect <ArrowUpRight />
              </ButtonLink>
            </div>
            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-white/55">
              <span>Prefer to speak directly?</span>
              <a
                className="font-semibold text-brand-gold-light hover:underline"
                href="tel:+916268535490"
              >
                +91 62685 35490
              </a>
              <span aria-hidden="true">·</span>
              <a
                className="font-semibold text-brand-gold-light hover:underline"
                href={WHATSAPP_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
            </p>
          </div>

          <div
            aria-label="Illustration of connected business operations"
            className="relative mx-auto w-full max-w-xl rounded-sm border border-white/15 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-7"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-light">
                  A connected operation
                </p>
                <p className="mt-1 font-display text-2xl">
                  One clearer view of work
                </p>
              </div>
              <span className="rounded-full border border-brand-gold/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-gold-light">
                ERP
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {operatingAreas.map((area, index) => (
                <div
                  className="flex min-h-20 items-center gap-3 rounded-sm border border-white/10 bg-brand-navy/70 p-3 sm:p-4"
                  key={area}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold-light">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-white/85">
                    {area}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-white/15 pt-4 text-xs leading-5 text-white/55">
              The right scope depends on your processes, people and priorities.
            </p>
          </div>
        </Shell>
      </section>

      <Section tone="muted" className="py-8 sm:py-10">
        <Shell>
          <p className="max-w-4xl text-sm leading-7 text-muted sm:text-base">
            ERP is the operational backbone: it helps teams manage the
            connected processes, records and resources that keep the business
            running.
          </p>
        </Shell>
      </Section>

      <Section className="py-12 sm:py-16 lg:py-20">
        <ErpReferenceArchitecture />
      </Section>

      <Section id="erp-scope">
        <Shell>
          <SectionHeading
            eyebrow="What an ERP can connect"
            title="Make the handoffs inside your business easier to manage."
            copy="Use these common areas to guide the discussion. Your operating model determines what belongs in scope."
          />
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {businessAreas.map(([title, copy], index) => (
              <article
                className="rounded-sm border border-border p-5 sm:p-6"
                key={title}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
              </article>
            ))}
          </div>
          <Link
            className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
            href="/erp-modules"
          >
            Explore the full ERP module guide
            <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <Section tone="navy">
        <Shell>
          <SectionHeading
            inverse
            eyebrow="A managed path to implementation"
            title="Clear decisions. A sequence your teams can follow."
            copy="We work through the business context, scope, configuration, validation and adoption in deliberate stages."
          />
          <div className="mt-10 rounded-sm bg-surface p-5 text-foreground sm:p-8 lg:p-10">
            <ImplementationJourney />
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Implementation principles</Eyebrow>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.035em] sm:text-5xl">
              Make the change manageable for the business.
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Software is only one part of an ERP project. Process decisions,
              data readiness and team adoption matter just as much.
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {principles.map(([title, copy], index) => (
              <article className="flex gap-4 py-4" key={title}>
                <span className="pt-1 text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Architecture and data security</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Keep implementation work separate from live operations.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              On request, we can set up separate Dev, UAT and Staging
              environments and isolate your production environment. Synthetic
              or masked data can be used for routine testing, so you do not
              need to share live production records for development or
              acceptance testing. If migration or support requires access to
              real records, we agree the scope and access with you first.
            </p>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              For compatible workflows, we can also assess optional
              end-to-end encryption and its impact on integrations, reporting,
              search and recovery.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            <Link
              className="inline-flex min-h-12 items-center justify-between gap-3 rounded-sm border border-border px-5 py-3 text-sm font-bold transition-colors hover:border-brand-gold hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
              href="/erp-architecture-data-security#environment-isolation"
            >
              On-demand environment isolation
              <ArrowUpRight />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-between gap-3 rounded-sm border border-border px-5 py-3 text-sm font-bold transition-colors hover:border-brand-gold hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
              href="/erp-architecture-data-security#end-to-end-encryption"
            >
              End-to-end encryption options
              <ArrowUpRight />
            </Link>
          </div>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>One option in the ERP landscape</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Exploring ERPNext?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              ERPNext is one platform we can assess for your processes and
              implementation needs. Explore its use cases, implementation
              approach and the questions to resolve before rollout.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-bold transition-colors hover:border-brand-gold hover:bg-surface"
            href="/erp-implementation/erpnext"
          >
            ERPNext implementation <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>ERP and CRM solve different problems</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Need help deciding where to start?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              ERP centers on connected internal operations. CRM centers on
              customer-facing relationships and activity. Many businesses
              benefit from both.
            </p>
            <Link
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
              href="/what-is-erp"
            >
              New to ERP? Read the plain-language guide <ArrowUpRight />
            </Link>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
            href="/erp-vs-crm"
          >
            Compare ERP and CRM <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <CtaBand
        title="Start with the process that needs to work better."
        copy="Tell us what is slowing your team down. We’ll help you clarify the scope, the decisions and a sensible first step."
      />
    </>
  );
}
