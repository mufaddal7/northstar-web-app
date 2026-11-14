"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ThemeIcon } from "@/components/icons";

export function ThemeToggle() {
  const storedDark = useSyncExternalStore(
    subscribeToTheme,
    readTheme,
    () => false,
  );
  const [override, setOverride] = useState<boolean | null>(null);
  const dark = override ?? storedDark;
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  function toggle() {
    const nextDark = !dark;
    setOverride(nextDark);
    try {
      window.localStorage.setItem("northstar-theme", nextDark ? "dark" : "light");
    } catch {
      document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    }
  }
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-muted"
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
    >
      <ThemeIcon dark={dark} />
    </button>
  );
}

function readTheme() {
  try {
    const stored = window.localStorage.getItem("northstar-theme");
    return stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}

function subscribeToTheme(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const storage = (event: StorageEvent) => {
    if (event.key === "northstar-theme") callback();
  };
  media.addEventListener("change", callback);
  window.addEventListener("storage", storage);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("storage", storage);
  };
}
