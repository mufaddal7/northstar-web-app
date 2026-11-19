"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Brand } from "@/components/brand";
import { ContactDialog } from "@/components/contact-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { pillars } from "@/lib/site-data";

type MenuLink = {
  label: string;
  href: string;
};

type MenuColumn = {
  title: string;
  href?: string;
  links: MenuLink[];
};

type MenuGroup = {
  id: string;
  label: string;
  columns: MenuColumn[];
  overview?: MenuLink;
  featured?: MenuLink[];
};

const menuGroups: MenuGroup[] = [
  {
    id: "services",
    label: "Services",
    overview: { label: "Explore all services", href: "/what-we-do" },
    featured: [
      {
        label: "Business maturity scan",
        href: "/maturity-scan",
      },
      {
        label: "ERPNext implementation",
        href: "/erp-implementation/erpnext",
      },
      {
        label: "ERP architecture & security",
        href: "/erp-architecture-data-security",
      },
      { label: "ERP comparisons", href: "/compare" },
      { label: "ERP vs CRM", href: "/erp-vs-crm" },
    ],
    columns: pillars.map((pillar) => ({
      title: pillar.name,
      href: `/what-we-do/${pillar.slug}`,
      links: pillar.services.map((service) => ({
        label: service.title,
        href: `/what-we-do/${pillar.slug}/${service.slug}`,
      })),
    })),
  },
  {
    id: "company",
    label: "Company",
    columns: [
      {
        title: "About Northstar",
        links: [
          { label: "About", href: "/about" },
          { label: "Case studies", href: "/case-studies" },
          { label: "News", href: "/news" },
        ],
      },
      {
        title: "Get in touch",
        links: [{ label: "Contact", href: "/contact" }],
      },
    ],
  },
];

