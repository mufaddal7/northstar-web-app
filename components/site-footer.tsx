import Link from "next/link";
import { Brand } from "@/components/brand";
import { BOOKING_URL, WHATSAPP_URL } from "@/lib/site-data";

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell"><div className="footer-grid"><div className="footer-brand"><Brand inverse/><p>Transform what matters. Build what&apos;s next.</p></div><div><p className="footer-label">What we do</p><Link href="/what-we-do/modernize">Modernize</Link><Link href="/what-we-do/intelligence">Intelligence</Link><Link href="/what-we-do/build">Build</Link></div><div><p className="footer-label">Company</p><Link href="/how-we-work">How we work</Link><Link href="/industries">Industries</Link><Link href="/case-studies">Case studies</Link><Link href="/insights">Insights</Link><Link href="/about">About</Link></div><div><p className="footer-label">Connect</p><a href="mailto:hello@northstar53.com">hello@northstar53.com</a><a href="tel:+916268535490">+91 62685 35490</a><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a 30-minute conversation</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Northstar.</span><span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></span></div></div></footer>;
}
