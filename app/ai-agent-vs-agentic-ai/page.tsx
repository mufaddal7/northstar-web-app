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
  "AI Agent vs Agentic AI: What Is the Difference?",
  "Understand the difference between an AI agent and agentic AI, how they work together, common tools, practical examples and the controls needed for business use.",
  "/ai-agent-vs-agentic-ai",
);

const comparisonRows = [
  ["What it is", "A software component that performs a defined task.", "A system design or behavior that lets agents pursue goals through controlled steps."],
  ["Primary question", "What task should this agent perform?", "How should the wider system coordinate, adapt and stop?"],
  ["Planning", "May use bounded planning for its task.", "Makes planning and orchestration a central part of the workflow."],
  ["Tools", "Uses the tools it is permitted to call.", "Coordinates tools, agents, workflows and human checkpoints."],
  ["State and memory", "May hold task state or approved memory.", "Can manage state, feedback and context across a longer workflow."],
  ["Trigger", "Usually a user request, event or assigned task.", "Can combine user requests, events, schedules and workflow conditions."],
  ["Control boundary", "Defined by its prompt, tools, permissions and task scope.", "Defined by system-wide policies, routing, approvals, monitoring and escalation."],
] as const;

const examples = [
  {
    title: "Customer support agent",
    description:
      "Checks a customer record, order status and return policy, then drafts a response or routes the case.",
    pattern:
      "One agent with retrieval and bounded tools. It does not need a broad agentic system unless the case requires several coordinated steps.",
  },
  {
    title: "Invoice exception agent",
    description:
      "Compares an invoice with a purchase order and receipt, identifies the mismatch and proposes the next approval path.",
    pattern:
      "An agent can perform the investigation. An agentic workflow adds routing, retries, approvals, audit events and escalation.",
  },
  {
    title: "Operations resolution system",
    description:
      "Responds to an order exception by checking inventory, carrier updates, customer commitments and approved service rules.",
    pattern:
      "This is an agentic system when one or more agents and workflow services coordinate the plan, actions, verification and human review.",
  },
];

const tools = [
  {
    category: "Agent and orchestration runtimes",
    items: [
      "OpenAI Agents SDK",
      "LangGraph",
      "Microsoft Agent Framework",
      "Semantic Kernel",
      "CrewAI",
      "AutoGen",
    ],
  },
  {
    category: "Tool and context interfaces",
    items: [
      "Model Context Protocol (MCP)",
      "REST and GraphQL APIs",
      "Azure AI Search",
      "Pinecone or Weaviate",
      "Postgres with pgvector",
      "ERP and CRM connectors",
    ],
  },
  {
    category: "Workflow and control",
    items: [
      "Temporal",
      "Human approval queues",
      "OpenTelemetry",
      "LangSmith",
      "Policy and identity services",
      "Audit and evaluation pipelines",
    ],
  },
];

const faqs = [
  {
    question: "Is every AI agent agentic AI?",
    answer:
      "No. An AI agent can be a narrowly scoped component that performs one task with fixed tools. Agentic AI describes a wider system behavior or architecture in which an agent can pursue a goal through planning, feedback, coordination and controlled action.",
  },
  {
    question: "Can an AI agent use RAG?",
    answer:
      "Yes. Retrieval-augmented generation is a way to ground an agent or chatbot in approved information. RAG, tool use and agentic behavior are composable patterns rather than mutually exclusive product categories.",
  },
  {
    question: "Does agentic AI mean fully autonomous AI?",
    answer:
      "No. A production agentic system should have explicit permissions, stop conditions, human approval for consequential actions, verification and escalation. Autonomy is a design choice that should be earned through testing and evidence.",
  },
];

export default function AiAgentVsAgenticAiPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="AI architecture guide"
        title={
          <>
            AI agent vs{" "}
            <span className="text-brand-gold-light">agentic AI.</span>
          </>
        }
        description="The terms are connected but not interchangeable. Learn what an AI agent is, what agentic AI describes, how they fit together and which tools support each layer."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#difference" secondary className="border-white/30 text-white hover:bg-white/10">
            See the difference
          </ButtonLink>
          <ButtonLink href="/agentic-ai-comparison">
            Compare AI system patterns
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="muted" id="difference">
        <Shell>
          <SectionHeading
            eyebrow="The short answer"
            title="An AI agent is a component. Agentic AI is the wider operating pattern."
            copy="An AI agent performs work toward a defined goal. Agentic AI describes how a system gives that agent, or several agents, the context, tools, planning, feedback and controls needed to pursue a goal across a workflow."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="border-brand-gold/50 bg-brand-gold/5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                The component
              </p>
              <h2 className="mt-4 font-display text-3xl">AI agent</h2>
              <p className="mt-4 leading-7 text-muted">
                A software component that observes approved context,
                interprets a goal, decides what to do within its scope, calls
                permitted tools and returns an answer or action.
              </p>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-6">
                <strong>Focus:</strong> task responsibility and tool access.
              </p>
            </Card>
            <Card className="border-brand-navy/40 !bg-brand-navy !text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] !text-brand-gold-light">
                The system pattern
              </p>
              <h2 className="mt-4 font-display text-3xl !text-white">
                Agentic AI
              </h2>
              <p className="mt-4 leading-7 !text-white/75">
                A system design or behavior in which agents can pursue goals
                through planning, tool use, state, feedback, routing,
                verification, escalation and human control.
              </p>
              <p className="mt-5 border-t border-white/15 pt-4 text-sm leading-6 !text-white/80">
                <strong>Focus:</strong> autonomy, coordination and control.
              </p>
            </Card>
          </div>
          <p className="mt-6 border-l-2 border-brand-gold pl-4 text-sm leading-6 text-muted">
            These concepts overlap. An AI agent may use RAG and business tools;
            an agentic system may coordinate one agent, several agents or
            ordinary workflow services. The label should follow the actual
            architecture and behavior, not the marketing claim.
          </p>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHeading
            eyebrow="Side-by-side"
            title="Compare the unit with the system around it."
          />
          <div className="mt-8 overflow-x-auto rounded-sm border border-border">
            <table className="w-full min-w-[52rem] border-collapse text-left text-xs">
              <caption className="sr-only">
                Difference between an AI agent and agentic AI
              </caption>
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th className="w-[22%] px-3 py-3 font-semibold" scope="col">
                    Dimension
                  </th>
                  <th className="w-[39%] px-3 py-3 font-semibold" scope="col">
                    AI agent
                  </th>
                  <th className="w-[39%] px-3 py-3 font-semibold" scope="col">
                    Agentic AI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonRows.map(([label, agent, agentic]) => (
                  <tr className="align-top even:bg-surface-muted" key={label}>
                    <th className="px-3 py-2.5 font-semibold" scope="row">
                      {label}
                    </th>
                    <td className="px-3 py-2.5 leading-5 text-muted">{agent}</td>
                    <td className="px-3 py-2.5 leading-5 text-muted">{agentic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="Illustrative examples"
            title="The difference becomes clearer in the workflow."
            copy="The same AI agent can sit inside a simple assistant or a larger agentic system. The surrounding coordination determines the operating pattern."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {examples.map((example, index) => (
              <article className="border border-border bg-surface p-6" key={example.title}>
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h2 className="mt-4 font-display text-2xl">{example.title}</h2>
                <p className="mt-3 leading-7 text-muted">{example.description}</p>
                <p className="mt-5 border-t border-border pt-4 text-sm leading-6">
                  {example.pattern}
                </p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <SectionHeading
              eyebrow="Tool landscape"
              title="Tools sit at different layers of the design."
              copy="A runtime can host an agent, an interface can expose tools, and a workflow platform can provide durable execution and control. The names below are examples, not a required stack."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {tools.map((group) => (
                <article className="border border-border bg-surface-muted p-5" key={group.category}>
                  <h2 className="font-display text-xl">{group.category}</h2>
                  <ul className="mt-4 space-y-2 text-sm leading-5 text-muted">
                    {group.items.map((item) => (
                      <li className="border-b border-border pb-2 last:border-0" key={item}>
                        {item}
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
        <Shell width="medium">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Use precise language when planning AI work.
          </h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <details className="group py-5" key={faq.question}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-semibold marker:hidden">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-brand-gold transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Continue the comparison</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Compare RAG, tool-augmented chatbots and agentic AI.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Move from terminology to the practical differences in retrieval,
              tools, planning, proactivity and human control.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
            href="/agentic-ai-comparison"
          >
            Open the comparison dashboard <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <CtaBand title="Planning an AI agent or agentic workflow?" />
    </>
  );
}