const mobileLinks = [
  { label: "ERP", href: "/erp-implementation" },
  { label: "ERP architecture & security", href: "/erp-architecture-data-security" },
  { label: "ERP comparisons", href: "/compare" },
  { label: "Business maturity scan", href: "/maturity-scan" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "News", href: "/news" },
  { label: "Newsletter", href: "/#newsletter" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopPanelId = useId();
  const mobilePanelId = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileExpanded(null);
        setActiveMenu(null);
      }
    }

    function onResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setMobileOpen(false);
        setMobileExpanded(null);
      }
      setActiveMenu(null);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const selectedMenu = menuGroups.find(({ id }) => id === activeMenu);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileExpanded(null);
  }

  function handleMouseLeave() {
    setActiveMenu(null);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div
        className="relative mx-auto flex min-h-[72px] w-full max-w-[1280px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setActiveMenu(null);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setActiveMenu(null);
          }
        }}
        onMouseLeave={handleMouseLeave}
        ref={headerRef}
      >
        <div
          onFocus={() => setActiveMenu(null)}
          onMouseEnter={() => setActiveMenu(null)}
        >
          <Brand />
        </div>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex lg:gap-3"
        >
          <Link
            className="rounded-sm px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted hover:text-brand-gold focus-visible:bg-surface-muted"
            href="/erp-implementation"
            onClick={() => setActiveMenu(null)}
            onFocus={() => setActiveMenu(null)}
            onMouseEnter={() => setActiveMenu(null)}
          >
            ERP
          </Link>
          {menuGroups
            .filter(({ id }) => id === "services")
            .map((menu) => (
              <MenuTrigger
                active={activeMenu === menu.id}
                desktopPanelId={desktopPanelId}
                key={menu.id}
                menu={menu}
                onActivate={() => setActiveMenu(menu.id)}
              />
            ))}
          <Link
            className="rounded-sm px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted hover:text-brand-gold focus-visible:bg-surface-muted"
            href="/how-we-work"
            onClick={() => setActiveMenu(null)}
            onFocus={() => setActiveMenu(null)}
            onMouseEnter={() => setActiveMenu(null)}
          >
            How we work
          </Link>
          <Link
            className="rounded-sm px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted hover:text-brand-gold focus-visible:bg-surface-muted"
            href="/industries"
            onClick={() => setActiveMenu(null)}
            onFocus={() => setActiveMenu(null)}
            onMouseEnter={() => setActiveMenu(null)}
          >
            Industries
          </Link>
          <Link
            className="rounded-sm px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted hover:text-brand-gold focus-visible:bg-surface-muted"
            href="/insights"
            onClick={() => setActiveMenu(null)}
            onFocus={() => setActiveMenu(null)}
            onMouseEnter={() => setActiveMenu(null)}
          >
            Insights
          </Link>
          {menuGroups
            .filter(({ id }) => id === "company")
            .map((menu) => (
              <MenuTrigger
                active={activeMenu === menu.id}
                desktopPanelId={desktopPanelId}
                key={menu.id}
                menu={menu}
                onActivate={() => setActiveMenu(menu.id)}
              />
            ))}
        </nav>

        <div
          className="flex items-center gap-3"
          onFocus={() => setActiveMenu(null)}
          onMouseEnter={() => setActiveMenu(null)}
        >
          <ThemeToggle />
          <ContactDialog
            className="hidden min-h-10 px-4 py-2 text-xs xl:inline-flex"
            label="Let's talk"
          />
          <button
            aria-controls={mobilePanelId}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-sm border border-border text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
          >
            <span
              className={`h-0.5 w-5 bg-current transition-transform ${
                mobileOpen ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-transform ${
                mobileOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        <div
          aria-hidden={!activeMenu}
          className={`absolute left-1/2 top-full z-40 max-h-[min(70vh,620px)] w-[min(92vw,960px)] -translate-x-1/2 overflow-y-auto rounded-sm border border-border bg-surface p-5 shadow-xl transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none sm:p-7 ${
            activeMenu
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0"
          }`}
          id={desktopPanelId}
        >
          {selectedMenu ? (
            <MenuContent
              menu={selectedMenu}
              onNavigate={() => setActiveMenu(null)}
            />
          ) : null}
        </div>

        {mobileOpen ? (
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-10 cursor-default bg-brand-navy/25 backdrop-blur-[1px] lg:hidden"
            onClick={closeMobileMenu}
            type="button"
          />
        ) : null}

        <nav
          aria-hidden={!mobileOpen}
          aria-label="Mobile navigation"
          className={`fixed right-0 top-[72px] z-30 h-[calc(100dvh-72px)] w-[min(88vw,380px)] overflow-y-auto border-l border-border bg-surface p-5 shadow-xl transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
            mobileOpen
              ? "visible opacity-100"
              : "invisible opacity-0"
          }`}
          id={mobilePanelId}
        >
          <div className="mb-3">
            {mobileLinks.map((link) => (
              <Link
                className="block rounded-sm px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
                href={link.href}
                key={link.href}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="divide-y divide-border border-y border-border">
            {menuGroups.map((menu) => {
              const expanded = mobileExpanded === menu.id;
              const sectionId = `${mobilePanelId}-${menu.id}`;
              return (
                <section key={menu.id}>
                  <button
                    aria-controls={sectionId}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between gap-4 px-3 py-4 text-left text-sm font-semibold text-foreground"
                    onClick={() =>
                      setMobileExpanded(expanded ? null : menu.id)
                    }
                    type="button"
                  >
                    {menu.label}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    aria-hidden={!expanded}
                    className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                      expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                    id={sectionId}
                  >
                    <div className="overflow-hidden">
                      <div className={expanded ? "visible" : "invisible"}>
                        <MenuContent
                          menu={menu}
                          onNavigate={closeMobileMenu}
                          mobile
                        />
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}

function MenuTrigger({
  menu,
  active,
  desktopPanelId,
  onActivate,
}: {
  menu: MenuGroup;
  active: boolean;
  desktopPanelId: string;
  onActivate: () => void;
}) {
  return (
    <button
      aria-controls={desktopPanelId}
      aria-expanded={active}
      className="inline-flex items-center gap-1.5 rounded-sm px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted hover:text-brand-gold focus-visible:bg-surface-muted"
      onClick={onActivate}
      onFocus={onActivate}
      onMouseEnter={onActivate}
      type="button"
    >
      {menu.label}
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-200 ${
          active ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

function MenuContent({
  menu,
  onNavigate,
  mobile = false,
}: {
  menu: MenuGroup;
  onNavigate: () => void;
  mobile?: boolean;
}) {
  return (
    <div>
      {menu.overview ? (
        <Link
          className={`mb-4 inline-flex rounded-sm px-2 py-2 text-sm font-semibold text-brand-gold transition-colors hover:bg-surface-muted ${
            mobile ? "w-full" : ""
          }`}
          href={menu.overview.href}
          onClick={onNavigate}
        >
          {menu.overview.label}
        </Link>
      ) : null}
      {menu.featured?.length ? (
        <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-4">
          <span className="px-2 text-xs font-semibold text-muted">
            Also explore
          </span>
          {menu.featured.map((link) => (
            <Link
              className="rounded-sm px-2 py-1 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted hover:text-brand-gold"
              href={link.href}
              key={link.href}
              onClick={onNavigate}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
      <div
        className={`grid gap-5 ${
          mobile
            ? "grid-cols-1"
            : menu.columns.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {menu.columns.map((column) => (
          <div key={column.title}>
            {column.href ? (
              <Link
                className="mb-2 block rounded-sm px-2 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-gold hover:bg-surface-muted"
                href={column.href}
                onClick={onNavigate}
              >
                {column.title}
              </Link>
            ) : (
              <p className="mb-2 px-2 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-gold">
                {column.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    className="block rounded-sm px-2 py-2 text-sm leading-5 text-foreground transition-colors hover:bg-surface-muted hover:text-brand-gold focus-visible:bg-surface-muted"
                    href={link.href}
                    onClick={onNavigate}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChevronDown({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
