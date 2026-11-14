import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";
import { CtaBand } from "@/components/cta-band";
import { PageHero, Section, Shell, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { BOOKING_URL, WHATSAPP_URL } from "@/lib/site-data";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "Tell Northstar what you are trying to achieve and start a conversation about where technology can make the greatest difference.",
  "/contact",
);

const contactLinks = [
  ["Email", "hello@northstar53.com", "mailto:hello@northstar53.com"],
  ["Phone", "+91 62685 35490", "tel:+916268535490"],
  ["WhatsApp", "Send a message", WHATSAPP_URL],
  ["Meeting", "Book a 30-minute conversation", BOOKING_URL],
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Contact"
        title={<>Let&apos;s find your <span className="text-brand-gold-light">Northstar.</span></>}
        description="Tell us what you’re trying to achieve. We’ll help you identify where technology can make the greatest difference."
      />
      <Section>
        <Shell className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>Start here</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">A focused conversation can clarify the next move.</h2>
            <p className="mt-4 leading-7 text-muted">Share the context behind your challenge. We’ll respond with a practical conversation, not a sales script.</p>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {contactLinks.map(([label, text, href]) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex items-center justify-between gap-4 py-4 text-sm hover:text-brand-gold">
                  <span><span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted">{label}</span>{text}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Tell us about it</Eyebrow>
            <ContactForm />
          </div>
        </Shell>
      </Section>
      <CtaBand title="We’re ready when you are." />
    </>
  );
}
