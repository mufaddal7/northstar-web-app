import { ArrowUpRight } from "@/components/icons";
import {
  type ErpModuleGroup,
  type ModulePackaging,
} from "@/lib/erp-module-data";

const packagingStyles: Record<ModulePackaging, string> = {
  "Core in many suites": "bg-brand-navy text-white",
  "Core in manufacturing ERP": "bg-brand-navy text-white",
  "Common extension": "bg-brand-gold/15 text-foreground",
  "Often adjacent": "bg-surface-muted text-muted",
  "Emerging capability": "border border-dashed border-brand-gold bg-surface text-foreground",
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
          <div className="grid gap-2 sm:grid-cols-2">
            {group.modules.map((module) => (
              <details
                className="group rounded-sm border border-border bg-surface"
                key={module.name}
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 marker:hidden">
                  <span className="min-w-0 font-semibold leading-5">
                    {module.name}
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <PackagingBadge value={module.packaging} />
                    <ArrowUpRight className="h-4 w-4 rotate-45 text-brand-gold transition-transform group-open:rotate-[225deg]" />
                  </span>
                </summary>
                <div className="border-t border-border px-4 pb-4 pt-3">
                  <p className="text-sm leading-6 text-muted">
                    {module.description}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-muted">
                    Also known as:{" "}
                    <span className="text-foreground">
                      {module.keywords.join(" · ")}
                    </span>
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
