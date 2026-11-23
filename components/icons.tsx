import type { SVGProps } from "react";

export function ArrowUpRight({
  className = "h-4 w-4 shrink-0",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

export function CompassMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path d="m20 3 15 34h-4.6L20 13.8 9.6 37H5L20 3Z" fill="currentColor" />
    </svg>
  );
}

export function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a9 9 0 1 0 9 9c0-.55-.05-1.08-.14-1.6A7.2 7.2 0 0 1 13.6 3.14 8.2 8.2 0 0 0 12 3Z"
      />
    </svg>
  ) : (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function EmpathyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M16 26.5S5.5 20.7 5.5 12.8A5.3 5.3 0 0 1 16 11.2a5.3 5.3 0 0 1 10.5 1.6C26.5 20.7 16 26.5 16 26.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M10.5 15.5h2.7l1.2-2.2 2.2 4.4 1.6-2.2h3.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <circle cx="16" cy="16" r="11.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.8 16h22.4M16 4.5c3 3.1 4.5 6.9 4.5 11.5S19 24.4 16 27.5C13 24.4 11.5 20.6 11.5 16S13 7.6 16 4.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function CommunityIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <circle cx="16" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="8.5" cy="16.5" r="2.7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="23.5" cy="16.5" r="2.7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.2 25.5c.7-3.8 2.6-5.8 5.8-5.8s5.1 2 5.8 5.8M5.2 24c.3-2.6 1.4-4.1 3.3-4.1 1.1 0 2 .4 2.7 1.2M26.8 24c-.3-2.6-1.4-4.1-3.3-4.1-1.1 0-2 .4-2.7 1.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ForwardDeployedIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M6 23.5 16 6l10 17.5H6Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M11 20h10M13.5 15.5h5M16 11v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
