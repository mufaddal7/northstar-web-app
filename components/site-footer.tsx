import Link from "next/link";
import { Brand } from "@/components/brand";
import { NewsletterForm } from "@/components/newsletter-form";
import { Shell } from "@/components/ui";
import { BOOKING_URL, WHATSAPP_URL } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-brand-slate py-[clamp(3.5rem,6vw,6rem)] text-white/75">
      <Shell>
        <div
          className="mb-12 grid scroll-mt-24 gap-5 rounded-sm border border-white/15 bg-white/[0.04] p-5 sm:grid-cols-[0.85fr_1.15fr] sm:items-center sm:p-6"
          id="newsletter"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-gold-light">
              Northstar bulletin
            </p>
            <h2 className="mt-2 font-display text-2xl text-white">
              News and insights, in your inbox.
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Occasional perspectives on business systems, data and
              technology.
            </p>
          </div>
          <NewsletterForm source="footer" variant="footer" />
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Brand inverse />
            <p className="mt-4 max-w-xs text-sm leading-6">Transform what matters. Build what&apos;s next.</p>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-brand-gold-light">What we do</p>
            <Link href="/erp-implementation">ERP implementation</Link>
            <Link href="/erp-modules">ERP modules</Link>
            <Link href="/erp-architecture-data-security">ERP architecture &amp; security</Link>
            <Link href="/what-is-erp">What is ERP?</Link>
            <Link href="/compare">ERP comparisons</Link>
            <Link href="/erp-vs-crm">ERP vs CRM</Link>
            <Link href="/what-we-do/modernize">Modernize</Link>
            <Link href="/what-we-do/intelligence">Intelligence</Link>
            <Link href="/what-we-do/build">Build</Link>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-brand-gold-light">Company</p>
            <Link href="/how-we-work">How we work</Link>
            <Link href="/industries">Industries</Link>
            <Link href="/case-studies">Case studies</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/news">News</Link>
            <Link href="/about">About</Link>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-brand-gold-light">Connect</p>
            <a href="mailto:hello@northstar53.com">hello@northstar53.com</a>
            <a href="tel:+916268535490">+91 62685 35490</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a 30-minute conversation
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Northstar.</span>
          <span className="flex gap-5">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </Shell>
    </footer>
  );
}
