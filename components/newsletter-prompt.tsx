"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  maturityScanPromptDismissedEvent,
  maturityScanPromptDismissedKey,
  newsletterPromptDismissedUntilKey,
  newsletterPromptSeenKey,
  newsletterSubscribedEvent,
  newsletterSubscribedKey,
  type NewsletterSource,
} from "@/lib/newsletter-ui-state";

const promptDelay = 30_000;
const dismissalCooldown = 30 * 24 * 60 * 60 * 1000;

export function NewsletterPrompt() {
  const pathname = usePathname();
  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const seenRef = useRef(false);
  const maturityDismissedRef = useRef(false);
  const remainingRef = useRef(promptDelay);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let startedAt = 0;

    function isExcludedPath() {
      return (
        pathname === "/maturity-scan" ||
        pathname.startsWith("/maturity-scan/") ||
        pathname === "/contact" ||
        pathname === "/privacy" ||
        pathname.startsWith("/privacy/") ||
        pathname === "/terms" ||
        pathname === "/offline"
      );
    }

    function maturityPromptDismissed() {
      if (maturityDismissedRef.current) return true;
      try {
        maturityDismissedRef.current =
          window.sessionStorage.getItem(maturityScanPromptDismissedKey) ===
          "true";
        return maturityDismissedRef.current;
      } catch {
        return false;
      }
    }

    function promptSeenThisSession() {
      try {
        return window.sessionStorage.getItem(newsletterPromptSeenKey) === "true";
      } catch {
        return false;
      }
    }

    function alreadySubscribed() {
      try {
        return window.localStorage.getItem(newsletterSubscribedKey) === "true";
      } catch {
        return false;
      }
    }

    function isDismissedForCooldown() {
      try {
        const dismissedUntil = Number(
          window.localStorage.getItem(newsletterPromptDismissedUntilKey),
        );
        return Number.isFinite(dismissedUntil) && dismissedUntil > Date.now();
      } catch {
        return false;
      }
    }

    function markSeen() {
      seenRef.current = true;
      try {
        window.sessionStorage.setItem(newsletterPromptSeenKey, "true");
      } catch {
        // The in-memory guard still limits this prompt to one display per page session.
      }
    }

    function showPrompt() {
      timer = null;
      remainingRef.current = 0;
      if (
        document.visibilityState !== "visible" ||
        isExcludedPath() ||
        !maturityPromptDismissed()
      ) {
        return;
      }
      if (alreadySubscribed() || isDismissedForCooldown()) {
        markSeen();
        return;
      }
      markSeen();
      setOpen(true);
    }

    function pauseTimer() {
      if (!timer) return;
      clearTimeout(timer);
      timer = null;
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (Date.now() - startedAt),
      );
    }

    function startTimer() {
      if (
        timer ||
        seenRef.current ||
        promptSeenThisSession() ||
        open ||
        document.visibilityState !== "visible" ||
        isExcludedPath() ||
        !maturityPromptDismissed()
      ) {
        return;
      }
      if (alreadySubscribed() || isDismissedForCooldown()) {
        markSeen();
        return;
      }
      if (remainingRef.current === 0) {
        showPrompt();
        return;
      }
      startedAt = Date.now();
      timer = setTimeout(showPrompt, remainingRef.current);
    }

    function handleMaturityPromptDismissed() {
      maturityDismissedRef.current = true;
      startTimer();
    }

    function handleNewsletterSubscribed(event: Event) {
      const source = (event as CustomEvent<{ source?: NewsletterSource }>).detail
        ?.source;
      markSeen();
      if (source !== "popup") setOpen(false);
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === newsletterSubscribedKey && event.newValue === "true") {
        markSeen();
        setOpen(false);
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        pauseTimer();
      } else {
        startTimer();
      }
    }

    if (open && isExcludedPath()) {
      dismissPrompt();
      return;
    }

    startTimer();
    window.addEventListener(
      maturityScanPromptDismissedEvent,
      handleMaturityPromptDismissed,
    );
    window.addEventListener(
      newsletterSubscribedEvent,
      handleNewsletterSubscribed,
    );
    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      pauseTimer();
      window.removeEventListener(
        maturityScanPromptDismissedEvent,
        handleMaturityPromptDismissed,
      );
      window.removeEventListener(
        newsletterSubscribedEvent,
        handleNewsletterSubscribed,
      );
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [open, pathname]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismissPrompt();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function dismissPrompt() {
    seenRef.current = true;
    try {
      window.sessionStorage.setItem(newsletterPromptSeenKey, "true");
      window.localStorage.setItem(
        newsletterPromptDismissedUntilKey,
        String(Date.now() + dismissalCooldown),
      );
    } catch {
      // The in-memory guard still limits this prompt to one display per page session.
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <aside
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      aria-live="polite"
      aria-modal="false"
      className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-h-[calc(100dvh-2rem)] w-auto max-w-[400px] overscroll-contain overflow-y-auto rounded-sm border border-brand-gold/40 bg-surface p-5 text-foreground shadow-2xl shadow-brand-navy/20 sm:p-6"
      role="dialog"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold">
          Northstar bulletin
        </p>
        <button
          aria-label="Close newsletter signup"
          className="-mr-2 -mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          onClick={dismissPrompt}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="m6 6 12 12M18 6 6 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
        </button>
      </div>
      <h2 className="mt-1 pr-3 font-display text-xl leading-tight" id={titleId}>
        A thoughtful update, now and then.
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted" id={descriptionId}>
        Get practical news and insights on business systems, data and
        technology.
      </p>
      <div className="mt-4">
        <NewsletterForm source="popup" />
      </div>
    </aside>
  );
}
