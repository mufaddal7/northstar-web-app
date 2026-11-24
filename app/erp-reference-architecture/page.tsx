import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { ErpReferenceArchitecture } from "@/components/erp-reference-architecture";
import { ButtonLink, PageHero, Section, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "ERP Reference Architecture",
  "Explore a conceptual ERP reference architecture showing the ERP core, connected plugins, platform services and experience channels.",
  "/erp-reference-architecture",
);

export default function ErpReferenceArchitecturePage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="ERP reference architecture"
        title="A connected ERP operating model."
        description="Use this conceptual blueprint to discuss how business capabilities, extensions, platform services and user channels fit together before implementation scope is confirmed."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/erp-modules">
            Explore ERP modules <ArrowUpRight />
          </ButtonLink>
          <ButtonLink href="/erp-implementation" secondary className="border-white/30 text-white hover:bg-white/10">
            Plan an implementation <ArrowUpRight />
          </ButtonLink>
        </div>
      </PageHero>

      <Section className="py-12 sm:py-16 lg:py-20">
        <ErpReferenceArchitecture />
      </Section>

      <Section tone="muted">
        <Shell className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
              Continue with the detail
            </p>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Move from the blueprint to module-level decisions.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Review practical module definitions, packaging patterns and
              connected plugin groupings in the ERP module guide.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-bold transition-colors hover:border-brand-gold hover:bg-surface"
            href="/erp-modules"
          >
            Open ERP module guide <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <CtaBand title="Need help shaping your ERP architecture?" />
    </>
  );
}
