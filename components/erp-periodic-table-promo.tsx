import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export function ErpPeriodicTablePromo() {
  return (
    <div className="rounded-sm border border-brand-gold/35 bg-brand-navy p-6 text-white sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-light">
        New ERP capability map
      </p>
      <div className="mt-3 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="font-display text-2xl leading-tight sm:text-3xl">
            Explore the Periodic Table of ERP.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
            See how records, workflows, controls, intelligence and platform
            foundations fit together before you define scope.
          </p>
        </div>
        <Link
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-brand-gold px-4 py-2 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-light"
          href="/erp-periodic-table"
        >
          Explore the table <ArrowUpRight />
        </Link>
      </div>
    </div>
  );
}
