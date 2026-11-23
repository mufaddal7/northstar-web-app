import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { ErpModuleExplorer } from "@/components/erp-module-explorer";
import { ErpReferenceArchitecture } from "@/components/erp-reference-architecture";
import { Eyebrow, PageHero, Section, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

const pageTitle = "ERP Modules: Standard Categories and Capabilities";
const pageDescription =
  "Browse standard ERP module categories, common capability names and practical definitions. Filter the index and open a module for more detail.";

export const metadata: Metadata = pageMetadata(
  pageTitle,
  pageDescription,
  "/erp-modules",
);

export default function ErpModulesPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="ERP reference"
        title="ERP modules, in plain language."
        description="A compact index of the business capabilities found in modern ERP suites and connected applications. Use standard names first, then confirm how each vendor packages them."
      >
        <div className="flex flex-wrap gap-3 text-sm text-white/75">
          <span className="rounded-full border border-white/20 px-3 py-1.5">
            6 categories
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1.5">
            33 capabilities
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1.5">
            Expand for detail
          </span>
        </div>
      </PageHero>

      <Section className="py-12 sm:py-16 lg:py-20">
        <ErpReferenceArchitecture />
      </Section>

      <Section tone="muted" id="module-reference">
        <Shell width="medium">
          <div className="mb-8 max-w-3xl">
            <Eyebrow>How to use this index</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Start with the capability, not the vendor menu.
            </h2>
            <p className="mt-4 leading-7 text-muted">
              ERP products use different labels and bundle capabilities in
              different editions. These category and module names follow
              common industry language. Open any row to see what it covers and
              the terms you may encounter in product documentation.
            </p>
          </div>
          <ErpModuleExplorer />
        </Shell>
      </Section>

      <Section>
        <Shell className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Next step</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Map modules to the work your business needs to connect.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              A useful ERP scope follows processes, data ownership and
              integration needs. The module list is only the starting point.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-bold transition-colors hover:border-brand-gold hover:bg-surface-muted"
            href="/erp-implementation"
          >
            Explore ERP implementation
            <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <CtaBand title="Need help mapping ERP modules to your workflows?" />
    </>
  );
}
