import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Eyebrow, Section, Shell } from "@/components/ui";
import styles from "./agentic-ai-section.module.css";

const workflowSteps = [
  "Check order and inventory data",
  "Compare the latest carrier update",
  "Prepare a customer message",
  "Request approval before sending",
] as const;

export function AgenticAiSection() {
  return (
    <Section className={styles.section} id="ai-in-business" tone="navy">
      <Shell>
        <div className="grid items-end gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow inverse>AI, connected to the work</Eyebrow>
            <h2 className="max-w-2xl font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              AI should move work forward, not just answer questions.
            </h2>
          </div>
          <div>
            <p className="leading-7 text-white/75">
              To create business value, move beyond AI as a search box. Connect
              it to well-defined workflows so it can use business context,
              prepare actions and automate approved steps, while people stay in
              control of important decisions.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline"
              href="/what-we-do/intelligence"
            >
              Explore data and AI <ArrowUpRight />
            </Link>
          </div>
        </div>

        <div
          aria-label="Comparison of AI as a search tool and as part of a business workflow"
          className={`${styles.comparison} mt-10`}
        >
          <article className={styles.searchCard}>
            <p className={styles.cardEyebrow}>AI as a search tool</p>
            <h3 className={styles.cardTitle}>An answer, then manual follow-up</h3>
            <div className={styles.question}>
              <span className={styles.questionLabel}>You ask</span>
              Is order 1048 going to arrive late?
            </div>
            <div className={styles.answer}>
              <span className={styles.answerLabel}>AI answers</span>
              The carrier reports a delay.
            </div>
            <p className={styles.manualWork}>
              A person still checks inventory, updates the order and contacts
              the customer.
            </p>
          </article>

          <article className={styles.workflowCard}>
            <div className={styles.workflowHeading}>
              <div>
                <p className={styles.cardEyebrow}>AI in a business workflow</p>
                <h3 className={styles.cardTitle}>A signal becomes a next step</h3>
              </div>
              <span className={styles.status}>
                <span aria-hidden="true" className={styles.statusDot} />
                Guardrailed
              </span>
            </div>
            <p className={styles.trigger}>
              Order delay detected <span aria-hidden="true">→</span>
            </p>
            <ol className={styles.workflow}>
              {workflowSteps.map((step, index) => (
                <li className={styles.workflowStep} key={step}>
                  <span aria-hidden="true" className={styles.stepMarker}>
                    {index < workflowSteps.length - 1 ? "✓" : "4"}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className={styles.approvalNote}>
              People review exceptions and approve consequential actions.
            </p>
          </article>
        </div>
      </Shell>
    </Section>
  );
}
