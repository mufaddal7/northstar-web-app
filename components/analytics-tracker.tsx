"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("page_view", {
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
