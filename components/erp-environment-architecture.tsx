import { Eyebrow } from "@/components/ui";

const environments = [
  {
    name: "Development",
    description:
      "Build and configure with synthetic or appropriately masked test data.",
  },
  {
    name: "UAT",
    description:
      "User acceptance testing: business users validate workflows, permissions and expected outcomes.",
  },
  {
    name: "Staging",
    description:
      "Rehearse the approved release and check integrations before deployment.",
  },
] as const;

const clients = ["Client A", "Client B"] as const;

export function ErpEnvironmentArchitecture() {
  return (
    <figure
      aria-labelledby="erp-environment-architecture-title"
      className="my-10 rounded-sm border border-border bg-surface-muted p-5 sm:p-8"
    >
      <figcaption className="max-w-3xl">
        <Eyebrow>Reference architecture</Eyebrow>
        <h2
          className="font-display text-2xl leading-tight sm:text-3xl"
          id="erp-environment-architecture-title"
        >
          Test changes away from live work. Keep each client&apos;s production
          data separate.
        </h2>
        <p className="mt-3 leading-7 text-muted">
          Releases move through separate non-production environments. Only
          approved application changes are promoted; production records stay in
          their client&apos;s isolated environment.
        </p>
      </figcaption>

      <div className="mt-7 border border-border bg-surface p-4 sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
              Change pipeline
            </p>
            <h3 className="mt-2 font-display text-xl">
              Non-production environments
            </h3>
          </div>
          <p className="text-sm leading-6 text-muted">
            Test and review without writing to live records.
          </p>
        </div>
        <ol
          aria-label="Development, user acceptance testing and staging environments"
          className="mt-5 grid gap-4 md:grid-cols-3"
        >
          {environments.map((environment, index) => (
            <li
              className="relative min-w-0 border border-border bg-surface-muted p-4 sm:p-5"
              key={environment.name}
            >
              <span className="text-xs font-bold tracking-widest text-brand-gold">
                0{index + 1}
              </span>
              <h4 className="mt-3 font-display text-xl">
                {environment.name}
              </h4>
              <p className="mt-2 text-sm leading-6 text-muted">
                {environment.description}
              </p>
              {index < environments.length - 1 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-brand-gold md:hidden"
                  >
                    ↓
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -right-4 top-4 z-10 hidden text-lg font-bold text-brand-gold md:block"
                  >
                    →
                  </span>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col items-center py-4 text-center">
        <span aria-hidden="true" className="text-xl text-brand-gold">
          ↓
        </span>
        <p className="mt-1 text-sm font-bold text-foreground">
          Reviewed release with an approved deployment step
        </p>
        <span aria-hidden="true" className="mt-1 text-xl text-brand-gold">
          ↓
        </span>
      </div>

      <section
        aria-labelledby="production-boundaries-title"
        className="border border-brand-gold/40 bg-brand-navy p-4 text-white sm:p-6"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold-light">
              Production boundary
            </p>
            <h3
              className="mt-2 font-display text-xl"
              id="production-boundaries-title"
            >
              Separate live environment for each client
            </h3>
          </div>
          <p className="text-sm leading-6 text-white/70">
            No shared production database between clients.
          </p>
        </div>
        <ul
          aria-label="Separate client production environments"
          className="mt-5 grid gap-4 md:grid-cols-2"
        >
          {clients.map((client) => (
            <li
              className="border border-white/20 bg-white/[0.05] p-4 sm:p-5"
              key={client}
            >
              <h4 className="font-display text-lg">{client} production</h4>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <span className="border border-white/15 p-3">
                  ERP application
                </span>
                <span className="border border-brand-gold/40 bg-brand-gold/10 p-3">
                  Dedicated production database
                </span>
              </div>
              <p className="mt-3 text-xs leading-5 text-white/70">
                Separate production records and access boundary
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4 border border-brand-gold/30 bg-brand-gold/10 p-4 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
          Optional, scope-specific control
        </p>
        <h3 className="mt-2 font-display text-lg">
          End-to-end encryption for supported data flows
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          Where the ERP platform and workflow allow it, encryption and key
          handling can be designed so only approved endpoints can decrypt
          selected records. This is assessed alongside integrations, reporting,
          search, backups and recovery.
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-muted">
        Conceptual architecture. Environment topology, platform capabilities,
        access controls and encryption scope are confirmed for each
        implementation.
      </p>
    </figure>
  );
}
