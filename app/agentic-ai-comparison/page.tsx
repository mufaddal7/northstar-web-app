import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import {
  ButtonLink,
  Card,
  Eyebrow,
  PageHero,
  Section,
  SectionHeading,
  Shell,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "RAG vs Tool-Augmented vs Agentic AI",
  "Compare RAG chatbots, tool-augmented chatbots and agentic AI by reactivity, tool use, reasoning, planning, proactivity, scenarios and implementation tools.",
  "/agentic-ai-comparison",
);

type Approach = {
  name: string;
  shortName: string;
  summary: string;
  bestFor: string;
  boundary: string;
  tone: string;
  tools: string[];
};

const approaches: Approach[] = [
  {
    name: "RAG chatbot",
    shortName: "RAG",
    summary:
      "Retrieves approved content and uses it to answer a question with relevant context.",
    bestFor:
      "Knowledge access, policy questions, product documentation and grounded support.",
    boundary:
      "It answers the request, but people usually perform the follow-up work themselves.",
    tone: "border-sky-500/60 bg-sky-500/10",
    tools: [
      "Azure AI Search",
      "Pinecone",
      "Weaviate",
      "pgvector",
      "OpenAI embeddings",
    ],
  },
  {
    name: "Tool-augmented chatbot",
    shortName: "Tools",
    summary:
      "Retrieves context and calls defined tools or APIs to look up data or complete a bounded operation.",
    bestFor:
      "Status checks, calculations, guided self-service and single-step business actions.",
    boundary:
      "The workflow is still mostly request-led. It does not independently coordinate a broader plan.",
    tone: "border-emerald-500/60 bg-emerald-500/10",
    tools: [
      "OpenAI Responses API",
      "Anthropic tool use",
      "LangChain",
      "LlamaIndex",
      "Model Context Protocol (MCP)",
    ],
  },
  {
    name: "Agentic AI",
    shortName: "Agentic",
    summary:
      "Interprets a goal, plans a sequence, uses tools, checks results and escalates when judgment or approval is needed.",
    bestFor:
      "Exception resolution, multi-step operations, coordinated research and controlled workflow automation.",
    boundary:
      "It needs explicit permissions, evaluation, monitoring, stop conditions and human control for consequential actions.",
    tone: "border-brand-gold/70 bg-brand-gold/10",
    tools: [
      "LangGraph",
      "OpenAI Agents SDK",
      "Microsoft Agent Framework",
      "Semantic Kernel",
      "Temporal",
    ],
  },
];

const comparisonRows = [
  {
    label: "Reactive",
    description: "Responds after a person asks or a workflow sends a request.",
    values: ["Yes", "Yes", "Yes"],
  },
  {
    label: "Tool use",
    description: "Can call approved search, data, calculation or business APIs.",
    values: ["No", "Yes", "Yes"],
  },
  {
    label: "Reasoning",
    description: "Can interpret context and weigh possible answers or actions.",
    values: ["Limited", "Limited", "Yes"],
  },
  {
    label: "Planning",
    description: "Can break a goal into steps and decide what to do next.",
    values: ["No", "Usually no", "Yes"],
  },
  {
    label: "Proactivity",
    description: "Can respond to events or pursue a goal without a new prompt.",
    values: ["No", "Usually no", "Controlled"],
  },
  {
    label: "Human checkpoint",
    description: "A person reviews or approves decisions that carry material risk.",
    values: ["Recommended", "Recommended", "Required for consequential actions"],
  },
  {
    label: "Typical output",
    description: "The result people receive from the system.",
    values: ["Grounded answer", "Answer or bounded action", "Verified outcome or escalation"],
  },
] as const;

const scenarios = [
  {
    title: "Customer asks about a return policy",
    context:
      "The answer must reflect the current policy and the customer’s region.",
    outputs: [
      "RAG: retrieves the policy and explains the relevant section.",
      "Tool-augmented: retrieves the policy and checks the order status.",
      "Agentic: checks policy, order, eligibility and prepares the next step for approval.",
    ],
    fit: "RAG is usually enough unless the answer must change a record or coordinate several checks.",
  },
  {
    title: "An order will miss its promised delivery date",
    context:
      "Inventory, carrier updates, customer priority and approved service rules all matter.",
    outputs: [
      "RAG: explains the delay policy and suggests what a person should check.",
      "Tool-augmented: looks up inventory and carrier status when asked.",
      "Agentic: gathers evidence, compares options, drafts a customer update and requests approval.",
    ],
    fit: "Agentic AI is useful when the workflow has repeatable steps, clear permissions and meaningful exceptions.",
  },
  {
    title: "An invoice does not match its purchase order",
    context:
      "The system must compare documents, tolerance rules, receipts and approval ownership.",
    outputs: [
      "RAG: explains the three-way-match policy and likely causes.",
      "Tool-augmented: fetches the purchase order, receipt and invoice values.",
      "Agentic: investigates the mismatch, proposes a resolution path and routes the exception.",
    ],
    fit: "A tool-augmented flow may be the safer first step; add planning only when the exception path is understood.",
  },
];

