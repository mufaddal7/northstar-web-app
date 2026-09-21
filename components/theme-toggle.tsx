"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ThemeIcon } from "@/components/icons";

export function ThemeToggle() {
  const storedDark = useSyncExternalStore(subscribeToTheme, readTheme, () => false);
  const [override, setOverride] = useState<boolean | null>(null);
  const dark = override ?? storedDark;
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  function toggle() {
    const nextDark = !dark;
    setOverride(nextDark);
    window.localStorage.setItem("northstar-theme", nextDark ? "dark" : "light");
  }
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}><ThemeIcon dark={dark}/></button>;
}

function readTheme() {
  const stored = window.localStorage.getItem("northstar-theme");
  return stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribeToTheme(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const storage = (event: StorageEvent) => { if (event.key === "northstar-theme") callback(); };
  media.addEventListener("change", callback);
  window.addEventListener("storage", storage);
  return () => { media.removeEventListener("change", callback); window.removeEventListener("storage", storage); };
}
