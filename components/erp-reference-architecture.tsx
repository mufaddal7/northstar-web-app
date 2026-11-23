import { erpModuleGroups, type ErpModuleGroup } from "@/lib/erp-module-data";
import { SectionHeading } from "@/components/ui";

type DomainStyle = {
  border: string;
  surface: string;
  ink: string;
  badge: string;
};

const domainStyles: Record<string, DomainStyle> = {
  finance: {
    border: "#b47d00",
    surface: "#fff5d6",
    ink: "#5b4100",
    badge: "#f2d98c",
  },
  "supply-chain": {
    border: "#218449",
    surface: "#e5f7eb",
    ink: "#104b2b",
    badge: "#bce4c9",
  },
  manufacturing: {
    border: "#d45d16",
    surface: "#ffede1",
    ink: "#71300f",
    badge: "#f5c5a6",
  },
  customer: {
    border: "#216fc3",
    surface: "#e7f1ff",
    ink: "#123e75",
    badge: "#c5dcfa",
  },
  "people-projects": {
    border: "#c33e65",
    surface: "#ffedf2",
    ink: "#721b37",
    badge: "#f5c2d0",
  },
  emerging: {
    border: "#7040a5",
    surface: "#f0e9ff",
    ink: "#402061",
    badge: "#d7c4f4",
  },
};

const experienceItems = [
  "Customer portal",
  "Sales & CRM (Customer Relationship Management)",
  "Supplier portal",
  "Mobile workforce",
  "Chat Bot & AI assistant",
  "WhatsApp & Messaging",
  "Call center & service center",
];

const platformItems = [
  "Workflow & approvals (Business Process Management)",
  "API & integrations (Application Programming Interface)",
  "Identity & access (Identity and Access Management)",
  "BI & dashboards (Business Intelligence)",
  "Audit & compliance (Governance, Risk & Compliance)",
];

const pluginItems = [
  "WMS (Warehouse Management System)",
  "TMS (Transportation Management System)",
  "MES (Manufacturing Execution System)",
  "PLM (Product Lifecycle Management)",
  "Tax engine (Tax Management)",
  "EDI (Electronic Data Interchange)",
  "E-commerce (Digital Commerce)",
  "Document management (Enterprise Content Management)",
];

