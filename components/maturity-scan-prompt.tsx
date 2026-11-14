"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/icons";

const promptSeenKey = "northstar-maturity-scan-prompt-seen";
const promptDelay = 30_000;

export function MaturityScanPrompt() {
  const pathname = usePathname();
  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const seenRef = useRef(false);
  const remainingRef = useRef(promptDelay);

  useEffect(() => {
    const isExcludedPath =
      pathname === "/maturity-scan" ||
      pathname.startsWith("/maturity-scan/") ||
      pathname === "/contact";

    if (open && isExcludedPath) {
      dismissPrompt();
      return;
    }

    if (seenRef.current || open) return;

    try {
      if (window.sessionStorage.getItem(promptSeenKey)) {
        seenRef.current = true;
        return;
      }
    } catch {
      // The in-memory guard still limits this prompt to one display per page session.
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    let startedAt = 0;

    function pauseTimer() {
      if (!timer) return;
      clearTimeout(timer);
      timer = null;
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (Date.now() - startedAt),
      );
    }

    function markSeen() {
      seenRef.current = true;
      try {
        window.sessionStorage.setItem(promptSeenKey, "true");
      } catch {
        // The in-memory guard still limits this prompt to one display per page session.
      }
    }

    function showPrompt() {
      timer = null;
      remainingRef.current = 0;
      if (
        document.visibilityState !== "visible" ||
        pathname === "/maturity-scan" ||
        pathname.startsWith("/maturity-scan/") ||
        pathname === "/contact"
      ) {
        return;
      }
      markSeen();
      setOpen(true);
    }

    function startTimer() {
      if (
        timer ||
        document.visibilityState !== "visible" ||
        isExcludedPath
      ) {
        return;
      }
      if (remainingRef.current === 0) {
        showPrompt();
        return;
      }
      startedAt = Date.now();
      timer = setTimeout(showPrompt, remainingRef.current);
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        pauseTimer();
      } else {
        startTimer();
      }
    }

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      pauseTimer();
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
      window.sessionStorage.setItem(promptSeenKey, "true");
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
      className="maturity-scan-prompt fixed bottom-4 right-4 z-[60] w-[calc(100vw-2rem)] max-w-[360px] rounded-sm border border-brand-gold/40 bg-surface p-5 text-foreground shadow-2xl shadow-brand-navy/20"
      role="dialog"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold">
          A quick business check
        </p>
        <button
          aria-label="Dismiss modernization scan prompt"
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
      <h2
        className="mt-1 pr-3 font-display text-xl leading-tight"
        id={titleId}
      >
        How modern is your business, really?
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted" id={descriptionId}>
        Find out what is working across your processes, systems and data, and
        where to focus next.
      </p>
      <Link
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-brand-gold px-4 py-2 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-light"
        href="/maturity-scan"
        onClick={dismissPrompt}
      >
        Check your modernization score <ArrowUpRight className="h-4 w-4" />
      </Link>
      <p className="mt-2 text-center text-[10px] font-semibold text-muted">
        Six quick questions · A tailored snapshot
      </p>
    </aside>
  );
}
