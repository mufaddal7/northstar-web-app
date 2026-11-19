"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPillar, getService, insightArticles, SITE_URL } from "@/lib/site-data";

const pageLabels: Record<string, string> = {
  "/about": "About Northstar",
  "/case-studies": "Case Studies",
  "/compare": "ERP Comparisons",
  "/compare/netsuite-vs-oracle-fusion-erp":
    "NetSuite vs Oracle Fusion Cloud ERP",
  "/contact": "Contact",
  "/erp-implementation": "ERP Implementation",
  "/erp-implementation/erpnext": "ERPNext Implementation",
  "/erp-vs-crm": "ERP vs CRM",
  "/how-we-work": "How We Work",
  "/industries": "Industries",
  "/insights": "Insights",
  "/maturity-scan": "Business Maturity Scan",
  "/news": "News",
  "/privacy": "Privacy",
  "/terms": "Terms",
  "/what-is-erp": "What Is ERP?",
  "/what-we-do": "What We Do",
};

const newsTitles: Record<string, string> = {
  "data-security-beyond-firewalls":
    "Data Security Beyond Firewalls: A Practical Guide",
  "five-critical-cves-security-teams-2026":
    "Five Critical CVEs Security Teams Should Check Now",
};

const acronymLabels: Record<string, string> = {
  ai: "AI",
  crm: "CRM",
  erp: "ERP",
  erpnext: "ERPNext",
  netsuite: "NetSuite",
  sap: "SAP",
};

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map(
      (word) =>
        acronymLabels[word.toLowerCase()] ??
        `${word.charAt(0).toUpperCase()}${word.slice(1)}`,
    )
    .join(" ");
}

function getLabel(path: string, segments: string[]) {
  if (pageLabels[path]) return pageLabels[path];

  if (segments[0] === "what-we-do" && segments[1]) {
    if (segments.length === 2) {
      return getPillar(segments[1])?.title ?? formatSlug(segments[1]);
    }

    if (segments.length === 3) {
      return (
        getService(segments[1], segments[2])?.title ??
        formatSlug(segments[2])
      );
    }
  }

  if (segments[0] === "insights" && segments[1]) {
    return (
      insightArticles.find((article) => article.slug === segments[1])?.title ??
      formatSlug(segments[1])
    );
  }

  if (segments[0] === "news" && segments[1]) {
    return newsTitles[segments[1]] ?? formatSlug(segments[1]);
  }

  return formatSlug(segments.at(-1) ?? "");
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const items = [
    { href: "/", label: "Home" },
    ...segments.map((segment, index) => {
      const pathSegments = segments.slice(0, index + 1);
      const href = `/${pathSegments.join("/")}`;

      return {
        href,
        label: getLabel(href, pathSegments),
      };
    }),
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ href, label }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: label,
      item: new URL(href, SITE_URL).toString(),
    })),
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border bg-surface text-sm"
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 py-3 sm:px-8 lg:px-12">
          <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            {items.map(({ href, label }, index) => {
              const isCurrent = index === items.length - 1;

              return (
                <li
                  key={href}
                  className="flex min-w-0 items-center gap-x-2"
                >
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-muted/70">
                      /
                    </span>
                  ) : null}
                  {isCurrent ? (
                    <span
                      aria-current="page"
                      className="max-w-full break-words font-medium text-foreground"
                    >
                      {label}
                    </span>
                  ) : (
                    <Link
                      className="break-words text-muted underline-offset-4 hover:text-brand-gold hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
                      href={href}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
