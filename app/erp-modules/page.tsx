import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { ErpModuleExplorer } from "@/components/erp-module-explorer";
import { ErpPeriodicTablePromo } from "@/components/erp-periodic-table-promo";
import { Eyebrow, Section, Shell } from "@/components/ui";
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
      <Section tone="muted" className="!py-0" id="module-reference">
        <Shell>
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

      <Section tone="muted">
        <Shell>
          <ErpPeriodicTablePromo />
        </Shell>
      </Section>

      <CtaBand title="Need help mapping ERP modules to your workflows?" />
    </>
  );
}
