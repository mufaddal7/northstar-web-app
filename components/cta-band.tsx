import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { BOOKING_URL } from "@/lib/site-data";

export function CtaBand({ title = "Ready to move forward?", copy = "Tell us what you’re trying to achieve. We’ll help you identify where technology can make the greatest difference." }: { title?: string; copy?: string }) {
  return <section className="cta-band"><div className="shell cta-band__inner"><div><p className="eyebrow">Start a conversation</p><h2>{title}</h2><p>{copy}</p></div><div className="cta-band__actions"><Link className="button button--gold" href="/contact">Start a conversation <ArrowUpRight/></Link><a className="button button--outline-on-dark" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a 30-minute conversation <ArrowUpRight/></a></div></div></section>;
}
