"use client";

import { useId, useRef, useState } from "react";
import { ContactForm } from "@/components/contact-form";

export function ContactDialog({
  label = "Start an inquiry",
  className = "",
  initialInterest = "",
  secondary = false,
}: {
  label?: string;
  className?: string;
  initialInterest?: string;
  secondary?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const [formKey, setFormKey] = useState(0);

  function openDialog() {
    setFormKey((key) => key + 1);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button
        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-offset-4 ${secondary ? "border border-current text-current hover:bg-white/10" : "bg-brand-gold text-brand-navy hover:bg-brand-gold-light"} ${className}`}
        aria-controls={dialogId}
        aria-haspopup="dialog"
        type="button"
        onClick={openDialog}
      >
        {label}
      </button>
      <dialog
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="m-auto max-h-[min(90dvh,52rem)] w-[min(94vw,44rem)] overflow-y-auto rounded-sm border border-border bg-surface p-0 text-foreground shadow-2xl backdrop:bg-brand-navy/75 backdrop:backdrop-blur-sm"
        id={dialogId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        ref={dialogRef}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-border bg-surface/95 px-5 py-4 backdrop-blur sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
              A useful first conversation
            </p>
            <h2 className="mt-1 font-display text-2xl" id={titleId}>
              Tell us what you want to improve.
            </h2>
          </div>
          <button
            aria-label="Close inquiry form"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border text-lg transition-colors hover:bg-surface-muted"
            onClick={() => dialogRef.current?.close()}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <p className="mb-6 text-sm leading-6 text-muted" id={descriptionId}>
            Share a little context. We’ll get back to you and discuss the right
            next step. There’s no obligation.
          </p>
          <ContactForm initialInterest={initialInterest} key={formKey} />
        </div>
      </dialog>
    </>
  );
}
