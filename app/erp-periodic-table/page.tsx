import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { ErpPeriodicTable } from "@/components/erp-periodic-table";
import { Section, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site-data";

const pageTitle = "The Periodic Table of ERP | ERP Capability Map and all ERP Modules";
const pageDescription =
  "Explore the business capabilities, data foundations and intelligent workflows that make up a modern ERP operating model.";
const pagePath = "/erp-periodic-table";

const baseMetadata = pageMetadata(pageTitle, pageDescription, pagePath);

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    type: "website",
    url: `${SITE_URL}${pagePath}`,
    images: [
      {
        url: `${SITE_URL}/erp_periodic_table.png`,
        width: 1440,
        height: 1217,
        alt: "The Periodic Table of ERP by Northstar",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    images: [`${SITE_URL}/erp_periodic_table.png`],
  },
};

export default function ErpPeriodicTablePage() {
  return (
    <>
      <Section id="periodic-table" className="scroll-mt-24 py-5 sm:py-7 lg:py-9">
        <Shell>
          <ErpPeriodicTable />
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
              Turn the map into a plan
            </p>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              The right ERP scope follows your work, not a vendor checklist.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              Use the table to start a conversation about the capabilities your
              teams need now, the controls that matter, and where intelligence
              could remove friction.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-bold transition-colors hover:border-brand-gold hover:bg-surface"
            href="/erp-modules"
          >
            Browse ERP modules <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <CtaBand title="Want to turn your ERP capability map into a practical next step?" />
    </>
  );
}
