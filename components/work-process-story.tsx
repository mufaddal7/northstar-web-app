import styles from "@/components/work-process-story.module.css";
import { processSteps } from "@/lib/site-data";

export function WorkProcessStory() {
  return (
    <div className="grid items-start gap-8 md:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <div className="md:sticky md:top-28 md:self-start">
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
            Keep the outcome in view
          </p>
          <h3 className="mt-1 font-display text-2xl">
            Better outcomes start when people, process and platform work together.
          </h3>
        </div>
        <div
          aria-label="Illustration of people, process and platform surrounding a shared business outcome"
          className={styles.scene}
          role="img"
        >
          <div
            aria-hidden="true"
            className={`${styles.orbit} ${styles.orbitOuter} ${styles.parallaxSlow}`}
          />
          <div
            aria-hidden="true"
            className={`${styles.orbit} ${styles.orbitInner} ${styles.parallaxFast}`}
          />
          <div className={`${styles.core} ${styles.parallaxSlow}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
              Shared direction
            </span>
            <span className="mt-1 font-display text-lg leading-tight">
              Business outcome
            </span>
          </div>
          <span className={`${styles.tag} ${styles.people}`}>People</span>
          <span className={`${styles.tag} ${styles.process}`}>Process</span>
          <span className={`${styles.tag} ${styles.platform}`}>Platform</span>
        </div>
      </div>

      <ol className="grid gap-3">
        {processSteps.map(([number, title, copy]) => (
          <li
            className="grid gap-3 rounded-sm border border-border bg-surface p-5 sm:grid-cols-[3rem_1fr] sm:gap-5 sm:p-6"
            key={number}
          >
            <span className="text-xs font-bold tracking-widest text-brand-gold">
              {number}
            </span>
            <div>
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
