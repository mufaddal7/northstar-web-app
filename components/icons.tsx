import type { SVGProps } from "react";

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" {...props}><path d="M5 19 19 5M8 5h11v11" /></svg>;
}

export function CompassMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="m20 3 15 34h-4.6L20 13.8 9.6 37H5L20 3Z" fill="currentColor" /></svg>;
}

export function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3a9 9 0 1 0 9 9c0-.55-.05-1.08-.14-1.6A7.2 7.2 0 0 1 13.6 3.14 8.2 8.2 0 0 0 12 3Z" /></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
}
