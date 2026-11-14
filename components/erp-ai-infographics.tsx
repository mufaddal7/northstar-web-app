import styles from "./erp-ai-infographics.module.css";

const loopSteps = [
  {
    title: "ERP context",
    description: "Approved records, events and business rules.",
  },
  {
    title: "AI interprets",
    description: "Summarize, classify or recommend a next step.",
  },
  {
    title: "People and policy check",
    description: "Approve, correct or escalate uncertain cases.",
  },
  {
    title: "ERP action",
    description: "Update the workflow and keep an audit trail.",
  },
] as const;

const adoptionSteps = [
  {
    title: "Discover",
    description: "Map one workflow, its data and the decisions it supports.",
  },
  {
    title: "Prove",
    description: "Pilot a focused use case with human review.",
  },
  {
    title: "Integrate",
    description: "Add access controls, monitoring and exception handling.",
  },
  {
    title: "Improve",
    description: "Measure results and expand only when evidence supports it.",
  },
] as const;

export function ErpAiLoop({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <figure
      aria-labelledby="erp-ai-loop-heading"
      className={styles.diagram}
    >
      <figcaption className={styles.caption}>
        <p className={styles.eyebrow}>The operating loop</p>
        <h2 className={styles.heading} id="erp-ai-loop-heading">
          {heading}
        </h2>
        <p className={styles.description}>{description}</p>
      </figcaption>
      <ol aria-label="ERP artificial intelligence feedback loop" className={styles.steps}>
        {loopSteps.map((step, index) => (
          <li className={styles.step} key={step.title}>
            <span aria-hidden="true" className={styles.number}>
              0{index + 1}
            </span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </li>
        ))}
      </ol>
      <div className={styles.feedback}>
        <span aria-hidden="true" className={styles.loopIcon}>
          ↺
        </span>
        <p>
          Outcomes and human corrections inform the next cycle. Teams review
          feedback and make controlled updates to workflows, rules and AI
          instructions.
        </p>
      </div>
      <p className={styles.note}>
        A feedback loop does not mean the model retrains itself after every
        action. Changes should be evaluated, tested and governed.
      </p>
    </figure>
  );
}

export function ErpAiAdoptionRoadmap({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <figure
      aria-labelledby="erp-ai-roadmap-heading"
      className={`${styles.diagram} ${styles.roadmap}`}
    >
      <figcaption className={styles.caption}>
        <p className={styles.eyebrow}>A staged approach</p>
        <h2 className={styles.heading} id="erp-ai-roadmap-heading">
          {heading}
        </h2>
        <p className={styles.description}>{description}</p>
      </figcaption>
      <ol aria-label="Steps for adopting AI in ERP" className={styles.steps}>
        {adoptionSteps.map((step, index) => (
          <li className={styles.step} key={step.title}>
            <span aria-hidden="true" className={styles.number}>
              0{index + 1}
            </span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
