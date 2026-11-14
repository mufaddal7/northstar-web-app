import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ContactDialog } from "@/components/contact-dialog";
import { CtaBand } from "@/components/cta-band";
import { ImplementationJourney } from "@/components/implementation-journey";
import { Eyebrow, PageHero, Section, SectionHeading, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site-data";

const pageTitle = "ERP Implementation for Growing Businesses";
const pageDescription =
  "Plan an ERP implementation around your real operations. Northstar helps connect finance, inventory, sales and delivery with practical process design, migration and adoption support.";

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
    "Include users in decisions, testing and training—not only at go-live.",
  ],
] as const;

export default function ErpImplementationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHero
        dark
        eyebrow="ERP implementation"
        title={
          <>
            Put your business processes{" "}
            <span className="text-brand-gold-light">in sync.</span>
          </>
        }
        description="Plan an ERP system around the work your business needs to do—from finance and inventory to operations and reporting. Start with process fit, then choose the platform and rollout that make sense."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ContactDialog
            initialInterest="ERP implementation"
            label="Discuss an ERP project"
          />
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/35 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            href="#erp-scope"
          >
            What ERP can connect <ArrowUpRight />
          </Link>
        </div>
      </PageHero>

      <Section tone="muted" className="py-8 sm:py-10">
        <Shell>
          <p className="max-w-4xl text-sm leading-7 text-muted sm:text-base">
            ERP is the operational backbone: it helps teams manage the
            connected processes, records and resources that keep the business
            running.
          </p>
        </Shell>
      </Section>

      <Section id="erp-scope">
        <Shell>
          <SectionHeading
            eyebrow="What an ERP can connect"
            title="Make the handoffs inside your business easier to manage."
            copy="The right scope depends on your operating model. These are common areas to assess together—not a checklist to implement all at once."
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
