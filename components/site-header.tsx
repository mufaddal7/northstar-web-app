"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  ["What we do", "/what-we-do"],
  ["How we work", "/how-we-work"],
  ["Industries", "/industries"],
  ["Insights", "/insights"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onResize() {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1280px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <Brand />
        <nav
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full z-20 flex-col gap-1 border-b border-border bg-surface p-5 shadow-xl md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          id={panelId}
          aria-label="Primary navigation"
        >
          {links.map(([label, href]) => (
            <Link
              className="rounded-sm px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted hover:text-brand-gold md:px-0 md:py-2 md:hover:bg-transparent"
              key={href}
              href={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            className="rounded-sm px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted md:hidden"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link className="hidden min-h-10 items-center rounded-sm bg-brand-gold px-4 text-xs font-bold text-brand-navy transition-colors hover:bg-brand-gold-light sm:inline-flex" href="/contact">
            Start a conversation
          </Link>
          <button
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-sm border border-border text-foreground md:hidden"
            type="button"
            aria-controls={panelId}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open ? <button className="fixed inset-0 z-10 cursor-default bg-brand-navy/30 md:hidden" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}
    </header>
  );
}
