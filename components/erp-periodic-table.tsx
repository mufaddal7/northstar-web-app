"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  erpPeriodicCells,
  erpPeriodicColors,
  erpPeriodicElementCount,
  erpPeriodicFoundations,
  erpPeriodicGroups,
  erpPeriodicRecipes,
  erpPeriodicRows,
  type ErpPeriodicElement,
} from "@/lib/erp-periodic-table-data";
import { trackEvent } from "@/lib/analytics";
import styles from "./erp-periodic-table.module.css";

const solutionTabs = erpPeriodicRecipes.slice(1).map((recipe) => recipe.name);

type Tile = ErpPeriodicElement & {
  number: number;
  row: number;
  column: number;
  foundation?: boolean;
};

const tiles: Tile[] = [
  ...erpPeriodicCells.flatMap((row, rowIndex) =>
    row.map((element, column) => ({
      ...element,
      number: rowIndex * erpPeriodicGroups.length + column + 1,
      row: rowIndex,
      column,
    })),
  ),
  ...erpPeriodicFoundations.map((element, column) => ({
    ...element,
    number: erpPeriodicCells.flat().length + column + 1,
    row: erpPeriodicRows.length,
    column,
    foundation: true,
  })),
];

function isVisible(tile: Tile, recipeElements: string[]) {
  return recipeElements.length === 0 || recipeElements.includes(tile.symbol);
}

