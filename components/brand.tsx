import Link from "next/link";
import { CompassMark } from "@/components/icons";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      className={`inline-flex shrink-0 items-center gap-1 font-display text-xl font-bold tracking-[0.08em] sm:text-2xl ${inverse ? "text-white" : "text-foreground"}`}
      href="/"
      aria-label="Northstar home"
    >
      <span>NORTHST</span>
      <CompassMark className="h-6 w-6 text-brand-gold sm:h-7 sm:w-7" />
      <span>R</span>
    </Link>
  );
}
