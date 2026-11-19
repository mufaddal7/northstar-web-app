import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ManufacturingClosedLoopDiagram } from "@/components/case-study-diagrams";
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
  "Manufacturing Systems Case Study",
  "Explore an illustrative manufacturing systems revamp connecting demand, planning, procurement, shop-floor execution, quality, inventory, delivery and finance.",
  "/case-studies/manufacturing-closed-loop",
);

const systemAreas = [
  {
    title: "ERP and order management",
    description:
      "Maintain customer orders, purchasing, inventory valuation, costs and financial records.",
  },
  {
    title: "Planning and procurement",
    description:
      "Translate demand into material and capacity plans, purchase requirements and production priorities.",
  },
  {
    title: "Production and quality",
    description:
      "Record work orders, material consumption, output, downtime and inspection or quality decisions.",
  },
  {
    title: "Warehouse and delivery",
    description:
      "Track received materials and finished goods through storage, picking, shipment and order completion.",
  },
];

const rolloutSteps = [
  "Map the real production, inventory and order processes before selecting or configuring systems.",
  "Agree shared product, material, batch, work-order and location data with clear owners.",
  "Define which system owns each record and how status and exception events move between systems.",
  "Test realistic order-to-delivery scenarios, including shortages, quality holds, rework and late suppliers.",
  "Launch in manageable stages, reconcile records and train teams before expanding the scope.",
];

const measures = [
  "Schedule adherence and production lead time",
  "Material availability and inventory accuracy",
  "Quality holds, rework and first-pass yield",
  "Order status visibility and on-time delivery",
  "Time spent reconciling production, stock and financial records",
];

export default function ManufacturingCaseStudyPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Illustrative case study · Manufacturing systems"
        title={
          <>
            Connect the factory from{" "}
            <span className="text-brand-gold-light">demand to delivery.</span>
          </>
        }
        description="An illustrative systems revamp that connects planning, purchasing, production, quality, inventory, shipping and finance in a closed operating loop."
      >
        <ButtonLink
          href="/case-studies"
          secondary
          className="border-white/30 text-white hover:bg-white/10"
        >
          All case studies
        </ButtonLink>
      </PageHero>

      <Section>
        <Shell width="medium">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start lg:gap-16">
            <div>
              <Eyebrow>The scenario</Eyebrow>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Replace disconnected handoffs with a shared operating picture
              </h2>
              <p className="mt-5 leading-7 text-muted">
                In this example, customer orders, material availability,
                production progress and inspection results sit in separate
                systems or spreadsheets. Teams cannot easily tell whether an
                order is ready to build, held for quality or ready to ship.
              </p>
              <p className="mt-4 leading-7 text-muted">
                The revamp introduces a connected set of systems around the
                manufacturer&apos;s processes. It does not assume every company
                needs the same products: the capabilities and integrations are
                chosen to fit the operation.
              </p>
            </div>
            <aside className="border border-border bg-surface-muted p-6 sm:p-8">
              <Eyebrow>Design principle</Eyebrow>
              <p className="font-display text-2xl leading-snug">
                Record an event once, then make it useful to every team that
                depends on it.
              </p>
              <p className="mt-4 text-sm leading-6 text-muted">
                Shared identifiers, clear system ownership and timely
                integration keep order, material, work-order and quality
                status connected.
              </p>
            </aside>
          </div>

          <ManufacturingClosedLoopDiagram />
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell width="medium">
          <SectionHeading
            eyebrow="A connected system landscape"
            title="Each capability has a clear role in the loop."
            copy="A practical design connects the records and events teams need without forcing every workflow into one application."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {systemAreas.map((area, index) => (
              <article
                className="border border-border bg-surface p-6 sm:p-8"
                key={area.title}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl">{area.title}</h3>
                <p className="mt-3 leading-7 text-muted">{area.description}</p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell width="medium">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Delivery approach"
              title="Build around the work, then prove the full cycle."
              copy="New systems create value only when the process, data, integration and adoption work together."
            />
            <ol className="divide-y divide-border border-y border-border">
              {rolloutSteps.map((step, index) => (
                <li className="flex gap-5 py-4" key={step}>
                  <span className="pt-1 text-xs font-bold tracking-widest text-brand-gold">
                    0{index + 1}
                  </span>
                  <span className="leading-7">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell width="medium">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Evaluation"
              title="Set a baseline before setting targets."
              copy="Use measures that show whether the connected process is more visible, reliable and easier to manage."
            />
            <ul className="divide-y divide-border border-y border-border">
              {measures.map((measure) => (
                <li className="flex gap-4 py-4" key={measure}>
                  <span
                    aria-hidden="true"
                    className="mt-1 text-brand-gold"
                  >
                    +
                  </span>
                  <span className="leading-7">{measure}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 border-l-2 border-brand-gold pl-4 text-sm leading-6 text-muted">
            This page describes an illustrative engagement pattern. It is not a
            report of a completed client project and does not claim measured
            performance gains.
          </p>
          <Link
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
            href="/case-studies/agentic-ai-workflows"
          >
            Explore the agentic AI case study
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Shell>
      </Section>

      <CtaBand title="Planning a manufacturing systems revamp?" />
    </>
  );
}
