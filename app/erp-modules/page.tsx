import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { ErpModuleExplorer } from "@/components/erp-module-explorer";
import {
  Eyebrow,
  PageHero,
  Section,
  SectionHeading,
  Shell,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

const pageTitle =
  "List of ERP Modules | Understanding and decoding ERP modules | Less known newer ERP modules";
const pageDescription =
  "A practical, grouped guide to ERP modules: what each capability does, how products package it, the data and business cycles it connects, and newer extensions to know.";

export const metadata: Metadata = pageMetadata(
  pageTitle,
  pageDescription,
  "/erp-modules",
);

const decodingLenses = [
  {
    title: "The business question",
    description:
      "Finance asks, “Are we earning and paying accurately?” Inventory asks, “What do we have, and where?” Start with the decision or work the module supports.",
  },
  {
    title: "Inputs and outputs",
    description:
      "Trace what starts the work and what it hands to another team. A sales order can trigger availability checks, purchasing or production, fulfillment and invoicing.",
  },
  {
    title: "Data ownership",
    description:
      "Master data describes reusable records such as products, suppliers and accounts. Transaction data records activity such as receipts, invoices and stock moves.",
  },
  {
    title: "The business cycle",
    description:
      "Modules make more sense in a flow such as order-to-cash, procure-to-pay or record-to-report than as disconnected menu names.",
  },
];

const orderToCashSteps = [
  {
    title: "Demand",
    description: "A customer order or approved sales commitment.",
  },
  {
    title: "Check",
    description: "Confirm price, stock, credit and delivery promise.",
  },
  {
    title: "Source or make",
    description: "Purchase materials or schedule production if needed.",
  },
  {
    title: "Fulfill",
    description: "Pick, pack, ship and record what was delivered.",
  },
  {
    title: "Record",
    description: "Invoice, receive payment and report the transaction.",
  },
];

const aiApplications = [
  {
    area: "Finance",
    example:
      "Extract invoice details, suggest purchase-order matches and flag exceptions for review.",
  },
  {
    area: "Procurement",
    example:
      "Classify spend, summarize supplier documents and surface unusual delivery or price changes.",
  },
  {
    area: "Supply chain",
    example:
      "Help planners investigate forecast changes, stock risks and possible replenishment options.",
  },
  {
    area: "Manufacturing",
    example:
      "Summarize production exceptions or use suitable equipment data to identify maintenance signals.",
  },
  {
    area: "Reporting",
    example:
      "Let users ask questions of approved reports and explain trends with links back to source measures.",
  },
];

const sources = [
  {
    label: "Oracle: What is ERP?",
    href: "https://www.oracle.com/erp/what-is-erp/",
    note: "Overview of ERP functions and how suites combine financials, procurement, projects, risk and supply chain.",
  },
  {
    label: "Microsoft Dynamics 365 Business Central",
    href: "https://www.microsoft.com/en-us/dynamics-365/products/business-central",
    note: "Product example covering business management, analytics and evolving AI-agent capabilities.",
  },
  {
    label: "Microsoft Dynamics 365 Sustainability",
    href: "https://www.microsoft.com/en-us/dynamics-365/products/sustainability",
    note: "Example of sustainability data and reporting capabilities delivered as a connected product.",
  },
  {
    label: "Microsoft Dynamics 365 Field Service",
    href: "https://www.microsoft.com/en-us/dynamics-365/products/field-service",
    note: "Example of field-service workflows offered as a dedicated application that can connect with ERP.",
  },
];

export default function ErpModulesPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="ERP field guide"
        title={
          <>
            <span className="block">List of ERP Modules</span>
            <span className="mt-4 block font-body text-xl font-medium leading-relaxed tracking-normal text-white/85 sm:text-2xl">
              <span className="text-brand-gold-light">|</span>{" "}
              Understanding and decoding ERP modules{" "}
              <span className="text-brand-gold-light">|</span>{" "}
              Less known newer ERP modules
            </span>
          </>
        }
        description="A plain-language map of the capabilities inside and around an ERP, how they work together, and what to ask before choosing a system."
      />

      <Section tone="muted">
        <Shell width="medium">
          <div className="mb-8 max-w-3xl">
            <Eyebrow>Start with the map</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              ERP is a connected system, not one universal module checklist.
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Enterprise resource planning (ERP) products group and name their
              capabilities differently. Some modules are part of the core ERP;
              others are optional packages, industry extensions or connected
              applications. Use this map to understand the work each capability
              supports, then verify the exact scope in the product and edition
              you are evaluating.
            </p>
          </div>
          <ErpModuleExplorer />
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="A simple way to decode any module"
            title="Ask four questions before you learn the menu."
            copy="The same method works whether you are reviewing finance, warehouse operations or a newer extension."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {decodingLenses.map((lens, index) => (
              <article
                className="border border-border bg-surface p-5 sm:p-6"
                key={lens.title}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-xl">{lens.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {lens.description}
                </p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHeading
            eyebrow="Follow the handoffs"
            title="Order-to-cash: one business cycle across several modules."
            copy="A customer order may touch sales, inventory, planning, warehouse and finance. The exact route depends on whether the item is in stock, made to order or sourced."
          />
          <ol
            aria-label="Order-to-cash business process"
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {orderToCashSteps.map((step, index) => (
              <li
                className="relative min-w-0 border border-border bg-surface-muted p-5"
                key={step.title}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {step.description}
                </p>
                {index < orderToCashSteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 text-brand-gold sm:hidden"
                  >
                    ↓
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">
            Similar end-to-end flows include procure-to-pay, from purchase
            request through supplier payment, and record-to-report, from
            operational entries through financial close and reporting.
          </p>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="AI across ERP"
            title="AI is a capability layer, not a guaranteed module."
            copy="Depending on the product, data quality and controls, AI can assist with repeated tasks or analysis. Outputs still need validation appropriate to the business decision."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {aiApplications.map((item) => (
              <article
                className="border border-border bg-surface p-5 sm:p-6"
                key={item.area}
              >
                <h3 className="font-display text-xl">{item.area}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.example}
                </p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell width="medium">
          <SectionHeading
            eyebrow="Further reading"
            title="Check module names against current product documentation."
            copy="Vendor materials show how capabilities are packaged in specific products; availability varies by edition, region and implementation."
          />
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {sources.map((source) => (
              <li
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                key={source.href}
              >
                <div>
                  <a
                    className="inline-flex items-center gap-2 font-semibold text-brand-gold underline-offset-4 hover:underline"
                    href={source.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {source.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {source.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Taking the next step</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Start with the processes your business needs to connect.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Map the workflows, data and constraints first. Then decide which
              ERP modules belong in scope and which can remain separate.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-bold transition-colors hover:border-brand-gold hover:bg-surface"
            href="/erp-implementation"
          >
            Explore ERP implementation
            <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <CtaBand title="Need help mapping modules to your workflows?" />
    </>
  );
}
