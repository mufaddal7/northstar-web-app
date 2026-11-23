import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ContactDialog } from "@/components/contact-dialog";
import { Eyebrow, PageHero, Section, SectionHeading, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site-data";

const pagePath = "/compare/odoo-vs-netsuite";
const pageTitle = "Odoo vs NetSuite: Which ERP Fits a Growing Business?";
const pageDescription =
  "Compare Odoo Enterprise and Oracle NetSuite for a 150-employee manufacturing and distribution business across India, the US and UAE, including capability, TCO, architecture, APIs and implementation risk.";
const coverPath = `${pagePath}/opengraph-image`;

const comparisonRows = [
  {
    topic: "Financials and multi-entity",
    odoo:
      "Strong core accounting, localization apps, intercompany workflows and consolidation options. Validate group reporting, eliminations and close controls for complex entity structures.",
    netsuite:
      "Mature multi-subsidiary ERP with consolidated reporting, intercompany automation, currencies and period controls. Typically stronger out of the box for a complex global close.",
  },
  {
    topic: "Audit and compliance",
    odoo:
      "Can support GST, VAT and audit trails through localizations and configuration. SOX-grade evidence, segregation of duties and change governance usually need deliberate design and add-ons.",
    netsuite:
      "Role-based controls, audit trails, approvals and reporting support formal control environments. Compliance still depends on configuration, evidence, local tax modules and operating discipline.",
  },
  {
    topic: "Inventory and MRP",
    odoo:
      "A broad, integrated suite with inventory, warehouse, PLM, quality, maintenance and MRP. Flexible workflows are a strength, but complex planning may require tuning or extensions.",
    netsuite:
      "Strong inventory, demand planning, procurement, manufacturing and warehouse options through licensed modules. Breadth is capable, though advanced scope increases cost and implementation effort.",
  },
  {
    topic: "CRM and eCommerce",
    odoo:
      "CRM, sales, marketing, website, eCommerce and customer service share one application platform, useful for a unified customer journey and fast iteration.",
    netsuite:
      "CRM, commerce and order management are available in the suite and ecosystem. It is often strongest where finance, order orchestration and B2B commerce need tight control.",
  },
  {
    topic: "Scale ceiling",
    odoo:
      "Can scale materially with sound PostgreSQL architecture, queueing, indexing and module discipline. Custom modules and high write volume can make upgrades and performance ownership more demanding.",
    netsuite:
      "Vendor-managed SaaS scales without customer database operations. Governance shifts to licensed capacity, SuiteCloud concurrency, API design and the limits of standard processes.",
  },
] as const;

const costRows = [
  {
    topic: "Commercial model",
    odoo:
      "Enterprise subscription is commonly quoted per user and app scope, with hosting and implementation separated or bundled depending on the proposal.",
    netsuite:
      "Base platform, modules, subsidiaries, user types, support and contract terms are quoted together. Additional environments and services may be separate line items.",
  },
  {
    topic: "Five-year cost shape",
    odoo:
      "Lower entry cost is possible, especially with a focused app footprint and internal technical ownership. Hosting, custom development, upgrades, support and localization work drive the long tail.",
    netsuite:
      "Higher recurring subscription is common, but vendor-managed infrastructure reduces database operations. Modules, premium support, integrations, sandboxes and partner services can materially increase TCO.",
  },
  {
    topic: "Hidden cost checks",
    odoo:
      "Ask about Odoo.sh build and staging limits, private-cloud operations, backup/DR, custom module maintenance, localization updates, performance engineering and support response times.",
    netsuite:
      "Ask about sandbox count and refreshes, SuiteCloud Plus/API concurrency, middleware, saved-search/reporting work, premium modules, partner retainers, renewal uplift and exit/data extraction support.",
  },
] as const;

const decisionSignals = [
  {
    title: "Choose Odoo when…",
    points: [
      "Budget and speed-to-market matter, and the business can keep its first release close to standard workflows.",
      "A unified CRM, eCommerce, inventory, MRP and finance experience is strategically valuable.",
      "You have engineering or a trusted partner able to own Python modules, PostgreSQL operations, testing and upgrades.",
      "Deployment control, private-cloud options or deeper product customization outweigh turnkey SaaS governance.",
    ],
  },
  {
    title: "Choose NetSuite when…",
    points: [
      "Finance-led governance, multi-subsidiary consolidation and a vendor-managed SaaS operating model are priorities.",
      "The organization needs a mature global control framework and is prepared to fund the required modules and implementation.",
      "Internal engineering capacity is limited and the business prefers configuration and certified extensions over database ownership.",
      "A predictable enterprise roadmap matters more than owning the application stack or tailoring every workflow.",
    ],
  },
] as const;

const tcoItems = [
  "Subscription, users, apps, subsidiaries and tax/localization scope",
  "Implementation, process design, migration, testing and training",
  "Sandbox, staging, backup, disaster recovery and release operations",
  "API concurrency, middleware, monitoring and integration support",
  "Internal product ownership, partner support and custom code maintenance",
  "Renewal uplifts, module expansion, exit planning and data retention",
] as const;

const faqs = [
  {
    question: "Which is cheaper, Odoo or NetSuite?",
    answer:
      "Odoo can have a lower entry price, but the answer depends on users, applications, hosting, implementation, custom code and support. NetSuite usually carries a higher recurring license cost, while its managed SaaS model can reduce some infrastructure work. Compare a five-year scope, not a first-year subscription quote.",
  },
  {
    question: "Is Odoo suitable for a 150-employee manufacturer?",
    answer:
      "It can be, especially when manufacturing, inventory, CRM and eCommerce fit its standard product. Validate production planning, quality, warehouse complexity, audit controls, localization and transaction volumes with representative scenarios before committing.",
  },
  {
    question: "Is NetSuite more compliant than Odoo?",
    answer:
      "NetSuite often provides a more mature starting point for formal financial controls and multi-subsidiary governance, but neither platform makes a company compliant by itself. Compliance depends on jurisdiction, configuration, roles, evidence, policies and how people operate the system.",
  },
  {
    question: "Can Odoo and NetSuite integrate with Shopify and a custom portal?",
    answer:
      "Yes. Both can integrate through native APIs, middleware and custom services. The important evaluation points are order and inventory ownership, idempotency, retries, webhook monitoring, API concurrency, reconciliation and who owns failures after go-live.",
  },
  {
    question: "What is the biggest long-term risk?",
    answer:
      "For Odoo, uncontrolled custom modules and weak upgrade discipline can create a self-owned product that is expensive to maintain. For NetSuite, rising subscription and module costs, platform-specific customizations and dependence on vendor release and capacity policies can constrain flexibility.",
  },
] as const;

const baseMetadata = pageMetadata(pageTitle, pageDescription, pagePath);
const coverUrl = `${SITE_URL}${coverPath}`;

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    type: "article",
    siteName: "Northstar",
    title: `${pageTitle} | Northstar`,
    description: pageDescription,
    url: `${SITE_URL}${pagePath}`,
    images: [{ url: coverUrl, width: 1200, height: 630, alt: "Odoo and NetSuite ERP comparison by Northstar" }],
  },
  twitter: { card: "summary_large_image", title: `${pageTitle} | Northstar`, description: pageDescription, images: [coverUrl] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", headline: pageTitle, description: pageDescription, articleSection: "ERP comparisons", author: { "@id": `${SITE_URL}/#organization` }, publisher: { "@id": `${SITE_URL}/#organization` }, image: coverUrl, mainEntityOfPage: `${SITE_URL}${pagePath}` },
    { "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

export default function OdooVsNetSuitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero dark eyebrow="ERP platform comparison" title={<>Odoo vs NetSuite: <span className="text-brand-gold-light">which one fits?</span></>} description="A practical comparison for a 150-employee manufacturing and distribution business with entities in India, the US and UAE. Compare capability, five-year cost, architecture and ownership risk before choosing.">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/35 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10" href="#quick-verdict">Compare the options</a>
          <ContactDialog initialInterest="ERP implementation" label="Discuss your ERP shortlist" />
          <Link className="inline-flex min-h-12 items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline" href="/compare">All comparisons <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </PageHero>

      <Section className="scroll-mt-24" tone="muted" id="quick-verdict">
        <Shell>
          <SectionHeading eyebrow="The short answer" title="The right choice depends on what you want to own." copy="Odoo is often compelling when a growing business wants broad functional coverage, customization and a lower-cost path with capable technical ownership. NetSuite is often compelling when finance governance, multi-entity control and vendor-managed SaaS matter more than database control or a lower subscription. Both can work for this scenario, but they create different operating responsibilities." />
          <div className="mt-8 grid gap-4 md:grid-cols-2">{decisionSignals.map((signal, index) => <article className="min-w-0 rounded-sm border border-border bg-surface p-5 sm:p-7" key={signal.title}><span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">0{index + 1} · Decision signal</span><h3 className="mt-3 font-display text-2xl">{signal.title}</h3><ul className="mt-4 space-y-3">{signal.points.map((point) => <li className="flex gap-3 text-sm leading-6 text-muted" key={point}><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold" /><span>{point}</span></li>)}</ul></article>)}</div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHeading eyebrow="01 · Core functional and scalability matrix" title="Compare the operating capabilities first" copy="This matrix assumes 150 employees, three entities and manufacturing/distribution workflows. Confirm every row with current product editions, localizations and a scripted demo using your transaction volumes." />
          <div className="mt-8 hidden overflow-hidden rounded-sm border border-border md:block"><table className="w-full table-fixed border-collapse text-left text-sm"><caption className="sr-only">Odoo and NetSuite functional and scalability comparison</caption><thead className="bg-brand-navy text-white"><tr><th className="w-1/5 px-4 py-4 font-bold" scope="col">Area</th><th className="w-[40%] px-4 py-4 font-bold" scope="col">Odoo Enterprise</th><th className="w-[40%] px-4 py-4 font-bold" scope="col">Oracle NetSuite</th></tr></thead><tbody className="divide-y divide-border">{comparisonRows.map(({ topic, odoo, netsuite }) => <tr className="bg-surface" key={topic}><th className="bg-surface-muted px-4 py-4 align-top font-semibold" scope="row">{topic}</th><td className="break-words px-4 py-4 align-top leading-6 text-muted">{odoo}</td><td className="break-words px-4 py-4 align-top leading-6 text-muted">{netsuite}</td></tr>)}</tbody></table></div>
          <div className="mt-8 grid gap-4 md:hidden">{comparisonRows.map(({ topic, odoo, netsuite }) => <article className="min-w-0 rounded-sm border border-border bg-surface p-5" key={topic}><h3 className="font-display text-xl">{topic}</h3><div className="mt-4 space-y-4"><div><p className="text-xs font-bold uppercase tracking-wider text-brand-gold">Odoo Enterprise</p><p className="mt-1 text-sm leading-6 text-muted">{odoo}</p></div><div className="border-t border-border pt-4"><p className="text-xs font-bold uppercase tracking-wider text-brand-gold">Oracle NetSuite</p><p className="mt-1 text-sm leading-6 text-muted">{netsuite}</p></div></div></article>)}</div>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
          <article className="min-w-0 max-w-3xl space-y-10">
            <section><Eyebrow>02 · Pricing and five-year TCO</Eyebrow><h2 className="font-display text-3xl leading-tight sm:text-4xl">Price the system you will operate, not the license you can see</h2><div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base"><p>Odoo’s per-user, all-apps positioning can make the initial comparison look simple. Confirm which users need paid access, whether portal or external users are included, which localizations are required, and whether Odoo.sh, private cloud or self-hosting is part of the proposal. The cost advantage is strongest when the implementation stays close to standard workflows and the team can own the technical platform.</p><p>NetSuite uses a base platform plus modules, subsidiaries, user types and negotiated terms. The commercial proposal should identify sandbox and development environments, SuiteCloud/API capacity, premium support, tax and planning modules, partner services and renewal protections. Avoid assuming that a feature seen in a demonstration is included in the quoted edition.</p></div></section>
            <section><div className="mt-0 hidden overflow-hidden rounded-sm border border-border md:block"><table className="w-full table-fixed border-collapse text-left text-sm"><caption className="sr-only">Odoo and NetSuite pricing and total cost comparison</caption><thead className="bg-brand-navy text-white"><tr><th className="w-1/5 px-4 py-4 font-bold" scope="col">Cost area</th><th className="w-[40%] px-4 py-4 font-bold" scope="col">Odoo Enterprise</th><th className="w-[40%] px-4 py-4 font-bold" scope="col">Oracle NetSuite</th></tr></thead><tbody className="divide-y divide-border">{costRows.map(({ topic, odoo, netsuite }) => <tr className="bg-surface" key={topic}><th className="bg-surface-muted px-4 py-4 align-top font-semibold" scope="row">{topic}</th><td className="break-words px-4 py-4 align-top leading-6 text-muted">{odoo}</td><td className="break-words px-4 py-4 align-top leading-6 text-muted">{netsuite}</td></tr>)}</tbody></table></div></section>
            <section><h3 className="font-display text-2xl">Include these five-year line items</h3><ul className="mt-5 grid gap-3 sm:grid-cols-2">{tcoItems.map((item) => <li className="rounded-sm border border-border bg-surface p-4 text-sm font-semibold" key={item}>{item}</li>)}</ul><p className="mt-5 text-sm leading-7 text-muted">Ask for a five-year TCO model with low, expected and high scenarios. Neither vendor’s public list pricing is a substitute for a quote tied to the same user counts, entities, modules, environments and service levels.</p></section>
            <section><Eyebrow>03 · Deployment, isolation and security</Eyebrow><h2 className="font-display text-3xl leading-tight sm:text-4xl">Flexibility versus vendor-managed consistency</h2><div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base"><p>Odoo can be deployed through Odoo.sh, a private cloud or self-hosted infrastructure. That gives the customer more control over single-tenant isolation, network boundaries, Dev/Staging/Prod pipelines, backups, observability and key management. It also makes the customer responsible for hardening, patching, PostgreSQL operations, disaster recovery and proving end-to-end or BYOK database encryption where required. Odoo.sh reduces this burden but does not make every security control automatically equivalent to a dedicated private environment.</p><p>NetSuite is a vendor-managed, pure multi-tenant SaaS platform. Oracle manages the application infrastructure, upgrades and much of the security baseline. Evaluate available data residency and account-region options, identity integration, logging, retention, support access and the evidence available for your audit. You gain less infrastructure responsibility, but less control over isolation design, database encryption choices and release timing.</p></div></section>
            <section><Eyebrow>04 · Extensibility, APIs and DevOps</Eyebrow><h2 className="font-display text-3xl leading-tight sm:text-4xl">The integration model changes the ownership model</h2><div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base"><p>Odoo’s Python/PostgreSQL stack, ORM, XML-RPC and JSON-RPC APIs, newer REST options depending on version and modules, Studio and custom modules provide considerable control. GraphQL is generally an integration-layer choice rather than a universal native contract. Build an API facade for Shopify, a custom B2B portal and WMS integrations, with queues, idempotency keys, retry handling, reconciliation and webhook monitoring. High-volume workloads need careful indexing, asynchronous jobs and connection management.</p><p>NetSuite provides SuiteScript, SuiteFlow, REST and SOAP web services, SuiteTalk and webhooks or event-driven patterns depending on the object and integration approach. There is no general-purpose GraphQL API to assume. API governance includes concurrency limits, usage units, scheduled processing and account-level capacity. Validate peak order imports, inventory sync, shipment updates and financial posting with production-like loads rather than a happy-path demo.</p><p>Odoo supports Git-based source control and familiar CI/CD when self-managed or using an Odoo.sh workflow. NetSuite customizations use SuiteCloud development tools, SuiteScript and account-specific release processes, but the underlying Oracle database is not customer-managed. In both systems, automated tests, migration scripts, contract tests and a versioned release checklist matter. Odoo custom modules can increase major-version upgrade work; NetSuite custom scripts and workflows can also break when APIs, records or business assumptions change. The difference is who owns the runtime and how much of the release window the vendor controls.</p></div></section>
            <section><Eyebrow>05 · Executive decision framework</Eyebrow><h2 className="font-display text-3xl leading-tight sm:text-4xl">Make the recommendation match the organization</h2><div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base"><p>For this 150-employee, three-country scenario, do not choose on feature count. Score each platform against close and consolidation, GST/VAT and audit evidence, MRP and warehouse exceptions, integration reliability, internal engineering maturity, five-year TCO and the business’s tolerance for vendor dependence.</p><p>Run a proof of value using a multi-entity month-end close, a make-to-stock and make-to-order production flow, a Shopify or portal order, a WMS inventory adjustment and a GST/VAT report. Record what is standard, configured, custom, integrated and manually reconciled. The platform with the fewer high-risk exceptions is usually the better economic choice.</p></div></section>
          </article>
          <aside className="h-fit rounded-sm border border-border bg-surface p-5 sm:p-6 lg:sticky lg:top-28"><Eyebrow>Northstar’s view</Eyebrow><p className="font-display text-xl leading-snug">Buy less complexity than your team can govern.</p><p className="mt-3 text-sm leading-6 text-muted">Odoo rewards product ownership and disciplined engineering. NetSuite rewards finance governance and a managed SaaS operating model. The best choice is the one your organization can run, test, secure and upgrade for five years.</p><Link className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline" href="/what-we-do/modernize/erp-business-systems">Explore ERP and business systems <ArrowUpRight className="h-4 w-4" /></Link></aside>
        </Shell>
      </Section>

      <Section><Shell width="medium"><Eyebrow>Questions leaders ask</Eyebrow><h2 className="font-display text-3xl leading-tight sm:text-4xl">Odoo vs NetSuite FAQs</h2><div className="mt-7 divide-y divide-border border-y border-border">{faqs.map(({ question, answer }) => <details className="group py-5" key={question}><summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold marker:hidden"><span>{question}</span><span aria-hidden="true" className="shrink-0 text-brand-gold transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 pr-7 text-sm leading-7 text-muted">{answer}</p></details>)}</div><p className="mt-7 text-xs leading-5 text-muted">Capabilities, pricing and availability change by edition, country, contract and release. Confirm current licensing, API limits, security evidence and localization coverage with Odoo, Oracle and your implementation partners.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><a className="inline-flex items-center gap-2 text-brand-gold hover:underline" href="https://www.odoo.com/editions" rel="noopener noreferrer" target="_blank">Odoo editions <ArrowUpRight className="h-4 w-4" /></a><a className="inline-flex items-center gap-2 text-brand-gold hover:underline" href="https://www.netsuite.com/portal/products/erp.shtml" rel="noopener noreferrer" target="_blank">NetSuite ERP overview <ArrowUpRight className="h-4 w-4" /></a></div></Shell></Section>

      <Section tone="navy"><Shell className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"><div><Eyebrow inverse>Make the next step specific</Eyebrow><h2 className="max-w-3xl font-display text-3xl leading-tight sm:text-4xl">A good ERP decision starts with the work your business needs to do.</h2><p className="mt-4 max-w-2xl leading-7 text-white/70">Northstar can help you define scenarios, compare trade-offs and shape a practical path for your business systems.</p></div><ContactDialog initialInterest="ERP implementation" label="Talk through your ERP options" /></Shell></Section>
    </>
  );
}
