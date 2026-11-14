import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ContactDialog } from "@/components/contact-dialog";
import { CtaBand } from "@/components/cta-band";
import { ImplementationJourney } from "@/components/implementation-journey";
import { Eyebrow, PageHero, Section, SectionHeading, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site-data";

const pageTitle = "ERPNext Implementation for Growing Businesses";
const pageDescription =
  "Plan an ERPNext implementation around your real operations. Northstar helps connect finance, inventory, sales and delivery with practical configuration, migration and adoption support.";

export const metadata: Metadata = pageMetadata(
  pageTitle,
  pageDescription,
  "/erp-implementation/erpnext",
);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ERPNext implementation",
  serviceType: "ERP implementation and business process modernization",
  description: pageDescription,
  provider: {
    "@type": "Organization",
    name: "Northstar",
    url: SITE_URL,
  },
  url: `${SITE_URL}/erp-implementation/erpnext`,
};

const businessAreas = [
  {
    title: "Finance & accounting",
    copy: "Bring invoices, expenses, payments and financial reporting into a clearer operating flow.",
  },
  {
    title: "Stock & procurement",
    copy: "Connect purchasing, inventory movement and fulfilment with the information teams need to act.",
  },
  {
    title: "Sales & customer work",
    copy: "Follow leads, quotations, orders and customer commitments without losing context between teams.",
  },
  {
    title: "Manufacturing & operations",
    copy: "Coordinate plans, materials and production workflows around the way work is actually performed.",
  },
  {
    title: "Projects & services",
    copy: "Make delivery, time, costs and responsibilities easier to follow from one stage to the next.",
  },
  {
    title: "People & administration",
    copy: "Reduce disconnected admin work by aligning the processes and information your teams rely on.",
  },
] as const;

const implementationWork = [
  "Process discovery and fit-gap workshops",
  "ERPNext configuration and workflow design",
  "Data preparation, migration planning and validation",
  "Integrations with the systems your business needs to keep",
  "Role-based testing, training and go-live planning",
  "Post-launch support and a prioritized improvement backlog",
] as const;

const questions = [
  {
    question: "What does an ERPNext implementation include?",
    answer:
      "The scope depends on your processes and starting point. A typical project can include discovery, solution design, configuration, data migration, integrations, testing, training and a supported go-live plan.",
  },
  {
    question: "Do we have to replace every system at once?",
    answer:
      "No. We can assess which workflows belong in ERPNext, what should remain in place and where an integration or phased rollout is the more practical choice.",
  },
  {
    question: "How long does an implementation take?",
    answer:
      "There is no responsible one-size-fits-all estimate. Scope, data quality, integrations, decisions and team availability all matter. We clarify these early and build a delivery plan around them.",
  },
  {
    question: "Can ERPNext be tailored to our processes?",
    answer:
      "Yes. We first distinguish the processes that should be standardized from the ones that genuinely differentiate your business, then choose configuration, workflow changes or custom development accordingly.",
  },
] as const;

export default function ErpNextImplementationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHero
        dark
        eyebrow="ERPNext implementation"
        title={
          <>
            ERPNext, built around{" "}
            <span className="text-brand-gold-light">your business.</span>
          </>
        }
        description="Connect the processes behind finance, sales, inventory and delivery in one practical system. Start with the way your business works, not a one-size-fits-all template."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ContactDialog
            initialInterest="ERPNext implementation"
            label="Plan your ERPNext project"
          />
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/35 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            href="#implementation-process"
          >
            See how implementation works <ArrowUpRight />
          </Link>
        </div>
        <a
          className="mt-4 inline-block text-sm font-semibold text-brand-gold-light hover:underline"
          href="tel:+916268535490"
        >
          Prefer to call? +91 62685 35490
        </a>
      </PageHero>

      <Section tone="muted" className="py-8 sm:py-10">
        <Shell>
          <ul className="grid gap-5 text-sm sm:grid-cols-3 sm:gap-8">
            {[
              "Start from your real workflows",
              "Make scope and decisions visible",
              "Plan for adoption after go-live",
            ].map((item) => (
              <li className="flex items-center gap-3 font-semibold" key={item}>
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full bg-brand-gold"
                />
                {item}
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      <Section id="business-areas">
        <Shell>
          <SectionHeading
            eyebrow="One connected operation"
            title="Make the handoffs between teams work better."
            copy="ERPNext can connect day-to-day processes across your business. We help identify the right scope and sequence so the system supports the work instead of adding another layer of administration."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {businessAreas.map((area, index) => (
              <article
                className="rounded-sm border border-border bg-surface p-6 transition-colors hover:border-brand-gold sm:p-7"
                key={area.title}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-5 font-display text-2xl">{area.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{area.copy}</p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section id="implementation-process" tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="A clearer implementation path"
            title="Know what to expect at every stage."
            copy="The implementation should create confidence at every stage: from agreeing the right problem to preparing people for a reliable launch."
          />
          <div className="mt-12">
            <ImplementationJourney />
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>What we can help with</Eyebrow>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.035em] sm:text-5xl">
              The work around the software matters just as much.
            </h2>
            <p className="mt-5 leading-7 text-muted">
              A good implementation is not just configuration. It is a set of
              practical decisions about process, data, integration and people.
            </p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {implementationWork.map((item, index) => (
              <li className="flex gap-4 py-4" key={item}>
                <span className="pt-1 text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      <Section tone="navy">
        <Shell className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <Eyebrow inverse>More than ERP</Eyebrow>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.035em] sm:text-5xl">
              Connect ERPNext to the next stage of your business.
            </h2>
          </div>
          <div>
            <p className="leading-7 text-white/70">
              ERP is one part of a broader operating model. Northstar also
              supports data and analytics, AI and automation, technology
              strategy, integrations and digital product engineering.
            </p>
            <Link
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline"
              href="/what-we-do"
            >
              Explore all services <ArrowUpRight />
            </Link>
          </div>
        </Shell>
      </Section>

      <Section id="erpnext-faq">
        <Shell className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading
            eyebrow="Common questions"
            title="Good decisions start with clear answers."
          />
          <div className="divide-y divide-border border-y border-border">
            {questions.map(({ question, answer }) => (
              <details className="group py-5" key={question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold marker:hidden">
                  {question}
                  <span
                    aria-hidden="true"
                    className="text-xl text-brand-gold transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </Shell>
      </Section>

      <CtaBand
        title="Start with the process that needs to work better."
        copy="Tell us what is slowing your team down. We’ll help you work out whether ERPNext is the right fit and what a sensible first step looks like."
      />
    </>
  );
}
