import { ArrowUpRight } from "@/components/icons";
import {
  erpModuleGroups,
  type ErpModuleGroup,
  type ModulePackaging,
} from "@/lib/erp-module-data";
import { erpArchitecturePlugins } from "@/lib/erp-architecture-data";

const packagingStyles: Record<ModulePackaging, string> = {
  "Core in many suites": "bg-brand-navy text-white",
  "Core in manufacturing ERP": "bg-brand-navy text-white",
  "Common extension": "bg-brand-gold/15 text-foreground",
  "Often adjacent": "bg-surface-muted text-muted",
  "Emerging capability":
    "border border-dashed border-brand-gold bg-surface text-foreground",
};

const groupAccents: Record<string, string> = {
  finance: "#b47d00",
  "supply-chain": "#218449",
  manufacturing: "#d45d16",
  customer: "#216fc3",
  "people-projects": "#c33e65",
  emerging: "#7040a5",
};

const coreGroupStyles: Record<
  string,
  { border: string; surface: string; ink: string }
> = {
  finance: { border: "#b47d00", surface: "#fff5d6", ink: "#5b4100" },
  "supply-chain": { border: "#218449", surface: "#e5f7eb", ink: "#104b2b" },
  manufacturing: { border: "#d45d16", surface: "#ffede1", ink: "#71300f" },
  customer: { border: "#216fc3", surface: "#e7f1ff", ink: "#123e75" },
  "people-projects": { border: "#c33e65", surface: "#ffedf2", ink: "#721b37" },
  emerging: { border: "#7040a5", surface: "#f0e9ff", ink: "#402061" },
};

function PackagingBadge({ value }: { value: ModulePackaging }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2 py-1 text-[0.65rem] font-semibold leading-4 ${packagingStyles[value]}`}
    >
      {value}
    </span>
  );
}

export function ErpCoreOverview({ groups = erpModuleGroups }: { groups?: ErpModuleGroup[] }) {
  return (
    <section
      aria-labelledby="erp-core-overview-title"
      className="rounded-[1.25rem] border-2 border-[#b98724] bg-[#111c3b] p-4 text-white shadow-[0_18px_44px_rgb(12_19_42_/_0.2)] sm:p-6 lg:p-8 mt-4"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0cf7b]">
            System of record
          </p>
          <h2
            className="mt-1 font-display text-3xl leading-none sm:text-4xl"
            id="erp-core-overview-title"
          >
            ERP core
          </h2>
        </div>
        <span className="rounded-full border border-[#e0bd67] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#f0cf7b]">
          {groups.reduce((count, group) => count + group.modules.length, 0)} modules
        </span>
      </div>
      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/65">
        Shared master data, transaction processing, financial control,
        workflow, approvals and audit trail keep the operating model aligned.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => {
          const style = coreGroupStyles[group.id];

          return (
            <article
              className="rounded-lg border p-3"
              key={group.id}
              style={{
                backgroundColor: style.surface,
                borderColor: style.border,
                color: style.ink,
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-[1.05rem] leading-tight">
                  {group.name}
                </h3>
                <span className="shrink-0 rounded-full border border-current/20 px-1.5 py-0.5 text-[9px] font-bold">
                  {group.modules.length}
                </span>
              </div>
              <ul className="mt-2 grid grid-cols-2 gap-1">
                {group.modules.map((module) => (
                  <li
                    className="flex min-h-9 items-center rounded border border-current/15 bg-white/70 px-1.5 py-1 text-[9px] font-bold leading-3"
                    key={module.name}
                  >
                    {module.name}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <p className="mt-5 border-t border-white/15 pt-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] leading-4 text-[#f0cf7b]">
        Shared data · shared rules · shared visibility
      </p>
    </section>
  );
}

export function ErpModuleReference({ groups }: { groups: ErpModuleGroup[] }) {
  if (groups.length === 0) {
    return (
      <p className="border border-border bg-surface-muted p-6 text-sm leading-6 text-muted">
        No modules match these filters. Try a broader search or clear the
        filters.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border border-y border-border">
      {groups.map((group) => (
        <section
          aria-labelledby={`module-group-${group.id}`}
          className="py-6"
          key={group.id}
        >
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h3
              className="font-display text-2xl leading-tight"
              id={`module-group-${group.id}`}
              style={{ color: groupAccents[group.id] }}
            >
              {group.name}
            </h3>
            <span className="text-xs text-muted">
              {group.modules.length}{" "}
              {group.modules.length === 1 ? "module" : "modules"}
            </span>
          </div>
          <p className="mb-4 max-w-3xl text-sm leading-6 text-muted">
            {group.description}
          </p>
          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
              <thead className="bg-surface-muted text-xs uppercase tracking-[0.12em] text-muted">
                <tr>
                  <th className="border-b border-border px-4 py-3 font-bold">Module</th>
                  <th className="border-b border-border px-4 py-3 font-bold">Typical packaging</th>
                  <th className="border-b border-border px-4 py-3 font-bold">What it covers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {group.modules.map((module) => (
                  <tr className="align-top" key={module.name}>
                    <td className="px-4 py-4 font-semibold text-foreground">
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-start gap-2 marker:hidden">
                          <span>{module.name}</span>
                          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 rotate-45 text-brand-gold transition-transform group-open:rotate-[225deg]" />
                        </summary>
                        <p className="mt-2 max-w-sm text-xs font-normal leading-5 text-muted">
                          Also known as:{" "}
                          <span className="text-foreground">{module.keywords.join(" · ")}</span>
                        </p>
                      </details>
                    </td>
                    <td className="px-4 py-4">
                      <PackagingBadge value={module.packaging} />
                    </td>
                    <td className="px-4 py-4 leading-6 text-muted">{module.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {erpArchitecturePlugins[group.id]?.length ? (
            <details className="mt-3 rounded-sm border border-dashed border-brand-gold/60 bg-brand-gold/5">
              <summary className="cursor-pointer list-none px-4 py-3 text-sm font-bold text-foreground marker:hidden">
                Expand connected plugins for {group.name}
              </summary>
              <div className="grid gap-2 border-t border-brand-gold/20 p-3 sm:grid-cols-2 lg:grid-cols-3">
                {erpArchitecturePlugins[group.id].map((plugin) => (
                  <div className="border border-border bg-surface px-3 py-3" key={plugin.name}>
                    <p className="font-semibold">{plugin.name}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{plugin.description}</p>
                  </div>
                ))}
              </div>
            </details>
          ) : null}
        </section>
      ))}
    </div>
  );
}
