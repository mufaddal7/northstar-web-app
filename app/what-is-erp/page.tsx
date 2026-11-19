import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ContactDialog } from "@/components/contact-dialog";
import {
  Eyebrow,
  PageHero,
  Section,
  SectionHeading,
  Shell,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site-data";

const pagePath = "/what-is-erp";
const pageTitle = "What Is ERP? Meaning, Modules, Benefits & Examples";
const pageDescription =
  "Learn what ERP means, how enterprise resource planning software works, common modules and benefits, and how to decide whether ERP is right for your business.";
const imageUrl = `${SITE_URL}${pagePath}/opengraph-image`;

const modules = [
  {
    name: "Finance and accounting",
    description:
      "Manage the general ledger, accounts payable and receivable, expenses, cash, financial close and reporting.",
  },
  {
    name: "Procurement",
    description:
      "Manage suppliers, purchase requests, approvals, purchase orders and the records behind spending.",
  },
  {
    name: "Inventory and warehousing",
    description:
      "Track stock, locations, receipts, transfers, picking and replenishment across the operation.",
  },
  {
    name: "Order and supply chain",
    description:
      "Connect demand, order processing, fulfilment, delivery and the information teams need to respond.",
  },
  {
    name: "Manufacturing",
    description:
      "Plan and record production, materials, work orders, capacity and product costs where relevant.",
  },
  {
    name: "Projects and services",
    description:
      "Plan work, assign resources, record time and expenses, and understand project cost and performance.",
  },
  {
    name: "People and workforce",
    description:
      "Some ERP suites include or connect to capabilities for workforce records, payroll, scheduling and people operations.",
  },
  {
    name: "Reporting and analytics",
    description:
      "Use shared operational and financial records to monitor performance, investigate exceptions and support decisions.",
  },
] as const;

const workflowSteps = [
  ["01", "A customer places an order"],
  ["02", "Availability and pricing are checked"],
  ["03", "The order is approved and fulfilled"],
  ["04", "Finance records the invoice and payment"],
  ["05", "Leaders review sales, stock and cash"],
] as const;

const comparisonRows = [
  {
    topic: "Primary purpose",
    erp: "Coordinate core business processes and shared operational records.",
    accounting:
      "Record and report financial transactions, with scope varying by product.",
    crm: "Manage customer relationships, sales activity and service interactions.",
  },
  {
    topic: "Typical workflows",
    erp: "Procure to pay, order to cash, inventory to fulfilment, and financial close.",
    accounting:
      "Invoicing, expenses, accounts, reconciliation and financial reporting.",
    crm: "Lead to opportunity, customer communications, pipeline and case handling.",
  },
  {
    topic: "Information connected",
    erp: "Finance, orders, stock, purchasing, operations and other configured areas.",
    accounting:
      "Primarily financial records, with integrations to other business tools.",
    crm: "Leads, contacts, accounts, opportunities and service history.",
  },
] as const;

const implementationSteps = [
  {
    title: "Discover",
    copy: "Map business goals, existing processes, systems, data and constraints.",
  },
  {
    title: "Design",
    copy: "Agree on target workflows, controls, roles and what belongs in the first release.",
  },
  {
    title: "Configure and connect",
    copy: "Set up the product, integrations, reports and any approved extensions.",
  },
  {
    title: "Migrate and test",
    copy: "Prepare data, test realistic scenarios, resolve issues and rehearse cutover.",
  },
  {
    title: "Launch and improve",
    copy: "Support users, monitor operations and prioritize changes using evidence.",
  },
] as const;

const selectionChecks = [
  "Which business outcomes should improve, and how will we measure them?",
  "Which processes should be connected first, and what can remain outside the ERP?",
  "How many entities, locations, currencies and regulatory requirements are in scope?",
  "What data must be migrated, cleaned, retained or integrated?",
  "Which standard workflows fit, and where are genuine exceptions required?",
  "What will subscriptions, implementation, integration, training and ongoing support cost?",
  "Who will own the system, process decisions, data quality and future improvements?",
] as const;

const faqs = [
  {
    question: "What does ERP stand for?",
    answer:
      "ERP stands for enterprise resource planning. It refers to software and practices used to coordinate core business processes and the information those processes share.",
  },
  {
    question: "What is ERP in simple terms?",
    answer:
      "ERP is a shared system that helps a business manage work such as finance, purchasing, inventory and orders using connected processes and records.",
  },
  {
    question: "What are examples of ERP software?",
    answer:
      "Examples include SAP S/4HANA, SAP Business One, Oracle NetSuite, Oracle Fusion Cloud ERP, Microsoft Dynamics 365 and ERPNext. Their capabilities, target needs, deployment choices and commercial models differ, so compare specific products and editions against your requirements.",
  },
  {
    question: "Is ERP the same as accounting software?",
    answer:
      "No. Accounting software focuses on financial records and reporting. ERP may include accounting and connect it with workflows such as purchasing, inventory, order management, production or projects. The exact scope depends on the product and configuration.",
  },
  {
    question: "Is ERP the same as CRM?",
    answer:
      "No. ERP primarily coordinates internal operations and resources. CRM focuses on customer relationships and sales or service activity. Some products overlap, and businesses may integrate ERP and CRM so each team can use relevant shared information.",
  },
  {
    question: "Does a small business need an ERP system?",
    answer:
      "Not necessarily. A small business may be well served by accounting and focused business applications. ERP becomes worth evaluating when important workflows are disconnected, manual coordination is costly, or the business needs stronger shared control and reporting.",
  },
  {
    question: "How long does ERP implementation take?",
    answer:
      "There is no single timeline. Scope, data quality, integrations, locations, process changes, decisions and user readiness all affect delivery. Ask for an estimate that explains its assumptions, dependencies, testing and business-team commitments.",
  },
  {
    question: "How much does an ERP system cost?",
    answer:
      "Cost depends on the product, edition, users, modules, contract, implementation scope and region. Compare total cost over the same period, including implementation, data migration, integrations, training, support and internal ownership, not only subscription or licence fees.",
  },
] as const;

const baseMetadata = pageMetadata(pageTitle, pageDescription, pagePath);

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    type: "article",
    siteName: "Northstar",
    title: `${pageTitle} | Northstar`,
    description: pageDescription,
    url: `${SITE_URL}${pagePath}`,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "What ERP means and how enterprise resource planning works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | Northstar`,
    description: pageDescription,
    images: [imageUrl],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: pageTitle,
      description: pageDescription,
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: imageUrl,
      mainEntityOfPage: `${SITE_URL}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function WhatIsErpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero
        dark
        eyebrow="Business systems explained"
        title={
          <>
            What is ERP?{" "}
            <span className="text-brand-gold-light">
              A clear guide for business leaders.
            </span>
          </>
        }
        description="Understand what enterprise resource planning software does, how its modules work together, and what to consider before choosing or implementing an ERP system."
      />

      <Section className="scroll-mt-24" id="quick-answer" tone="muted">
        <Shell>
          <div className="grid gap-6 rounded-sm border border-brand-gold/40 bg-surface p-5 sm:p-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(15rem,0.7fr)] lg:items-start lg:gap-10">
            <div>
              <Eyebrow>Key takeaway</Eyebrow>
              <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                ERP connects the work that runs a business.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                <strong className="text-foreground">
                  ERP stands for enterprise resource planning.
                </strong>{" "}
                ERP software helps an organization manage connected processes
                such as finance, purchasing, inventory, orders and production
                using shared data, defined workflows and controls. The goal is
                to help teams coordinate work and make decisions with more
                consistent information. ERP does not automatically fix broken
                processes: success depends on choosing a suitable scope,
                preparing data and helping people adopt new ways of working.
              </p>
            </div>
            <div className="rounded-sm bg-brand-navy p-5 text-white sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold-light">
                In one line
              </p>
              <p className="mt-3 font-display text-xl leading-snug sm:text-2xl">
                One connected operating picture, built around how your business
                works.
              </p>
            </div>
          </div>
          <nav aria-label="On this page" className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              On this page
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                ["Definition", "#definition"],
                ["Modules", "#modules"],
                ["How it works", "#how-erp-works"],
                ["ERP vs other tools", "#erp-vs-other-tools"],
                ["Benefits and limits", "#benefits"],
                ["Choosing ERP", "#choosing-erp"],
                ["Implementation", "#implementation"],
                ["FAQs", "#faqs"],
              ].map(([label, href]) => (
                <a
                  className="inline-flex min-h-10 items-center rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold transition-colors hover:border-brand-gold hover:text-brand-gold"
                  href={href}
                  key={href}
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </Shell>
      </Section>

      <Section id="definition">
        <Shell className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeading
            eyebrow="ERP definition"
            title="What does ERP mean?"
            copy="Enterprise resource planning describes a way to coordinate business resources, processes and information."
          />
          <div className="min-w-0 space-y-4 text-sm leading-7 text-muted sm:text-base">
            <p>
              An{" "}
              <strong className="text-foreground">
                enterprise resource planning system
              </strong>{" "}
              is software that brings selected business functions into a
              connected environment. Instead of each team maintaining an
              entirely separate record of an order, supplier, product or
              financial transaction, an ERP can give authorized teams access to
              shared information and connected workflows.
            </p>
            <p>
              ERP is not one single application design. Some products focus on
              finance and core operations. Others cover a broader set of
              workflows or support specialized industries. Organizations choose
              modules, configure processes and connect other systems according
              to their needs.
            </p>
            <p>
              A useful way to understand ERP is to follow a business event. A
              customer order can affect availability, purchasing or production,
              warehouse activity, invoicing, revenue and reporting. ERP helps
              coordinate the relevant steps and records, subject to the
              product’s capabilities and the way it is implemented.
            </p>
          </div>
        </Shell>
      </Section>

      <Section id="modules" tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="Common ERP modules"
            title="What does ERP software include?"
            copy="An ERP system is usually made up of functional areas, often called modules. A company can adopt the modules it needs, but the available capabilities vary by product, edition and configuration."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module, index) => (
              <article
                className="min-w-0 rounded-sm border border-border bg-surface p-5"
                key={module.name}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-xl leading-tight">
                  {module.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {module.description}
                </p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section id="how-erp-works">
        <Shell className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <Eyebrow>ERP in practice</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              How does an ERP system work?
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base">
              <p>
                ERP software connects records and steps that would otherwise be
                managed separately. Depending on the system, this can involve a
                shared database, role-based access, configurable workflows,
                approvals, business rules and reports.
              </p>
              <p>
                When a user completes an action, the system can update relevant
                records and make information available to other authorized
                users. Integrations connect the ERP to tools that remain
                separate, such as a specialist CRM, ecommerce platform, bank,
                payroll service or logistics provider.
              </p>
            </div>
          </div>
          <figure className="min-w-0 rounded-sm border border-border bg-surface-muted p-5 sm:p-7">
            <figcaption>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                Example workflow
              </p>
              <h3 className="mt-2 font-display text-2xl">
                From customer order to business insight
              </h3>
            </figcaption>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {workflowSteps.map(([number, label]) => (
                <li
                  className="flex min-w-0 items-start gap-3 border border-border bg-surface p-4"
                  key={number}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-navy">
                    {number}
                  </span>
                  <span className="pt-1 text-sm font-semibold leading-5">
                    {label}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-5 text-muted">
              The exact steps depend on the company’s process, ERP product and
              connected systems.
            </p>
          </figure>
        </Shell>
      </Section>

      <Section id="erp-vs-other-tools" tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="ERP compared"
            title="ERP vs accounting software vs CRM"
            copy="These categories can overlap, but they are not interchangeable. Compare the work each system supports and how information needs to move between teams."
          />
          <div className="mt-8 hidden overflow-hidden rounded-sm border border-border md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <caption className="sr-only">
                Differences between ERP, accounting software and CRM
              </caption>
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th className="w-1/5 px-4 py-4 font-bold" scope="col">
                    Area
                  </th>
                  <th className="w-[28%] px-4 py-4 font-bold" scope="col">
                    ERP
                  </th>
                  <th className="w-[28%] px-4 py-4 font-bold" scope="col">
                    Accounting software
                  </th>
                  <th className="w-[24%] px-4 py-4 font-bold" scope="col">
                    CRM
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonRows.map(({ topic, erp, accounting, crm }) => (
                  <tr className="bg-surface" key={topic}>
                    <th
                      className="bg-surface-muted px-4 py-4 align-top font-semibold"
                      scope="row"
                    >
                      {topic}
                    </th>
                    <td className="break-words px-4 py-4 align-top leading-6 text-muted">
                      {erp}
                    </td>
                    <td className="break-words px-4 py-4 align-top leading-6 text-muted">
                      {accounting}
                    </td>
                    <td className="break-words px-4 py-4 align-top leading-6 text-muted">
                      {crm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-7 grid gap-3 md:hidden">
            {comparisonRows.map(({ topic, erp, accounting, crm }) => (
              <article
                className="min-w-0 rounded-sm border border-border bg-surface p-5"
                key={topic}
              >
                <h3 className="font-display text-xl">{topic}</h3>
                <div className="mt-4 grid gap-4">
                  {[
                    ["ERP", erp],
                    ["Accounting software", accounting],
                    ["CRM", crm],
                  ].map(([label, description]) => (
                    <div className="border-l-2 border-brand-gold pl-3" key={label}>
                      <p className="text-xs font-bold uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
            Some ERP products include CRM or accounting features, and some
            businesses use separate products together. See{" "}
            <Link
              className="font-semibold text-brand-gold underline underline-offset-2"
              href="/erp-vs-crm"
            >
              ERP vs CRM: how the systems differ
            </Link>{" "}
            for a closer comparison.
          </p>
        </Shell>
      </Section>

      <Section id="benefits">
        <Shell>
          <SectionHeading
            eyebrow="Benefits and trade-offs"
            title="What can ERP improve, and what can it not solve?"
            copy="ERP creates a foundation for more connected work. Results depend on process fit, data, implementation choices and whether people can use the system effectively."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="min-w-0 rounded-sm border border-border p-5 sm:p-7">
              <Eyebrow>Potential benefits</Eyebrow>
              <ul className="space-y-4">
                {[
                  "Shared records can reduce duplicate entry and conflicting versions of information.",
                  "Connected workflows can make hand-offs, approvals and responsibilities clearer.",
                  "Timely operational and financial data can support more informed decisions.",
                  "Standard processes and controls can improve consistency across teams or locations.",
                  "A suitable platform can provide a foundation for growth and future capabilities.",
                ].map((item) => (
                  <li
                    className="flex gap-3 text-sm leading-6 text-muted"
                    key={item}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="min-w-0 rounded-sm border border-border bg-surface-muted p-5 sm:p-7">
              <Eyebrow>Important realities</Eyebrow>
              <ul className="space-y-4">
                {[
                  "ERP does not automatically repair unclear or inefficient processes.",
                  "Poor data quality can move into the new system unless it is addressed.",
                  "Configuration, integrations and customization add effort and ongoing responsibility.",
                  "Implementation requires time from business teams, not only technical specialists.",
                  "A system that is too broad or complex can create cost without useful business value.",
                ].map((item) => (
                  <li
                    className="flex gap-3 text-sm leading-6 text-muted"
                    key={item}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Shell>
      </Section>

      <Section id="choosing-erp" tone="muted">
        <Shell className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <Eyebrow>Choosing ERP</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              When should a business consider ERP?
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              ERP may be worth evaluating when disconnected tools and manual
              coordination make it difficult to control routine work, serve
              customers, understand performance or support growth. The answer
              may be a new ERP, but it could also be process improvement,
              integration or a more focused system.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
              href="/compare"
            >
              Explore ERP comparisons
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="min-w-0 rounded-sm border border-border bg-surface p-5 sm:p-7">
            <h3 className="font-display text-2xl">Questions to ask first</h3>
            <ul className="mt-5 space-y-3">
              {selectionChecks.map((check) => (
                <li className="flex gap-3 text-sm leading-6" key={check}>
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold"
                  />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </Section>

      <Section id="implementation">
        <Shell>
          <SectionHeading
            eyebrow="ERP implementation"
            title="How does an ERP implementation work?"
            copy="Implementation is a business change program as well as a technology project. A clear scope and active involvement from process owners help teams manage risk and make decisions."
          />
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {implementationSteps.map((step, index) => (
              <li
                className="min-w-0 border-t-2 border-brand-gold bg-surface-muted p-5"
                key={step.title}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">
            For a practical overview of delivery, see{" "}
            <Link
              className="font-semibold text-brand-gold underline underline-offset-2"
              href="/erp-implementation"
            >
              how ERP implementation works
            </Link>
            . For platform selection, compare the proposed scope, delivery
            assumptions and ongoing ownership, not only feature lists.
          </p>
        </Shell>
      </Section>

      <Section className="scroll-mt-24" id="faqs" tone="muted">
        <Shell width="medium">
          <Eyebrow>ERP questions answered</Eyebrow>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Frequently asked questions about ERP
          </h2>
          <div className="mt-7 divide-y divide-border border-y border-border">
            {faqs.map(({ question, answer }) => (
              <details className="group py-5" key={question}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold marker:hidden">
                  <span>{question}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-brand-gold transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-7 text-sm leading-7 text-muted">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="navy">
        <Shell className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <Eyebrow inverse>ERP, grounded in your business</Eyebrow>
            <h2 className="max-w-3xl font-display text-3xl leading-tight sm:text-4xl">
              Start with the process. Then choose the platform.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">
              Northstar helps organizations assess ERP fit, compare options and
              plan a practical path around their workflows, data and teams.
            </p>
          </div>
          <ContactDialog
            initialInterest="ERP implementation"
            label="Discuss your ERP needs"
          />
        </Shell>
      </Section>
    </>
  );
}
