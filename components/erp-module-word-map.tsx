import styles from "./erp-module-word-map.module.css";
import { erpModuleWordTerms } from "@/lib/erp-module-data";

const terms = [
  ...new Map(
    erpModuleWordTerms.map((term) => [term.label.toLowerCase(), term]),
  ).values(),
];

export function ErpModuleWordMap() {
  return (
    <figure
      aria-labelledby="erp-module-word-map-title"
      className="rounded-sm border border-border bg-surface-muted p-5 sm:p-8"
    >
      <figcaption className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
          The module landscape
        </p>
        <h2
          className="mt-3 font-display text-2xl leading-tight sm:text-4xl"
          id="erp-module-word-map-title"
        >
          One system. Many connected capabilities.
        </h2>
        <p className="mt-3 leading-7 text-muted">
          A moving map of common ERP modules, extensions and newer capabilities.
          Pause motion by enabling reduced motion in your device settings.
        </p>
      </figcaption>
      <ul
        aria-label="ERP modules, abbreviations and related capabilities"
        className={styles.wordMap}
      >
        {terms.map((term, index) => (
          <li
            className={styles.term}
            data-size={index % 7 === 0 ? "large" : index % 3 === 0 ? "medium" : "small"}
            data-tone={term.tone}
            key={term.label}
          >
            {term.label}
          </li>
        ))}
      </ul>
      <ul aria-label="Word map color key" className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand-gold" />
          Finance
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-foreground" />
          Operations
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border border-brand-gold bg-surface" />
          Manufacturing
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border border-border bg-surface" />
          People & customers
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border border-border bg-surface-muted" />
          Digital & emerging
        </li>
      </ul>
    </figure>
  );
}