export function ErpReferenceArchitecture() {
  return (
    <section aria-labelledby="erp-reference-architecture-title">
      <div className="mx-auto w-full max-w-[1900px] px-[clamp(1rem,3vw,3rem)]">
        <SectionHeading
          eyebrow="Reference architecture"
          title="A connected ERP operating model."
          copy="Every business capability lives inside one ERP core. Platform services and specialist plugins extend it without fragmenting the operation."
        />

        <figure className="mt-9 overflow-hidden rounded-[1.75rem] border border-[#263554] bg-[#0f1931] p-3 text-white shadow-[0_24px_70px_rgb(12_19_42_/_0.24)] sm:p-5 lg:p-7">
          <figcaption className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e2bd67]">
                Northstar ERP blueprint
              </p>
              <h2
                className="mt-1 font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl"
                id="erp-reference-architecture-title"
              >
                One source of truth, many connected capabilities.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/65">
              <span className="rounded-full border border-white/15 px-3 py-1.5">
                6 domains
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1.5">
                33 modules
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1.5">
                Connected flow
              </span>
            </div>
          </figcaption>

          <div className="mx-auto max-w-[1500px]">
            <ArchitecturePanel
              accent="#2774c8"
              items={experienceItems}
              title="Experience & channels"
            />

            <VerticalConnector color="#2774c8" />

            <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1.65fr)_2.5rem_minmax(17rem,0.72fr)]">
              <CorePanel />

              <HorizontalConnector color="#b98724" />

              <PluginPanel />
            </div>

            <VerticalConnector color="#b98724" />

            <ArchitecturePanel
              accent="#287a9f"
              items={platformItems}
              title="Platform services"
              variant="platform"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">
            {Object.entries(domainStyles).map(([name, style]) => (
              <span className="flex items-center gap-2" key={name}>
                <span
                  className="h-2.5 w-8 rounded-full"
                  style={{ backgroundColor: style.border }}
                />
                {name === "people-projects" ? "People & projects" : name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-white/50">
            Conceptual reference architecture. Module boundaries, integrations
            and plugin scope should be confirmed against the operating model,
            platform and regulatory requirements.
          </p>
        </figure>
      </div>
    </section>
  );
}

function CorePanel() {
  return (
    <section className="rounded-[1.1rem] border-2 border-[#b98724] bg-[#111c3b] p-3 shadow-[0_14px_38px_rgb(0_0_0_/_0.2)] sm:p-4">
      <div className="flex items-start justify-between gap-3 border-b border-white/15 pb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0cf7b]">
            System of record
          </p>
          <h3 className="mt-1 font-display text-3xl leading-none">ERP core</h3>
        </div>
        <span className="rounded-full border border-[#e0bd67] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f0cf7b]">
          33 modules
        </span>
      </div>
      <p className="mt-3 max-w-3xl text-[11px] leading-4 text-white/65">
        Shared master data, transaction processing, financial control,
        workflow, approvals and audit trail keep the operating model aligned.
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {erpModuleGroups.map((group) => (
          <DomainPanel group={group} key={group.id} />
        ))}
      </div>

      <p className="mt-3 border-t border-white/15 pt-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] leading-3 text-[#f0cf7b]">
        Shared data · shared rules · shared visibility
      </p>
    </section>
  );
}

function DomainPanel({ group }: { group: ErpModuleGroup }) {
  const style = domainStyles[group.id];

  return (
    <section
      className="rounded-lg border p-2.5"
      style={{
        backgroundColor: style.surface,
        borderColor: style.border,
        color: style.ink,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-display text-[1.05rem] leading-tight">
          {group.name}
        </h4>
        <span
          className="shrink-0 rounded-full border border-current/20 px-1.5 py-0.5 text-[9px] font-bold"
          style={{ backgroundColor: style.badge }}
        >
          {group.modules.length}
        </span>
      </div>
      <ul className="mt-2 grid grid-cols-2 gap-1">
        {group.modules.map((module) => (
          <li
            className="flex min-h-7 items-center rounded border border-current/15 bg-white/70 px-1.5 py-1 text-[8px] font-bold leading-3"
            key={module.name}
          >
            {module.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ArchitecturePanel({
  accent,
  items,
  title,
  variant = "experience",
}: {
  accent: string;
  items: string[];
  title: string;
  variant?: "experience" | "platform";
}) {
  return (
    <section
      className="rounded-[1rem] border-2 bg-[#e8f3ff] p-3 text-[#132c5b] shadow-[0_8px_24px_rgb(0_0_0_/_0.12)] sm:p-4"
      style={{ borderColor: accent }}
    >
      <h3 className="text-center font-display text-2xl leading-tight">
        {title}
      </h3>
      <ul
        className={`mt-3 grid gap-1.5 ${
          variant === "experience"
            ? "grid-cols-2 lg:grid-cols-4"
            : "grid-cols-2 lg:grid-cols-5"
        }`}
      >
        {items.map((item) => (
          <li
            className="flex min-h-9 items-center justify-center rounded-md border border-[#b8c9dc] bg-white/75 px-2 py-1.5 text-center text-[9px] font-bold leading-3"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function PluginPanel() {
  return (
    <section className="rounded-[1rem] border-2 border-[#b98724] bg-[#fff5d6] p-3 text-[#5b4100] shadow-[0_8px_24px_rgb(0_0_0_/_0.12)] sm:p-4">
      <h3 className="text-center font-display text-2xl leading-tight">
        Plugins & connected applications
      </h3>
      <p className="mt-2 text-center text-[11px] leading-4 text-[#765f2a]">
        Approved extensions connected through APIs, events and integration
        patterns.
      </p>
      <ul className="mt-3 grid gap-1.5">
        {pluginItems.map((item) => (
          <li
            className="flex min-h-8 items-center justify-center rounded-md border border-[#dcc990] bg-white/75 px-2 py-1.5 text-center text-[9px] font-bold leading-3"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function VerticalConnector({ color }: { color: string }) {
  return (
    <div aria-hidden="true" className="flex h-8 justify-center">
      <span
        className="h-full border-l-2 border-dashed"
        style={{ borderColor: color }}
      />
    </div>
  );
}

function HorizontalConnector({ color }: { color: string }) {
  return (
    <div aria-hidden="true" className="hidden items-center justify-center lg:flex">
      <span
        className="w-full border-t-2 border-dashed"
        style={{ borderColor: color }}
      />
    </div>
  );
}
