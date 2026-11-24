"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import {
  ErpCoreOverview,
  ErpModuleReference,
} from "@/components/erp-module-reference";
import {
  erpModuleGroups,
  type ModulePackaging,
} from "@/lib/erp-module-data";

const packagingOptions = [
  "Core in many suites",
  "Core in manufacturing ERP",
  "Common extension",
  "Often adjacent",
  "Emerging capability",
] as const satisfies readonly ModulePackaging[];

const totalModules = erpModuleGroups.reduce(
  (count, group) => count + group.modules.length,
  0,
);

export function ErpModuleExplorer() {
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [packagingFilter, setPackagingFilter] = useState("all");

  const filteredGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return erpModuleGroups
      .filter((group) => groupFilter === "all" || group.id === groupFilter)
      .map((group) => ({
        ...group,
        modules: group.modules.filter((module) => {
          const matchesPackaging =
            packagingFilter === "all" ||
            module.packaging === packagingFilter;
          const searchableText = [
            group.name,
            module.name,
            module.description,
            ...module.keywords,
          ]
            .join(" ")
            .toLowerCase();
          const matchesQuery =
            normalizedQuery.length === 0 ||
            searchableText.includes(normalizedQuery);

          return matchesPackaging && matchesQuery;
        }),
      }))
      .filter((group) => group.modules.length > 0);
  }, [groupFilter, packagingFilter, query]);

  const visibleModules = filteredGroups.reduce(
    (count, group) => count + group.modules.length,
    0,
  );
  const hasFilters =
    query.length > 0 ||
    groupFilter !== "all" ||
    packagingFilter !== "all";

  function clearFilters() {
    setQuery("");
    setGroupFilter("all");
    setPackagingFilter("all");
  }

  return (
    <div>
      <ErpCoreOverview />

      <div className="mt-12 max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
          How to use this index
        </p>
        <h2 className="font-display text-3xl leading-tight sm:text-4xl">
          Start with the capability, not the vendor menu.
        </h2>
        <p className="mt-4 leading-7 text-muted">
          ERP products use different labels and bundle capabilities in
          different editions. These category and module names follow common
          industry language. Open any row to see what it covers and the terms
          you may encounter in product documentation.
        </p>
        <Link
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
          href="/erp-reference-architecture"
        >
          View the full reference architecture <ArrowUpRight />
        </Link>
      </div>

      <section
        aria-labelledby="erp-module-reference-title"
        className="mt-12"
        tabIndex={-1}
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
              ERP module index
            </p>
            <h2
              className="mt-2 font-display text-2xl leading-tight sm:text-3xl"
              id="erp-module-reference-title"
            >
              Find the right business capability.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted">
            Select a category or open a module for its detail and common
            abbreviations.
          </p>
        </div>

        <div className="rounded-sm border border-border bg-surface-muted p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,1fr))]">
            <div>
              <label
                className="text-xs font-semibold text-foreground"
                htmlFor="erp-module-search"
              >
                Search modules and keywords
              </label>
              <input
                autoComplete="off"
                className="mt-1 min-h-11 w-full rounded-sm border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
                id="erp-module-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try inventory, EPM or work orders"
                type="search"
                value={query}
              />
            </div>
            <div>
              <label
                className="text-xs font-semibold text-foreground"
                htmlFor="erp-module-group"
              >
                Business group
              </label>
              <select
                className="mt-1 min-h-11 w-full rounded-sm border border-border bg-surface px-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
                id="erp-module-group"
                onChange={(event) => setGroupFilter(event.target.value)}
                value={groupFilter}
              >
                <option value="all">All groups</option>
                {erpModuleGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="text-xs font-semibold text-foreground"
                htmlFor="erp-module-packaging"
              >
                Common packaging
              </label>
              <select
                className="mt-1 min-h-11 w-full rounded-sm border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
                id="erp-module-packaging"
                onChange={(event) => setPackagingFilter(event.target.value)}
                value={packagingFilter}
              >
                <option value="all">All packaging</option>
                {packagingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <nav aria-label="ERP module categories" className="mt-4 flex flex-wrap gap-2">
            <button
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${groupFilter === "all" ? "border-brand-navy bg-brand-navy text-white" : "border-border bg-surface text-muted hover:border-brand-gold hover:text-foreground"}`}
              onClick={() => setGroupFilter("all")}
              type="button"
            >
              All categories
            </button>
            {erpModuleGroups.map((group) => (
              <button
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${groupFilter === group.id ? "border-brand-navy bg-brand-navy text-white" : "border-border bg-surface text-muted hover:border-brand-gold hover:text-foreground"}`}
                key={group.id}
                onClick={() => setGroupFilter(group.id)}
                type="button"
              >
                {group.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <p aria-live="polite" className="text-sm text-muted">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {visibleModules}
            </span>{" "}
            of {totalModules} modules
          </p>
          <button
            className="min-h-10 rounded-sm px-3 text-sm font-semibold text-brand-gold underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasFilters}
            onClick={clearFilters}
            type="button"
          >
            Clear filters
          </button>
        </div>

        <ErpModuleReference groups={filteredGroups} />
      </section>
    </div>
  );
}
