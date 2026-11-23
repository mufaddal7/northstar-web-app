"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ContactForm } from "@/components/contact-form";
import { trackEvent } from "@/lib/analytics";

const promptSeenKey = "northstar-inquiry-prompt-seen";
const scrollThreshold = 0.35;

export function InquiryPrompt() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const excluded =
      pathname === "/contact" ||
      pathname === "/maturity-scan" ||
      pathname.startsWith("/maturity-scan/");
    if (excluded) return;

    try {
      if (window.sessionStorage.getItem(promptSeenKey)) return;
    } catch {
      // The in-memory state still prevents repeated opens during this mount.
    }

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progress < scrollThreshold) return;

      try {
        window.sessionStorage.setItem(promptSeenKey, "true");
      } catch {
        // Continue with the prompt when storage is unavailable.
      }
      setOpen(true);
      trackEvent("inquiry_prompt_view", { page_path: pathname });
      window.removeEventListener("scroll", handleScroll);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
      return;
    }
    if (dialogRef.current?.open) dialogRef.current.close();
  }, [open]);

  function close() {
    dialogRef.current?.close();
    setOpen(false);
    trackEvent("inquiry_prompt_dismiss", { page_path: pathname });
  }

  return (
    <dialog
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className="m-auto max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-[42rem] overflow-y-auto rounded-sm border border-brand-gold/40 bg-surface p-0 text-foreground shadow-2xl backdrop:bg-brand-navy/75 backdrop:backdrop-blur-sm"
      onCancel={close}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      ref={dialogRef}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border bg-surface px-5 py-5 sm:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
            Let&apos;s make a useful start
          </p>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl" id={titleId}>
            Have a business challenge in mind?
          </h2>
        </div>
        <button
          aria-label="Close inquiry prompt"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border text-lg transition-colors hover:bg-surface-muted"
          onClick={close}
          type="button"
        >
          ×
        </button>
      </div>
      <div className="p-5 sm:p-8">
        <p className="mb-6 max-w-2xl text-sm leading-6 text-muted" id={descriptionId}>
          Tell us what you want to improve. We&apos;ll follow up with a practical
          next step, not a sales script.
        </p>
        <ContactForm source="scroll_inquiry" />
      </div>
    </dialog>
  );
}
