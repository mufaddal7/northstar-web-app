import styles from "@/components/implementation-journey.module.css";

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "Map the work, systems and decisions that keep your business moving.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Agree what to change first, what to keep, and how success will be judged.",
  },
  {
    number: "03",
    title: "Configure",
    description:
      "Shape ERPNext around your workflows, data and connected tools.",
  },
  {
    number: "04",
    title: "Validate",
    description:
      "Test real business scenarios and prepare the people who will use it.",
  },
  {
    number: "05",
    title: "Improve",
    description:
      "Launch in a controlled way, support adoption and refine what comes next.",
  },
] as const;

export function ImplementationJourney() {
  return (
    <div className={styles.journey}>
      <svg
        aria-hidden="true"
        className={styles.connection}
        preserveAspectRatio="none"
        viewBox="0 0 1000 2"
      >
        <path className={styles.track} d="M0 1H1000" />
        <path className={styles.flow} d="M0 1H1000" />
      </svg>
      <ol className="grid gap-7 md:grid-cols-5 md:gap-4">
        {steps.map((step) => (
          <li className="flex gap-4 md:block md:text-center" key={step.number}>
            <span className={`${styles.node} relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold text-xs font-bold tracking-wider text-brand-navy shadow-[0_0_0_6px_var(--surface)]`}>
              {step.number}
            </span>
            <div className="pt-1 md:pt-5">
              <h3 className="font-display text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
