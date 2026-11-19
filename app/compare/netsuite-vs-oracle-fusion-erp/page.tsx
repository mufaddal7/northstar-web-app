import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ContactDialog } from "@/components/contact-dialog";
import { Eyebrow, PageHero, Section, SectionHeading, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site-data";

const pagePath = "/compare/netsuite-vs-oracle-fusion-erp";
const pageTitle =
  "NetSuite vs Oracle Fusion Cloud ERP: Which One Fits Your Business?";
const pageDescription =
  "Compare NetSuite and Oracle Fusion Cloud ERP by product scope, modules, pricing, implementation and business fit. Use a practical framework to choose the right ERP.";
const coverPath = `${pagePath}/opengraph-image`;

const comparisonRows = [
  {
    topic: "Product approach",
    netsuite:
      "A connected cloud business suite with ERP and financials plus capabilities such as inventory, order management, CRM and commerce, depending on scope.",
    fusion:
      "An enterprise application suite with ERP capabilities across finance, procurement, project management, risk and performance management.",
  },
  {
    topic: "Typical evaluation",
    netsuite:
      "Teams looking to connect core business operations in a single product and reduce the number of systems they manage.",
    fusion:
      "Organizations with complex financial controls, global operating requirements, or a wider Oracle application strategy.",
  },
  {
    topic: "Modules and scope",
    netsuite:
      "The required edition, modules, add-ons and subsidiaries determine how much of the operating model is covered.",
    fusion:
      "ERP modules and adjacent Oracle Cloud applications such as SCM and HCM are assessed and licensed according to the program scope.",
  },
  {
    topic: "Pricing",
    netsuite:
      "A quote depends on users, edition, modules, subsidiaries, contract terms and services.",
    fusion:
      "A quote depends on selected services, user populations, contract terms, deployment scope and services.",
  },
  {
    topic: "Implementation",
    netsuite:
      "Effort depends on process fit, data readiness, integrations, configuration and how much the business changes at go-live.",
    fusion:
      "Effort depends on module breadth, country and entity coverage, controls, integrations, data and the scale of organizational change.",
  },
  {
    topic: "Ecosystem and extensions",
    netsuite:
      "Assess the available integrations, partner extensions and SuiteCloud options against the workflows you need to support.",
    fusion:
      "Assess Oracle’s application ecosystem, integration requirements and extension approach against the target architecture.",
  },
] as const;

const decisionSignals = [
  {
    title: "Lean toward NetSuite when…",
    points: [
      "You want one cloud suite to connect core finance and operating workflows.",
      "Your requirements align with its standard capabilities and available modules.",
      "A focused, phased ERP rollout is more valuable than adopting a broader enterprise application program.",
      "You want to consolidate systems without introducing complexity your teams do not need.",
    ],
  },
  {
    title: "Lean toward Oracle Fusion Cloud ERP when…",
    points: [
      "You need enterprise-grade finance, procurement, project, risk or performance-management capabilities.",
      "Global entities, regulatory controls or operating complexity make standardization a major priority.",
      "Your roadmap already includes Oracle Cloud applications and the integration model supports that direction.",
      "You can resource a larger transformation with clear ownership, governance and change management.",
    ],
  },
] as const;

const evaluationQuestions = [
  "Which business outcomes must improve, and how will we measure them?",
  "Which workflows fit the standard product, and which depend on custom work?",
  "What data, integrations and reporting must be ready at launch?",
  "Which countries, entities, currencies and control requirements are in scope?",
  "What will the full three-to-five-year cost include beyond subscription fees?",
] as const;

const faqs = [
  {
    question: "Are NetSuite and Oracle Fusion Cloud ERP the same product?",
    answer:
      "No. NetSuite and Oracle Fusion Cloud ERP are distinct Oracle products with different product boundaries, commercial models and typical implementation contexts. Compare the capabilities in the proposed scope rather than assuming that a shared parent company makes them interchangeable.",
  },
  {
    question: "Which ERP is cheaper, NetSuite or Oracle Fusion?",
    answer:
      "There is no reliable answer without a defined scope and current quotes. Compare subscription and module costs alongside implementation, integration, data migration, training, support and ongoing administration over the same time horizon.",
  },
  {
    question: "Is NetSuite only suitable for mid-sized businesses?",
    answer:
      "Company size can be a useful starting signal, but it is not a decision rule. Fit depends on process complexity, legal entities, countries, controls, transaction needs, integrations and the capabilities included in the proposed NetSuite configuration.",
  },
  {
    question: "Can a business move from NetSuite to Oracle Fusion Cloud ERP?",
    answer:
      "A move can be planned, but it is a business and data transformation, not just a software switch. Define which history to migrate, how master data and controls map, which integrations change, and how teams will work during cutover.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "The timeline depends on scope, data quality, integrations, countries, decision-making and user readiness. Ask each implementation team to show the assumptions, dependencies, testing approach and business capacity behind its estimate.",
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
    images: [
      {
        url: coverUrl,
        width: 1200,
        height: 630,
        alt: "NetSuite and Oracle Fusion Cloud ERP comparison by Northstar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | Northstar`,
    description: pageDescription,
    images: [coverUrl],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: pageTitle,
      description: pageDescription,
      articleSection: "ERP comparisons",
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: coverUrl,
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

export default function NetSuiteVsOracleFusionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero
        dark
        eyebrow="ERP platform comparison"
        title={
          <>
            NetSuite vs Oracle Fusion Cloud ERP:{" "}
            <span className="text-brand-gold-light">which one fits?</span>
          </>
        }
        description="Both are Oracle cloud products, but they solve different operating needs. Compare product scope, modules, commercial considerations and implementation realities before choosing."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/35 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            href="#quick-verdict"
          >
            Compare the options
          </a>
          <ContactDialog
            initialInterest="ERP implementation"
            label="Discuss your ERP shortlist"
          />
          <Link
            className="inline-flex min-h-12 items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline"
            href="/compare"
          >
            All comparisons <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <Section className="scroll-mt-24" tone="muted" id="quick-verdict">
        <Shell>
          <SectionHeading
            eyebrow="The short answer"
            title="Start with the operating model, not the product name."
            copy="NetSuite is often worth evaluating when a business wants connected core operations in a cloud suite. Oracle Fusion Cloud ERP is often worth evaluating when enterprise finance, procurement, project or risk capabilities and a broader Oracle application strategy are central. These are starting signals, not hard rules based on revenue or headcount."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {decisionSignals.map((signal, index) => (
              <article
                className="min-w-0 rounded-sm border border-border bg-surface p-5 sm:p-7"
                key={signal.title}
              >
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                  0{index + 1} · Decision signal
                </span>
                <h3 className="mt-3 font-display text-2xl">{signal.title}</h3>
                <ul className="mt-4 space-y-3">
                  {signal.points.map((point) => (
                    <li
                      className="flex gap-3 text-sm leading-6 text-muted"
                      key={point}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHeading
            eyebrow="Side-by-side"
            title="NetSuite and Oracle Fusion Cloud ERP compared"
            copy="Use this as a first-pass comparison. Product editions, licensed modules and implementation proposals vary, so validate the capabilities and assumptions in the scope you are actually considering."
          />
          <div className="mt-8 hidden overflow-hidden rounded-sm border border-border md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of NetSuite and Oracle Fusion Cloud ERP product
                approach, fit, modules, pricing, implementation and ecosystem
              </caption>
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th className="w-1/5 px-4 py-4 font-bold" scope="col">
                    Area
                  </th>
                  <th className="w-[40%] px-4 py-4 font-bold" scope="col">
                    NetSuite
                  </th>
                  <th className="w-[40%] px-4 py-4 font-bold" scope="col">
                    Oracle Fusion Cloud ERP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonRows.map(({ topic, netsuite, fusion }) => (
                  <tr className="bg-surface" key={topic}>
                    <th
                      className="bg-surface-muted px-4 py-4 align-top font-semibold"
                      scope="row"
                    >
                      {topic}
                    </th>
                    <td className="break-words px-4 py-4 align-top leading-6 text-muted">
                      {netsuite}
                    </td>
                    <td className="break-words px-4 py-4 align-top leading-6 text-muted">
                      {fusion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-4 md:hidden">
            {comparisonRows.map(({ topic, netsuite, fusion }) => (
              <article
                className="min-w-0 rounded-sm border border-border bg-surface p-5"
                key={topic}
              >
                <h3 className="font-display text-xl">{topic}</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                      NetSuite
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {netsuite}
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                      Oracle Fusion Cloud ERP
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {fusion}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
          <article className="min-w-0 max-w-3xl space-y-10">
            <section>
              <Eyebrow>01 · Understand the product boundary</Eyebrow>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Two Oracle products, with different centers of gravity
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base">
                <p>
                  NetSuite and Oracle Fusion Cloud ERP share an Oracle parent,
                  but they are not editions of the same ERP. NetSuite is
                  positioned as a connected business suite. Depending on the
                  configuration, teams may bring finance, order and inventory
                  workflows and other business capabilities together in one
                  environment.
                </p>
                <p>
                  Fusion Cloud ERP is part of Oracle’s broader enterprise
                  applications portfolio. Its ERP scope includes areas such as
                  financial management, procurement, project management, risk
                  management and enterprise performance management. Adjacent
                  applications, including Oracle Cloud SCM and HCM, should be
                  evaluated as part of the wider architecture, not assumed to
                  be included in every ERP proposal.
                </p>
                <p>
                  The useful question is not which product has the longer
                  feature list. It is which product supports the workflows,
                  controls and reporting your business needs with a manageable
                  level of complexity.
                </p>
              </div>
            </section>

            <section>
              <Eyebrow>02 · Compare the commercial picture</Eyebrow>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Look beyond the subscription line
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base">
                <p>
                  Neither product has a single price that can be compared
                  meaningfully without knowing the proposed scope. NetSuite
                  quotes can vary with the edition, users, modules, subsidiaries
                  and commercial terms. Fusion Cloud ERP quotes depend on the
                  services and user populations selected, contract terms and
                  implementation scope.
                </p>
                <p>
                  Ask both vendors and delivery partners to price the same
                  requirements and time horizon. A practical total-cost view
                  should include implementation services, integrations, data
                  migration, testing, training, support, internal
                  administration and the cost of operating any systems that
                  remain alongside the ERP.
                </p>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Licenses, modules and user types",
                  "Implementation and change support",
                  "Integration, migration and reporting",
                  "Support, upgrades and internal ownership",
                ].map((item) => (
                  <li
                    className="rounded-sm border border-border bg-surface p-4 text-sm font-semibold"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <Eyebrow>03 · Plan for implementation</Eyebrow>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Scope, readiness and adoption drive the effort
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base">
                <p>
                  A NetSuite program can still be demanding when it spans
                  multiple entities, complex inventory, custom workflows or
                  several integrations. A Fusion program can require extensive
                  coordination when it includes multiple ERP modules, countries,
                  connected Oracle applications, control frameworks and large
                  user groups. The product name alone does not determine the
                  timeline.
                </p>
                <p>
                  Before accepting an estimate, ask what is included in the
                  first release, which data is moving, how integrations will be
                  tested, who makes design decisions and what capacity business
                  teams need to provide. A phased rollout can reduce risk when
                  the scope is large, but only if dependencies and ownership
                  are clear.
                </p>
              </div>
            </section>

            <section>
              <Eyebrow>04 · Make the decision testable</Eyebrow>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Questions to answer before a vendor decision
              </h2>
              <ol className="mt-5 space-y-3">
                {evaluationQuestions.map((question, index) => (
                  <li
                    className="flex gap-4 rounded-sm border border-border bg-surface p-4 text-sm leading-6 sm:p-5"
                    key={question}
                  >
                    <span className="shrink-0 font-bold text-brand-gold">
                      0{index + 1}
                    </span>
                    <span>{question}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <Eyebrow>05 · Keep the evaluation grounded</Eyebrow>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Run the same scenarios in both products
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base">
                <p>
                  Prepare a short set of representative workflows, such as
                  closing the books across entities, tracing an order through
                  fulfilment, approving a purchase, or reporting on project
                  costs. Ask each vendor to demonstrate the standard product
                  first, then identify configuration, extensions and
                  third-party tools needed to complete each scenario.
                </p>
                <p>
                  Record what is standard, what is optional, what requires
                  integration, and who will own it after launch. This turns a
                  broad platform debate into a decision your finance,
                  operations and technology teams can validate together.
                </p>
              </div>
            </section>
          </article>

          <aside className="h-fit rounded-sm border border-border bg-surface p-5 sm:p-6 lg:sticky lg:top-28">
            <Eyebrow>Northstar’s view</Eyebrow>
            <p className="font-display text-xl leading-snug">
              Choose the platform that fits your operating model without
              overbuying complexity.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Start with process fit, data and integration needs, control
              requirements, adoption effort and total cost. Then validate the
              shortlist against real workflows.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
              href="/what-we-do/modernize/erp-business-systems"
            >
              Explore ERP and business systems
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </Shell>
      </Section>

      <Section>
        <Shell width="medium">
          <Eyebrow>Questions leaders ask</Eyebrow>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            NetSuite vs Oracle Fusion Cloud ERP FAQs
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
          <p className="mt-7 text-xs leading-5 text-muted">
            Product names and capabilities are described at a high level.
            Confirm current licensing, availability and scope with Oracle and
            your implementation partner.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <a
              className="inline-flex items-center gap-2 text-brand-gold hover:underline"
              href="https://www.netsuite.com/portal/products/erp.shtml"
              rel="noopener noreferrer"
              target="_blank"
            >
              NetSuite ERP overview <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              className="inline-flex items-center gap-2 text-brand-gold hover:underline"
              href="https://www.oracle.com/erp/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Oracle Fusion Cloud ERP overview{" "}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Shell>
      </Section>

      <Section tone="navy">
        <Shell className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <Eyebrow inverse>Make the next step specific</Eyebrow>
            <h2 className="max-w-3xl font-display text-3xl leading-tight sm:text-4xl">
              A good ERP decision starts with the work your business needs to do.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">
              Northstar can help you clarify requirements, compare trade-offs
              and shape a practical path for your business systems.
            </p>
          </div>
          <ContactDialog
            initialInterest="ERP implementation"
            label="Talk through your ERP options"
          />
        </Shell>
      </Section>
    </>
  );
}
