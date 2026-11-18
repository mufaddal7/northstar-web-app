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
    return window.localStorage.getItem("northstar-theme") === "dark";
  } catch {
    return false;
  }
}

function subscribeToTheme(callback: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === "northstar-theme") callback();
  };
  window.addEventListener("storage", storage);
  return () => window.removeEventListener("storage", storage);
}