const implementationSignals = [
  {
    title: "Choose RAG first",
    description:
      "The main problem is finding and explaining trusted information. Success means answer quality, source coverage and user confidence.",
  },
  {
    title: "Add tools next",
    description:
      "The assistant needs live business data or a small number of bounded actions. Success means reliable calls, useful fallbacks and clear audit records.",
  },
  {
    title: "Use agents selectively",
    description:
      "The workflow is multi-step, exception-heavy and expensive to coordinate manually. Success means safe completion, appropriate escalation and measurable cycle-time improvement.",
  },
];

const insightLinks = [
  {
    label: "AI & ERP",
    title: "AI in ERP: Use Cases, Benefits & Adoption",
    href: "/insights/ai-in-erp-implementation",
    description:
      "A practical path from assistance and recommendations to controlled workflow automation.",
  },
  {
    label: "AI & Automation",
    title: "Where AI Automation Can Create Measurable Enterprise Value",
    href: "/insights/ai-automation-enterprise-value",
    description:
      "How to identify repeatable work, define a baseline and measure quality alongside effort saved.",
  },
  {
    label: "Data & Intelligence",
    title: "From Dashboards to Decision Intelligence",
    href: "/insights/dashboards-to-decision-intelligence",
    description:
      "Why a useful intelligent experience starts with a decision, its owner and the signal that should prompt action.",
  },
];

const caseStudyLinks = [
  {
    label: "Illustrative case study",
    title: "From AI recommendations to controlled action",
    href: "/case-studies/agentic-ai-workflows",
    description:
      "Follow an order exception from signal through context gathering, human approval, system action and verification.",
  },
  {
    label: "Connected operations",
    title: "One connected flow from demand to delivery",
    href: "/case-studies/manufacturing-closed-loop",
    description:
      "See how planning, purchasing, production, quality, inventory, shipping and finance can work as one loop.",
  },
];

