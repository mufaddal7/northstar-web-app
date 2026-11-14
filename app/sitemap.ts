import type { MetadataRoute } from "next";
import {
  allServices,
  insightArticles,
  pillars,
  SITE_URL,
} from "@/lib/site-data";
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/erp-implementation",
    "/erp-implementation/erpnext",
    "/erp-vs-crm",
    "/what-we-do",
    "/how-we-work",
    "/maturity-scan",
    "/industries",
    "/case-studies",
    "/insights",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return [
    ...staticPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority:
        path === ""
          ? 1
          : path === "/erp-implementation"
            ? 0.9
            : path === "/erp-vs-crm"
              ? 0.8
              : 0.7,
    })),
    ...pillars.map(({ slug }) => ({
      url: `${SITE_URL}/what-we-do/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...allServices.map(({ pillar, slug }) => ({
      url: `${SITE_URL}/what-we-do/${pillar.slug}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...insightArticles.map(({ slug }) => ({
      url: `${SITE_URL}/insights/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
