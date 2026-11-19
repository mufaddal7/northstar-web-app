import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { AgenticAiWorkflowDiagram } from "@/components/case-study-diagrams";
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
  "Agentic AI Workflow Case Study",
  "Explore an illustrative agentic AI workflow for resolving order exceptions with approved data, human review, scoped actions and outcome monitoring.",
  "/case-studies/agentic-ai-workflows",
);

const guardrails = [
  {
    title: "Approved context",
    description:
      "Connect only the records and policies needed for the workflow. Show the sources behind recommendations so reviewers can check them.",
  },
  {
    title: "Limited permissions",
    description:
      "Begin with read access and recommendations. Grant narrowly scoped write actions only when the process, testing and approvals support them.",
  },
  {
    title: "Human checkpoints",
    description:
      "Require an authorized person to approve decisions that affect customer commitments, money, compliance or other consequential outcomes.",
  },
  {
    title: "Verification and escalation",
    description:
      "Confirm that approved actions succeeded, record the result and send uncertain or failed cases to a person rather than silently continuing.",
  },
];

const measures = [
  "Completion and error rates by workflow step",
  "Time spent gathering information and resolving a request",
  "Recommendations approved, corrected or rejected by staff",
  "Policy compliance, escalations and failed actions",
  "Staff confidence and customer-service quality",
];

export default function AgenticAiCaseStudyPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Illustrative case study · Agentic AI"
        title={
          <>
            From AI recommendations to{" "}
            <span className="text-brand-gold-light">controlled action.</span>
          </>
        }
        description="A practical example of using an AI agent to coordinate a business workflow without giving up oversight, accountability or control."
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
                Resolve an order exception with the right context
              </h2>
              <p className="mt-5 leading-7 text-muted">
                Imagine an order that cannot be fulfilled as originally
                promised because available inventory does not match the order.
                Staff need to check the order, current stock, customer
                commitments and company policy before choosing what happens
                next.
              </p>
              <p className="mt-4 leading-7 text-muted">
                In this illustrative workflow, an agent assembles those facts,
                presents the relevant evidence and drafts possible next steps.
                It does not make an unapproved commitment to the customer.
              </p>
            </div>
            <aside className="border border-border bg-surface-muted p-6 sm:p-8">
              <Eyebrow>What changes</Eyebrow>
              <p className="font-display text-2xl leading-snug">
                People spend less time collecting context and keep authority
                over the decision.
              </p>
              <p className="mt-4 text-sm leading-6 text-muted">
                The example shows a possible design pattern, not a measured
                result from a deployed customer system.
              </p>
            </aside>
          </div>

          <AgenticAiWorkflowDiagram />
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell width="medium">
          <SectionHeading
            eyebrow="Designed for control"
            title="Make the boundaries part of the workflow."
            copy="An agent should have a defined job, a limited set of tools and a clear way to stop and ask for help."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {guardrails.map((item, index) => (
              <article
                className="border border-border bg-surface p-6 sm:p-8"
                key={item.title}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell width="medium">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Evaluation"
              title="Measure the workflow before expanding it."
              copy="Agree on a baseline, test representative cases and review the results with the people who own the process."
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
            href="/case-studies/manufacturing-closed-loop"
          >
            Explore the manufacturing systems case study
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Shell>
      </Section>

      <CtaBand title="Considering an AI workflow?" />
    </>
  );
}
