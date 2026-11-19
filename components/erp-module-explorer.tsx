"use client";

import { useMemo, useState } from "react";
import { ErpModuleReference } from "@/components/erp-module-reference";
import { ErpModuleWordMap } from "@/components/erp-module-word-map";
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

  function selectWord(term: string) {
    setQuery((current) =>
      current.toLowerCase() === term.toLowerCase() ? "" : term,
    );
    setGroupFilter("all");
    setPackagingFilter("all");
  }

  function clearFilters() {
    setQuery("");
    setGroupFilter("all");
    setPackagingFilter("all");
  }

  return (
    <div className="mt-8">
      <ErpModuleWordMap activeTerm={query} onSelectTerm={selectWord} />

      <section
        aria-labelledby="erp-module-reference-title"
        className="mt-10"
        id="module-reference"
        tabIndex={-1}
      >
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
            Grouped module reference
          </p>
          <h2
            className="mt-2 font-display text-2xl leading-tight sm:text-3xl"
            id="erp-module-reference-title"
          >
            Browse and filter ERP modules.
          </h2>
        </div>

        <div className="grid gap-3 rounded-sm border border-border bg-surface-muted p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
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
              className="mt-1 min-h-11 w-full rounded-sm border border-border bg-surface px-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
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
