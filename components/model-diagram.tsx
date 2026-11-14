import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { pillars } from "@/lib/site-data";

export function ModelDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? "md:grid-cols-3" : "md:grid-cols-1"}`}>
      <div className="grid gap-3 md:col-span-3 md:grid-cols-3">
        {pillars.map((pillar) => (
          <Link
            className="group flex min-h-48 flex-col justify-between rounded-sm border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-lg sm:p-8"
            href={`/what-we-do/${pillar.slug}`}
            key={pillar.slug}
          >
            <span className="text-xs font-bold tracking-[0.15em] text-brand-gold">{pillar.number}</span>
            <div className="mt-8">
              <p className="font-display text-3xl">{pillar.name}</p>
              <span className="mt-2 block text-sm leading-6 text-muted">{pillar.statement}</span>
            </div>
            <ArrowUpRight className="mt-5 h-5 w-5 self-end text-brand-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        ))}
        <div className="flex min-h-32 items-center gap-5 rounded-sm bg-brand-navy p-6 text-white md:col-span-3">
          <span className="text-xs font-bold tracking-[0.15em] text-brand-gold-light">04</span>
          <div>
            <p className="font-display text-2xl">Business outcomes</p>
            <span className="mt-1 block text-sm text-white/70">Clarity, capability and progress.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
