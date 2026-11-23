import { erpModuleGroups, type ErpModuleGroup } from "@/lib/erp-module-data";
import { SectionHeading } from "@/components/ui";

type GroupStyle = {
  accent: string;
  surface: string;
  ink: string;
  darkSurface: string;
  darkInk: string;
};

const groupStyles: Record<string, GroupStyle> = {
  finance: {
    accent: "border-[#c58a09] bg-[#fff7df] text-[#624400]",
    surface: "bg-[#fffdf5]",
    ink: "text-[#624400]",
    darkSurface: "dark:bg-[#4a3505]/40",
    darkInk: "dark:text-[#ffe7a0]",
  },
  "supply-chain": {
    accent: "border-[#24804b] bg-[#eaf8ef] text-[#124d2c]",
    surface: "bg-[#f8fffa]",
    ink: "text-[#124d2c]",
    darkSurface: "dark:bg-[#124d2c]/45",
    darkInk: "dark:text-[#b7f2c9]",
  },
  manufacturing: {
    accent: "border-[#d86618] bg-[#fff0e6] text-[#77320e]",
    surface: "bg-[#fffaf6]",
    ink: "text-[#77320e]",
    darkSurface: "dark:bg-[#77320e]/40",
    darkInk: "dark:text-[#ffd0b5]",
  },
  customer: {
    accent: "border-[#2672c8] bg-[#eaf3ff] text-[#123f78]",
    surface: "bg-[#f8fbff]",
    ink: "text-[#123f78]",
    darkSurface: "dark:bg-[#123f78]/45",
    darkInk: "dark:text-[#b9d8ff]",
  },
  "people-projects": {
    accent: "border-[#c43d62] bg-[#fff0f4] text-[#741d38]",
    surface: "bg-[#fffafd]",
    ink: "text-[#741d38]",
    darkSurface: "dark:bg-[#741d38]/45",
    darkInk: "dark:text-[#ffc0d0]",
  },
  emerging: {
    accent: "border-[#7544a8] bg-[#f3edff] text-[#422166]",
    surface: "bg-[#fcfaff]",
    ink: "text-[#422166]",
    darkSurface: "dark:bg-[#422166]/45",
    darkInk: "dark:text-[#dec7ff]",
  },
};

const experienceChannels = [
  "Customer portal",
  "Sales & CRM",
  "Supplier portal",
  "Mobile workforce",
];

const platformServices = [
  "Workflow & approvals",
  "API & integrations",
  "Identity & access",
  "BI & dashboards",
  "Audit & compliance",
];

const plugins = [
  "WMS",
  "TMS",
  "MES",
  "PLM",
  "Tax engine",
  "EDI",
  "E-commerce",
  "Document management",
];

