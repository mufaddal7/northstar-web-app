import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ContactDialog } from "@/components/contact-dialog";
import { CtaBand } from "@/components/cta-band";
import { Eyebrow, PageHero, Section, SectionHeading, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

const pageTitle = "ERP vs CRM: Differences and When to Use Each";
const pageDescription =
  "Compare ERP and CRM systems: see how ERP supports internal operations and CRM manages sales, service and customer relationships, plus when an integrated approach makes sense.";

export const metadata: Metadata = pageMetadata(
  pageTitle,
  pageDescription,
  "/erp-vs-crm",
);

const comparisonRows = [
  {
    topic: "Main purpose",
    erp: "Coordinate the internal processes and resources used to run the business.",
    crm: "Manage prospect and customer relationships and the work around them.",
  },
  {
    topic: "Primary focus",
    erp: "Operations across finance, inventory, procurement, production and delivery.",
    crm: "Front-office activity across marketing, sales, account management and service.",
  },
  {
    topic: "Typical users",
    erp: "Finance, operations, procurement, inventory and delivery teams.",
    crm: "Marketing, sales, customer success and service teams.",
  },
  {
    topic: "Information managed",
    erp: "Transactions, stock, purchasing, costs, resources and operational records.",
    crm: "Leads, contacts, accounts, opportunities, conversations and service history.",
  },
  {
    topic: "Questions it helps answer",
    erp: "What do we have, owe, need to buy, produce or deliver?",
    crm: "Who are we engaging, what do they need, and what is the next action?",
  },
  {
    topic: "Business value",
    erp: "More connected internal workflows and clearer operational control.",
    crm: "A more consistent view of customer activity and relationship ownership.",
  },
] as const;

const questions = [
  {
    question: "Can an ERP system replace a CRM?",
    answer:
      "Sometimes an ERP platform includes useful CRM capabilities, but that does not automatically make it the right customer relationship tool. Compare the customer-facing workflows, reporting and user needs before deciding.",
  },
  {
    question: "Can a business use ERP and CRM together?",
    answer:
      "Yes. A CRM can manage leads, customer conversations and sales activity while the ERP supports fulfilment, finance, inventory and delivery. Integration helps teams share the context they need.",
  },
  {
    question: "Which should we implement first?",
    answer:
      "Start with the business problem, not the category. Look at where work is breaking down, which teams are affected, and what information needs to move between them. The right sequence depends on those constraints.",
  },
] as const;

export default function ErpVsCrmPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Business systems explained"
        title={
          <>
            ERP vs CRM: what&apos;s the{" "}
            <span className="text-brand-gold-light">difference?</span>
          </>
        }
        description="ERP connects the processes inside your business. CRM focuses on customer-facing relationships and activity. Here’s where each fits, and how they work better together."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ContactDialog
            initialInterest="ERP implementation"
            label="Discuss an ERP project"
          />
          <ContactDialog
            initialInterest="CRM implementation"
            label="Discuss a CRM project"
            secondary
            className="border-white/35 text-white"
          />
        </div>
      </PageHero>

      <Section tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="A simple way to think about it"
            title="ERP is the operational backbone. CRM is the customer relationship workspace."
            copy="They have different primary jobs, but many customer journeys cross both systems."
          />
          <div
            aria-label="ERP supports internal operations and CRM supports customer-facing work; shared information connects the two"
            className="mt-9 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center"
            role="img"
          >
            <article className="rounded-sm border border-brand-gold/50 bg-surface p-5 sm:p-7">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                Inside the business
              </span>
              <h3 className="mt-2 font-display text-3xl">ERP</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Finance · procurement · inventory · operations
              </p>
            </article>
            <div className="flex flex-col items-center justify-center gap-2 rounded-sm bg-brand-navy px-4 py-4 text-center text-white md:max-w-44">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-light">
                Connected context
              </span>
              <span className="text-xs leading-5 text-white/75">
                Customers · orders · availability
              </span>
              <span aria-hidden="true" className="hidden text-brand-gold md:block">
                ↔
              </span>
              <span aria-hidden="true" className="text-brand-gold md:hidden">
                ↕
              </span>
            </div>
            <article className="rounded-sm border border-brand-gold/50 bg-surface p-5 sm:p-7">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                Facing the customer
              </span>
              <h3 className="mt-2 font-display text-3xl">CRM</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Marketing · sales · accounts · customer service
              </p>
            </article>
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHeading
            eyebrow="Compare ERP and CRM"
            title="Different systems. Different kinds of work."
            copy="ERP is broader than back-office accounting: it supports connected processes across the company. CRM is broader than a contact list: it supports the customer lifecycle and the teams that manage it."
          />

          <div className="mt-9 hidden overflow-hidden rounded-sm border border-border md:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of ERP and CRM purpose, focus, users, information and value
              </caption>
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th className="w-1/5 px-5 py-4 font-bold" scope="col">
                    Area
                  </th>
                  <th className="w-[40%] px-5 py-4 font-bold" scope="col">
                    ERP: internal operations
                  </th>
                  <th className="w-[40%] px-5 py-4 font-bold" scope="col">
                    CRM: customer-facing work
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonRows.map(({ topic, erp, crm }) => (
                  <tr className="bg-surface" key={topic}>
                    <th
                      className="bg-surface-muted px-5 py-4 align-top font-semibold"
                      scope="row"
                    >
                      {topic}
                    </th>
                    <td className="px-5 py-4 align-top leading-6 text-muted">
                      {erp}
                    </td>
                    <td className="px-5 py-4 align-top leading-6 text-muted">
                      {crm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-7 grid gap-3 md:hidden">
            {comparisonRows.map(({ topic, erp, crm }) => (
              <article
                className="rounded-sm border border-border bg-surface p-5"
                key={topic}
              >
                <h3 className="font-display text-xl">{topic}</h3>
                <div className="mt-4 grid gap-4">
                  <div className="border-l-2 border-brand-gold pl-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                      ERP · Internal operations
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">{erp}</p>
                  </div>
                  <div className="border-l-2 border-brand-navy pl-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                      CRM · Customer-facing work
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">{crm}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="navy">
        <Shell className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow inverse>Not either-or</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-5xl">
              A customer promise often crosses both systems.
            </h2>
          </div>
          <div>
            <p className="leading-7 text-white/75">
              CRM can capture a requirement, conversation or order. ERP can
              support the stock, finance, fulfilment and delivery work behind
              it. Connect only the information teams need, with clear
              ownership at each step.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline"
                href="/erp-implementation"
              >
                Explore ERP implementation <ArrowUpRight />
              </Link>
              <Link
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline"
                href="/what-we-do/modernize/crm-customer-operations"
              >
                Explore CRM services <ArrowUpRight />
              </Link>
            </div>
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading
            eyebrow="Common questions"
            title="Choose based on the work, not the acronym."
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
        title="Need to connect operations and customers?"
        copy="We work across ERP, CRM and the integrations between them. Tell us where your process breaks down and we’ll help frame the next step."
      />
    </>
  );
}