function StatusMark({ value }: { value: string }) {
  const positive = value === "Yes" || value === "Controlled";
  const limited = value === "Limited" || value === "Usually no";

  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold ${
        positive
          ? "text-emerald-700 dark:text-emerald-300"
          : limited
            ? "text-amber-700 dark:text-amber-300"
            : "text-muted"
      }`}
    >
      <span aria-hidden="true" className="text-base leading-none">
        {positive ? "✓" : limited ? "~" : "×"}
      </span>
      {value}
    </span>
  );
}

export default function AgenticAiComparisonPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="AI architecture guide"
        title={
          <>
            RAG, tools or{" "}
            <span className="text-brand-gold-light">agents?</span>
          </>
        }
        description="A practical comparison of three AI patterns, what each one can do, where each one stops, and how to choose the smallest approach that solves the business problem."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#comparison" secondary className="border-white/30 text-white hover:bg-white/10">
            Compare the three approaches
          </ButtonLink>
          <ButtonLink href="/case-studies/agentic-ai-workflows">
            See an agentic workflow
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="muted" id="comparison">
        <Shell>
          <SectionHeading
            eyebrow="At a glance"
            title="The difference is not the model. It is the level of responsibility."
            copy="All three patterns can use a language model. The important distinction is how much context the system retrieves, how many tools it can use, whether it can plan, and what happens when the work is incomplete or risky."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {approaches.map((approach) => (
              <Card className={`border-2 ${approach.tone}`} key={approach.name}>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                    {approach.shortName}
                  </p>
                  <span className="rounded-full border border-current/20 px-2 py-1 text-[0.65rem] font-semibold">
                    Pattern
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl">{approach.name}</h2>
                <p className="mt-3 leading-7 text-muted">{approach.summary}</p>
                <div className="mt-6 border-t border-current/15 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    Best for
                  </p>
                  <p className="mt-2 text-sm leading-6">{approach.bestFor}</p>
                </div>
                <div className="mt-4 border-t border-current/15 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    Boundary
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {approach.boundary}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHeading
            eyebrow="Comparison dashboard"
            title="What changes as the system moves from answers to action?"
            copy="The matrix is a decision aid, not a promise about every product. A well-designed implementation can add or restrict capabilities through permissions, workflow rules and operating controls."
          />
          <div className="mt-8 overflow-x-auto rounded-sm border border-border">
            <table className="w-full min-w-[60rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of RAG chatbots, tool-augmented chatbots and agentic
                AI
              </caption>
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th className="w-[28%] px-4 py-4 font-semibold" scope="col">
                    Capability
                  </th>
                  {approaches.map((approach) => (
                    <th className="min-w-48 px-4 py-4 font-semibold" key={approach.name} scope="col">
                      {approach.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonRows.map((row) => (
                  <tr className="align-top even:bg-surface-muted" key={row.label}>
                    <th className="px-4 py-4 font-semibold" scope="row">
                      {row.label}
                      <span className="mt-1 block max-w-xs text-xs font-normal leading-5 text-muted">
                        {row.description}
                      </span>
                    </th>
                    {row.values.map((value, index) => (
                      <td className="px-4 py-4" key={`${row.label}-${approaches[index].name}`}>
                        <StatusMark value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            “Agentic” does not mean unrestricted autonomy. It means the system
            can pursue a defined goal through a controlled sequence of steps.
            Permissions, approvals, audit trails and escalation remain part of
            the design.
          </p>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="Scenario lab"
            title="See the same business problem through three different designs."
            copy="The right choice depends on the work, not the novelty of the technology. Each example starts with the same operational context and shows how the responsibility shifts."
          />
          <div className="mt-8 space-y-4">
            {scenarios.map((scenario, index) => (
              <article className="border border-border bg-surface" key={scenario.title}>
                <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[0.75fr_1.25fr]">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-brand-gold">
                      0{index + 1} · SCENARIO
                    </span>
                    <h2 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">
                      {scenario.title}
                    </h2>
                    <p className="mt-3 leading-7 text-muted">{scenario.context}</p>
                    <p className="mt-5 border-l-2 border-brand-gold pl-3 text-sm leading-6">
                      {scenario.fit}
                    </p>
                  </div>
                  <ul className="divide-y divide-border border-y border-border">
                    {scenario.outputs.map((output) => (
                      <li className="py-4 text-sm leading-6" key={output}>
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Tool landscape"
              title="Choose the building blocks around the workflow."
              copy="Tools are examples of implementation options, not a prescribed stack. The right combination depends on data boundaries, deployment, observability, security and the team that will operate it."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {approaches.map((approach) => (
                <article className="border border-border bg-surface-muted p-5" key={`${approach.name}-tools`}>
                  <h2 className="font-display text-xl">{approach.shortName}</h2>
                  <ul className="mt-4 space-y-2 text-sm leading-5 text-muted">
                    {approach.tools.map((tool) => (
                      <li className="border-b border-border pb-2 last:border-0" key={tool}>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="A practical adoption path"
            title="Start with the least complex pattern that can prove value."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {implementationSignals.map((signal, index) => (
              <article className="border border-border bg-surface p-6" key={signal.title}>
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h2 className="mt-4 font-display text-2xl">{signal.title}</h2>
                <p className="mt-3 leading-7 text-muted">{signal.description}</p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Insights"
                title="Read the thinking behind the patterns."
                copy="Explore practical guidance on grounding AI, measuring automation and connecting intelligence to decisions."
              />
              <div className="mt-6 divide-y divide-border border-y border-border">
                {insightLinks.map((item) => (
                  <Link className="group block py-5" href={item.href} key={item.href}>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                      {item.label}
                    </span>
                    <h3 className="mt-2 font-display text-xl group-hover:text-brand-gold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-gold">
                      Read the insight <ArrowUpRight />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Case studies"
                title="See how the patterns behave in a workflow."
                copy="These examples make the design choices concrete, while keeping permissions, approvals and measurement visible."
              />
              <div className="mt-6 grid gap-4">
                {caseStudyLinks.map((item) => (
                  <Link className="group block" href={item.href} key={item.href}>
                    <Card className="transition-colors group-hover:border-brand-gold">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                        {item.label}
                      </span>
                      <h3 className="mt-3 font-display text-2xl group-hover:text-brand-gold">
                        {item.title}
                      </h3>
                      <p className="mt-3 leading-7 text-muted">{item.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-gold">
                        Explore the example <ArrowUpRight />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Shell>
      </Section>

      <CtaBand
        title="Not sure whether you need a chatbot or an agent?"
        copy="Bring one workflow, exception or decision to the conversation. We can help define the right level of context, tool access and autonomy."
      />
    </>
  );
}
