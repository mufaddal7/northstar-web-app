import {
  erpModuleGroups,
  type ModulePackaging,
} from "@/lib/erp-module-data";

const packagingStyles: Record<ModulePackaging, string> = {
  "Core in many suites": "border-brand-navy bg-brand-navy text-white",
  "Core in manufacturing ERP": "border-brand-navy bg-brand-navy text-white",
  "Common extension": "border-brand-gold/60 bg-brand-gold/10 text-foreground",
  "Often adjacent": "border-border bg-surface-muted text-muted",
  "Emerging capability":
    "border-dashed border-brand-gold bg-surface text-foreground",
};

function PackagingBadge({ value }: { value: ModulePackaging }) {
  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold leading-4 ${packagingStyles[value]}`}
    >
      {value}
    </span>
  );
}

export function ErpModuleReference() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-sm border border-border md:block">
        <table className="w-full table-fixed border-collapse bg-surface text-left text-sm">
          <caption className="sr-only">
            ERP modules grouped by business function, what they manage, and how
            they are commonly packaged.
          </caption>
          <colgroup>
            <col className="w-[30%]" />
            <col className="w-[49%]" />
            <col className="w-[21%]" />
          </colgroup>
          <thead className="bg-brand-navy text-left text-white">
            <tr>
              <th className="p-4 font-semibold" scope="col">
                Module or capability
              </th>
              <th className="p-4 font-semibold" scope="col">
                What it helps manage
              </th>
              <th className="p-4 font-semibold" scope="col">
                Common packaging
              </th>
            </tr>
          </thead>
          {erpModuleGroups.map((group) => (
            <tbody className="divide-y divide-border" key={group.id}>
              <tr className="bg-surface-muted">
                <th
                  className="px-4 pb-1 pt-5 font-display text-lg"
                  colSpan={3}
                  scope="rowgroup"
                >
                  {group.name}
                </th>
              </tr>
              <tr className="bg-surface-muted">
                <td
                  className="px-4 pb-4 text-xs leading-5 text-muted"
                  colSpan={3}
                >
                  {group.description}
                </td>
              </tr>
              {group.modules.map((module) => (
                <tr className="align-top" key={module.name}>
                  <th className="p-4 font-semibold" scope="row">
                    {module.name}
                  </th>
                  <td className="p-4 leading-6 text-muted">
                    {module.description}
                  </td>
                  <td className="p-4">
                    <PackagingBadge value={module.packaging} />
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <div className="space-y-8 md:hidden">
        {erpModuleGroups.map((group) => (
          <section aria-labelledby={`module-group-${group.id}`} key={group.id}>
            <div className="mb-4">
              <h3
                className="font-display text-2xl"
                id={`module-group-${group.id}`}
              >
                {group.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {group.description}
              </p>
            </div>
            <ul className="space-y-3">
              {group.modules.map((module) => (
                <li
                  className="rounded-sm border border-border bg-surface p-4"
                  key={module.name}
                >
                  <h4 className="font-display text-lg leading-snug">
                    {module.name}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {module.description}
                  </p>
                  <div className="mt-3">
                    <PackagingBadge value={module.packaging} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
