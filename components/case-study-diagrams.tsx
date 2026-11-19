import { Eyebrow } from "@/components/ui";

type FlowStep = {
  title: string;
  description: string;
};

function FlowDiagram({
  id,
  eyebrow,
  title,
  description,
  steps,
  feedback,
  ariaLabel,
  columns,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly FlowStep[];
  feedback: string;
  ariaLabel: string;
  columns: string;
}) {
  return (
    <figure
      aria-labelledby={`${id}-title`}
      className="my-10 rounded-sm border border-border bg-surface-muted p-5 sm:p-8"
    >
      <figcaption className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          className="font-display text-2xl leading-tight sm:text-3xl"
          id={`${id}-title`}
        >
          {title}
        </h2>
        <p className="mt-3 leading-7 text-muted">{description}</p>
      </figcaption>
      <ol
        aria-label={ariaLabel}
        className={`mt-7 grid gap-5 ${columns}`}
      >
        {steps.map((step, index) => (
          <li
            className="relative min-w-0 border border-border bg-surface p-4 sm:p-5"
            key={step.title}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-gold/50 bg-brand-gold/10 text-xs font-bold text-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-lg leading-snug">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {step.description}
            </p>
            {index < steps.length - 1 ? (
              <>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-brand-gold md:hidden"
                >
                  ↓
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -right-4 top-5 z-10 hidden text-lg font-bold text-brand-gold lg:block"
                >
                  →
                </span>
              </>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-start gap-3 border border-brand-gold/30 bg-brand-gold/10 p-4">
        <span aria-hidden="true" className="text-xl leading-none text-brand-gold">
          ↺
        </span>
        <p className="text-sm leading-6 text-foreground">{feedback}</p>
      </div>
    </figure>
  );
}

export function AgenticAiWorkflowDiagram() {
  const steps = [
    {
      title: "An order is flagged",
      description:
        "A stock mismatch or policy exception sends the order to a review queue.",
    },
    {
      title: "The agent gathers context",
      description:
        "It checks approved order, inventory and policy records, then cites what it found.",
    },
    {
      title: "A person reviews the options",
      description:
        "The agent proposes a next step, such as a partial shipment, for an authorized person to approve.",
    },
    {
      title: "The system updates and verifies",
      description:
        "After approval, the permitted action is recorded and the order status is checked.",
    },
  ] as const;

  return (
    <FlowDiagram
      id="agentic-ai-workflow"
      eyebrow="Example workflow"
      title="From an order exception to a verified action"
      description="A bounded agent can assemble context and prepare work; people keep authority over consequential decisions."
      steps={steps}
      feedback="The decision, evidence, approval and outcome are logged. Failed actions and human corrections return to the workflow owner for review, not automatic model retraining."
      ariaLabel="Steps for handling an order exception with an AI agent"
      columns="md:grid-cols-2 lg:grid-cols-4"
    />
  );
}

export function ManufacturingClosedLoopDiagram() {
  const steps = [
    {
      title: "Demand",
      description:
        "Customer orders and forecasts establish what is needed and when.",
    },
    {
      title: "Plan and source",
      description:
        "Material, capacity and supplier availability shape the production plan.",
    },
    {
      title: "Produce and inspect",
      description:
        "Work orders capture output, material use and quality checks.",
    },
    {
      title: "Store and deliver",
      description:
        "Approved goods move through inventory, shipment and order completion.",
    },
    {
      title: "Reconcile",
      description:
        "Actuals update inventory, order status and financial records.",
    },
  ] as const;

  return (
    <FlowDiagram
      id="manufacturing-closed-loop"
      eyebrow="The operating loop"
      title="One connected flow from demand to delivery"
      description="A new system landscape connects commercial, planning, shop-floor, quality, warehouse and finance workflows."
      steps={steps}
      feedback="Actual consumption, output, quality results and delivery status feed the next planning cycle, making exceptions visible instead of leaving teams to reconcile them manually."
      ariaLabel="Manufacturing flow from customer demand through planning, production, delivery and reconciliation"
      columns="md:grid-cols-2 lg:grid-cols-5"
    />
  );
}
