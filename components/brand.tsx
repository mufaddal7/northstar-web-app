import Link from "next/link";
import Image from "next/image";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      className={`inline-flex shrink-0 items-center ${inverse ? "brand-logo-inverse" : ""}`}
      href="/"
      aria-label="Northstar home"
    >
      <Image
        alt=""
        aria-hidden="true"
        className="brand-logo-light h-8 w-auto sm:h-9"
        height={75}
        src="/Light%20Theme%20Logo.svg"
        width={435}
      />
      <Image
        alt=""
        aria-hidden="true"
        className="brand-logo-dark h-8 w-auto sm:h-9"
        height={75}
        src="/Dark%20theme%20logo.svg"
        width={438}
      />
    </Link>
  );
}
