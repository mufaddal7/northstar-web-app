import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "default" | "muted" | "navy" | "slate";
type ShellWidth = "default" | "narrow" | "medium";
type PageHeroSize = "compact" | "default" | "spacious";

const shellWidths: Record<ShellWidth, string> = {
  default: "max-w-[1440px]",
  narrow: "max-w-3xl",
  medium: "max-w-6xl",
};

const sectionTones: Record<Tone, string> = {
  default: "bg-surface text-foreground",
  muted: "bg-surface-muted text-foreground",
  navy: "bg-brand-navy text-white",
  slate: "bg-brand-slate text-white",
};

const pageHeroSizes: Record<PageHeroSize, string> = {
  compact: "py-[clamp(3rem,5vw,5rem)]",
  default: "py-[clamp(4rem,7vw,7rem)]",
  spacious: "py-[clamp(5rem,9vw,9rem)]",
};

export function Shell({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: ShellWidth;
}) {
  return (
    <div
      className={`mx-auto w-full px-[clamp(1.25rem,4vw,4rem)] ${shellWidths[width]} ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  tone = "default",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-[clamp(3.5rem,6vw,6.5rem)] ${sectionTones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  inverse = false,
}: {
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <p className={`mb-4 text-xs font-bold uppercase tracking-[0.16em] ${inverse ? "text-brand-gold-light" : "text-brand-gold"}`}>
      {children}
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  dark = false,
  size = "compact",
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  dark?: boolean;
  size?: PageHeroSize;
}) {
  return (
    <section className={`relative overflow-hidden ${pageHeroSizes[size]} ${dark ? "bg-brand-navy text-white" : "bg-surface-muted text-foreground"}`}>
      <Shell className="relative z-10" width="medium">
        <Eyebrow inverse={dark}>{eyebrow}</Eyebrow>
        <h1 className="max-w-5xl font-display text-[clamp(2.5rem,4.5vw,5rem)] leading-[1.05] tracking-[-0.04em]">
          {title}
        </h1>
        <p className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${dark ? "text-white/75" : "text-muted"}`}>
          {description}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </Shell>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  inverse?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[clamp(2rem,3.4vw,4.25rem)] leading-tight tracking-[-0.035em]">
        {title}
      </h2>
      {copy ? (
        <p className={`mt-5 max-w-2xl leading-7 ${inverse ? "text-white/70" : "text-muted"}`}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  secondary = false,
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-offset-4 ${secondary ? "border border-current text-current hover:bg-white/10" : "bg-brand-gold text-brand-navy hover:bg-brand-gold-light"} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`rounded-sm border border-border bg-surface p-6 sm:p-8 ${className}`}>
      {children}
    </article>
  );
}
