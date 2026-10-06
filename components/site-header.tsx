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
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.toggle("menu-open", open);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Brand />
        <nav
          className={`main-nav ${open ? "main-nav--open" : ""}`}
          id={panelId}
          aria-label="Primary navigation"
        >
          {links.map(([label, href]) => (
            <Link style={{fontSize: "14px"}} key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link
            className="main-nav__contact"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </nav>
        <div className="site-header__actions">
          <ThemeToggle />
          <Link className="button button--small button--gold" href="/contact">
            Start a conversation
          </Link>
          <button
            className={`menu-button ${open ? "menu-button--open" : ""}`}
            type="button"
            aria-controls={panelId}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">{open ? "Close" : "Open"} menu</span>
            <i />
            <i />
          </button>
        </div>
      </div>
    </header>
  );
}
