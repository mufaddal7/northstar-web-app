import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./erp-module-word-map.module.css";
import { erpModuleWordTerms } from "@/lib/erp-module-data";

type ErpModuleWordMapProps = {
  activeTerm: string;
  onSelectTerm: (term: string) => void;
};

const terms = [
  ...new Map(
    erpModuleWordTerms.map((term) => [term.label.toLowerCase(), term]),
  ).values(),
];

export function ErpModuleWordMap({
  activeTerm,
  onSelectTerm,
}: ErpModuleWordMapProps) {
  const [focusIndex, setFocusIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveFocus(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % terms.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + terms.length) % terms.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = terms.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setFocusIndex(nextIndex);
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <figure
      aria-labelledby="erp-module-word-map-title"
      className="mt-8 border border-border bg-surface p-4 sm:p-6"
    >
      <figcaption className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
            Module word map
          </p>
          <h2
            className="mt-1 font-display text-xl leading-tight sm:text-2xl"
            id="erp-module-word-map-title"
          >
            Explore the vocabulary
          </h2>
        </div>
        <p className="text-xs leading-5 text-muted">
          Select a word to filter the table. Hover to magnify.
        </p>
      </figcaption>
      <div
        aria-label="ERP modules, abbreviations and related capabilities"
        aria-orientation="horizontal"
        className={styles.wordMap}
        role="toolbar"
      >
        {terms.map((term, index) => (
          <button
            aria-pressed={activeTerm.toLowerCase() === term.label.toLowerCase()}
            className={styles.term}
            data-size={index % 9 === 0 ? "large" : index % 3 === 0 ? "medium" : "small"}
            data-tone={term.tone}
            key={term.label}
            onClick={() => onSelectTerm(term.label)}
            onFocus={() => setFocusIndex(index)}
            onKeyDown={(event) => moveFocus(event, index)}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            tabIndex={index === focusIndex ? 0 : -1}
            type="button"
          >
            {term.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-muted">
        Use the arrow keys to browse terms. The word map moves gently; reduced
        motion settings turn off the animation.
      </p>
    </figure>
  );
}