export function ErpReferenceArchitecture() {
  const leftGroups = erpModuleGroups.slice(0, 3);
  const rightGroups = erpModuleGroups.slice(3);

  return (
    <section aria-labelledby="erp-reference-architecture-title">
      <div className="mx-auto w-full max-w-[1800px] px-[clamp(1.25rem,4vw,4rem)]">
        <SectionHeading
          eyebrow="Reference architecture"
          title="Every business capability, connected to the core."
          copy="A practical ERP blueprint: customer demand enters through the experience layer, every function shares one system of record, and specialist plugins extend the platform without creating disconnected islands."
        />

        <figure className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#cfd4df] bg-[#f8fafc] p-4 shadow-[0_30px_90px_rgb(12_19_42_/_0.12)] dark:border-white/15 dark:bg-[#10182e] sm:p-6 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(197_160_89_/_0.16),transparent_28%),radial-gradient(circle_at_10%_90%,rgb(38_114_200_/_0.12),transparent_26%),radial-gradient(circle_at_90%_15%,rgb(117_68_168_/_0.1),transparent_24%)]"
          />

          <figcaption className="relative flex flex-col gap-3 border-b border-[#cfd4df] pb-6 dark:border-white/15 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                Northstar ERP blueprint
              </p>
              <h2
                className="mt-2 max-w-3xl font-display text-3xl leading-tight tracking-[-0.035em] sm:text-5xl"
                id="erp-reference-architecture-title"
              >
                One shared source of truth.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              <span className="rounded-full border border-border bg-surface px-3 py-1.5">
                6 domains
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1.5">
                33 modules
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1.5">
                API-ready
              </span>
            </div>
          </figcaption>

          <div className="relative mt-7">
            <FlowLines />

            <LayerLabel label="Experience & channels" detail="Where demand enters the operation" />
            <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {experienceChannels.map((channel) => (
                <div
                  className="rounded-xl border-2 border-[#243d72] bg-[#eaf0ff] px-3 py-3 text-center text-xs font-bold text-[#132c5b] shadow-sm dark:border-[#7da5ff] dark:bg-[#162b55] dark:text-[#e3edff]"
                  key={channel}
                >
                  {channel}
                </div>
              ))}
            </div>

            <div className="relative my-4 flex justify-center lg:my-7" aria-hidden="true">
              <span className="erp-architecture-mobile-arrow text-brand-gold">↓</span>
            </div>

            <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,1.3fr)_minmax(0,1fr)] lg:gap-8">
              <div className="grid gap-4">
                {leftGroups.map((group) => (
                  <ModuleDomain group={group} key={group.id} />
                ))}
              </div>

              <CoreSystem />

              <div className="grid gap-4">
                {rightGroups.map((group) => (
                  <ModuleDomain group={group} key={group.id} />
                ))}
              </div>
            </div>

            <div className="relative my-4 flex justify-center lg:my-7" aria-hidden="true">
              <span className="erp-architecture-mobile-arrow text-brand-gold">↓</span>
            </div>

            <LayerLabel label="Platform services" detail="Controls, insight and connectivity across every module" />
            <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {platformServices.map((service) => (
                <div
                  className="rounded-xl border-2 border-[#287a9f] bg-[#e8f7fb] px-3 py-3 text-center text-xs font-bold text-[#12465c] shadow-sm dark:border-[#68c8e8] dark:bg-[#103b4d] dark:text-[#d4f4ff]"
                  key={service}
                >
                  {service}
                </div>
              ))}
            </div>

            <div className="relative mt-6 rounded-2xl border-2 border-dashed border-[#b78217] bg-[#fff8e6] p-4 dark:border-[#e2bd62] dark:bg-[#3c2d0b] sm:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6208] dark:text-[#f3d37e]">
                    Plugins & connected applications
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-[#4e3707] dark:text-[#fff1bf]">
                    Extend the ERP where specialist depth matters.
                  </h3>
                </div>
                <p className="max-w-md text-sm leading-6 text-[#705a2b] dark:text-[#f5dfaa]/75">
                  Connect through APIs, events and approved integration
                  patterns while keeping ownership and master data clear.
                </p>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Common ERP plugins">
                {plugins.map((plugin) => (
                  <li
                    className="rounded-full border border-[#c9962c] bg-white px-3 py-1.5 text-xs font-bold text-[#634606] shadow-sm dark:border-[#e2bd62] dark:bg-[#59420d] dark:text-[#fff0bb]"
                    key={plugin}
                  >
                    {plugin}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#cfd4df] pt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-muted dark:border-white/15">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-8 rounded-full bg-[#c58a09]" /> Finance
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-8 rounded-full bg-[#24804b]" /> Supply chain
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-8 rounded-full bg-[#d86618]" /> Operations
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-8 rounded-full bg-[#2672c8]" /> Customer
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-8 rounded-full bg-[#c43d62]" /> People
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-8 rounded-full bg-[#7544a8]" /> Emerging
            </span>
          </div>
          <p className="relative mt-3 text-xs leading-5 text-muted">
            Conceptual reference architecture. Module boundaries, integration
            choices and plugin scope should be confirmed against the operating
            model, platform and regulatory requirements.
          </p>
        </figure>
      </div>
    </section>
  );
}

function LayerLabel({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="relative mb-3 flex flex-wrap items-baseline justify-between gap-2">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="text-xs text-muted">{detail}</p>
    </div>
  );
}

function ModuleDomain({ group }: { group: ErpModuleGroup }) {
  const style = groupStyles[group.id];

  return (
    <section className={`relative rounded-2xl border-2 p-4 shadow-sm ${style.accent} ${style.darkSurface} ${style.darkInk}`}>
      <div className="flex items-start justify-between gap-3 border-b border-current/20 pb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-70">
            Module domain
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight">{group.name}</h3>
        </div>
        <span className="rounded-full border border-current/25 px-2 py-1 text-[10px] font-bold">
          {group.modules.length}
        </span>
      </div>
      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {group.modules.map((module) => (
          <li
            className={`rounded-lg border border-current/15 ${style.surface} px-2.5 py-2 text-[11px] font-bold leading-4 ${style.ink} ${style.darkSurface} ${style.darkInk}`}
            key={module.name}
          >
            {module.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CoreSystem() {
  return (
    <section className="relative flex flex-col rounded-2xl border-2 border-[#b98724] bg-[#111c3b] p-5 text-white shadow-[0_18px_50px_rgb(12_19_42_/_0.28)] dark:border-[#e0bd67] dark:bg-[#0b1229] sm:p-6">
      <div className="flex items-start justify-between gap-3 border-b border-white/20 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f0cf7b]">
            ERP core
          </p>
          <h3 className="mt-1 font-display text-3xl leading-tight">
            System of record
          </h3>
        </div>
        <span className="rounded-full border border-[#e0bd67] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f0cf7b]">
          Core
        </span>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {[
          ["Master data", "Customers · suppliers · items · employees"],
          ["Transaction engine", "Orders · invoices · receipts · journals"],
          ["Financial control", "GL · AP · AR · tax · close"],
          ["Operational control", "Workflow · approvals · audit trail"],
        ].map(([title, detail]) => (
          <div className="rounded-xl border border-white/15 bg-white/[0.08] p-3" key={title}>
            <p className="text-sm font-bold text-white">{title}</p>
            <p className="mt-1 text-xs leading-5 text-white/65">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f0cf7b]">
          Shared data. Shared rules. Shared visibility.
        </p>
      </div>
    </section>
  );
}

function FlowLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[8.5rem] z-0 hidden h-[38rem] w-full lg:block"
      preserveAspectRatio="none"
      viewBox="0 0 1200 620"
    >
      <defs>
        <marker id="erp-arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
          <path d="M0,0 L8,4 L0,8 z" fill="#b88725" />
        </marker>
      </defs>
      <path className="erp-architecture-flow erp-architecture-flow--navy" d="M600 0 V52" />
      <path className="erp-architecture-flow erp-architecture-flow--gold" d="M600 560 V620" />
      <path className="erp-architecture-flow erp-architecture-flow--gold" d="M250 115 H475" />
      <path className="erp-architecture-flow erp-architecture-flow--green" d="M250 310 H475" />
      <path className="erp-architecture-flow erp-architecture-flow--orange" d="M250 505 H475" />
      <path className="erp-architecture-flow erp-architecture-flow--blue" d="M950 115 H725" />
      <path className="erp-architecture-flow erp-architecture-flow--red" d="M950 310 H725" />
      <path className="erp-architecture-flow erp-architecture-flow--purple" d="M950 505 H725" />
    </svg>
  );
}