export function ErpPeriodicTable() {
  const [recipeName, setRecipeName] = useState(erpPeriodicRecipes[0].name);
  const [active, setActive] = useState<Tile | null>(null);
  const [shortlist, setShortlist] = useState<Set<string>>(new Set());

  const recipeElements = useMemo(
    () =>
      erpPeriodicRecipes.find((recipe) => recipe.name === recipeName)
        ?.elements ?? [],
    [recipeName],
  );

  function selectTile(tile: Tile) {
    setActive(tile);
    trackEvent("erp_periodic_element_click", {
      element_symbol: tile.symbol,
      element_name: tile.name,
      element_period: tile.foundation ? "foundation" : tile.row + 1,
      element_family: tile.foundation
        ? "Shared foundations"
        : erpPeriodicGroups[tile.column],
    });
  }

  function changeRecipe(value: string) {
    if (recipeName === value) {
      reset();
      return;
    }

    setRecipeName(value);
    trackEvent("erp_periodic_recipe_change", { recipe: value });
  }

  function toggleShortlist() {
    if (!active) return;
    setShortlist((current) => {
      const next = new Set(current);
      const action = next.has(active.symbol) ? "remove" : "add";
      if (next.has(active.symbol)) next.delete(active.symbol);
      else next.add(active.symbol);
      trackEvent("erp_periodic_shortlist_change", {
        element_symbol: active.symbol,
        action,
        shortlist_size: next.size,
      });
      return next;
    });
  }

  function reset() {
    setRecipeName(erpPeriodicRecipes[0].name);
    setActive(null);
    setShortlist(new Set());
    trackEvent("erp_periodic_reset");
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div>
          <div className={styles.brand}>ERP capability map</div>
          <h2 className={styles.title}>The Periodic Table of ERP</h2>
          <p className={styles.intro}>
            The building blocks of an intelligent enterprise. Select an
            element to explore its business value and build a shortlist for
            your next ERP conversation.
          </p>
        </div>
        <div className={styles.count}>
          <strong>{erpPeriodicElementCount}</strong>
          business elements
          <br />
          8 capability families
        </div>
      </header>

      <div className={styles.tools}>
        <div className={styles.solutionPicker}>
          <p className={styles.solutionLabel}>Explore by solution</p>
          <div
            aria-label="ERP solution types"
            className={styles.solutionTabs}
            role="tablist"
          >
            {solutionTabs.map((tab) => (
              <button
                aria-selected={recipeName === tab}
                className={`${styles.tab} ${recipeName === tab ? styles.tabActive : ""}`}
                key={tab}
                onClick={() => changeRecipe(tab)}
                role="tab"
                type="button"
              >
                <span>{tab}</span>
              </button>
            ))}
          </div>
        </div>
        <button className={styles.button} onClick={reset} type="button">
          Reset view & selection
        </button>
      </div>

      <div className={styles.scroll}>
        <div className={styles.matrix}>
          <div className={styles.head}>Period / family</div>
          {erpPeriodicGroups.map((group, index) => (
            <div
              className={styles.head}
              key={group}
              style={{ "--element-color": erpPeriodicColors[index] } as CSSProperties}
            >
              {index + 1} · {group}
            </div>
          ))}
          {erpPeriodicCells.map((row, rowIndex) => (
            <div className={styles.matrix} key={erpPeriodicRows[rowIndex]}>
              <div className={styles.rowName}>
                Period {rowIndex + 1}
                <strong>{erpPeriodicRows[rowIndex]}</strong>
              </div>
              {row.map((element, column) => {
                const tile = tiles.find((item) => item.symbol === element.symbol);
                if (!tile) return null;
                const visible = isVisible(tile, recipeElements);
                return (
                  <button
                    aria-label={`${element.symbol}: ${element.name}`}
                    aria-pressed={shortlist.has(element.symbol)}
                    className={`${styles.tile} ${rowIndex >= 4 ? styles.ai : ""} ${visible ? "" : styles.dim} ${active?.symbol === element.symbol ? styles.selected : ""} ${shortlist.has(element.symbol) ? styles.marked : ""}`}
                    key={element.symbol}
                    onClick={() => selectTile(tile)}
                    style={{ "--element-color": erpPeriodicColors[column] } as CSSProperties}
                    type="button"
                  >
                    <span className={styles.number}>
                      {String(tile.number).padStart(2, "0")}
                      <span>{rowIndex >= 4 ? "✧" : ""}</span>
                    </span>
                    <span className={styles.symbol}>{element.symbol}</span>
                    <span className={styles.name}>{element.name}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className={`${styles.matrix} ${styles.foundation}`}>
          <div className={styles.rowName}>
            Shared
            <strong>Foundations</strong>
          </div>
          {erpPeriodicFoundations.map((element, column) => {
            const tile = tiles.find((item) => item.symbol === element.symbol);
            if (!tile) return null;
            const visible = isVisible(tile, recipeElements);
            return (
              <button
                aria-label={`${element.symbol}: ${element.name}`}
                aria-pressed={shortlist.has(element.symbol)}
                className={`${styles.tile} ${visible ? "" : styles.dim} ${active?.symbol === element.symbol ? styles.selected : ""} ${shortlist.has(element.symbol) ? styles.marked : ""}`}
                key={element.symbol}
                onClick={() => selectTile(tile)}
                style={{ "--element-color": "#d8be88" } as CSSProperties}
                type="button"
              >
                <span className={styles.number}>{String(tile.number).padStart(2, "0")}</span>
                <span className={styles.symbol}>{element.symbol}</span>
                <span className={styles.name}>{element.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div aria-live="polite" className={styles.detail}>
        <div>
          <div className={styles.detailMeta}>
            {active
              ? `Element ${String(active.number).padStart(2, "0")} · ${
                  active.foundation
                    ? "Shared foundation"
                    : `${erpPeriodicGroups[active.column]} / ${erpPeriodicRows[active.row]}`
                }`
              : "Element explorer"}
          </div>
          <h3 className={styles.detailTitle}>
            {active ? `${active.symbol} · ${active.name}` : "Every element has a purpose."}
          </h3>
          <p className={styles.detailText}>
            {active
              ? active.description
              : "Choose a tile to reveal its business outcome. Build a shortlist of capabilities that matter to your organization."}
          </p>
        </div>
        <button
          className={styles.button}
          disabled={!active}
          onClick={toggleShortlist}
          type="button"
        >
          {active && shortlist.has(active.symbol)
            ? "Remove from shortlist"
            : "Add to shortlist"}
        </button>
      </div>

      <p className={styles.shortlist}>
        Shortlist ({shortlist.size}):{" "}
        {shortlist.size
          ? Array.from(shortlist)
              .map((symbol) => tiles.find((tile) => tile.symbol === symbol)?.name)
              .join(" · ")
          : "none yet."}
      </p>
      <div className={styles.footer}>
        <span>
          Columns = business families · Rows = capability maturity · Detached
          row = shared platform foundations
        </span>
        <span className={styles.legend}>
          ✧ Dashed tiles = intelligence / governed agentic action · ✓ =
          shortlisted
        </span>
      </div>
      <div className={styles.footer}>
        <span>
          Conceptual, vendor-neutral capability map. It is not a claim of
          out-of-the-box coverage or a fixed implementation sequence.
        </span>
        <span>Human approvals, permissions and audit apply to consequential actions.</span>
      </div>
    </div>
  );
}
