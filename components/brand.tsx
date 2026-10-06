import Link from "next/link";
import { CompassMark } from "@/components/icons";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      className={`brand ${inverse ? "brand--inverse" : ""}`}
      href="/"
      aria-label="Northstar home"
    >
      <span className="brand__word">NORTHST</span>
      <CompassMark className="brand__mark" />
      <span className="brand__word">R</span>
    </Link>
  );
}
