import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { AgenticAiSection } from "@/components/agentic-ai-section";
import { ContactDialog } from "@/components/contact-dialog";
import { CtaBand } from "@/components/cta-band";
import { HomeBulletin } from "@/components/home-bulletin";
import { ImplementationJourney } from "@/components/implementation-journey";
import { ButtonLink, Eyebrow, Section, SectionHeading, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { WHATSAPP_URL } from "@/lib/site-data";

const pageTitle = "Business Transformation & Technology Services";
const pageDescription =
  "Northstar helps businesses modernize ERP and CRM systems, connect operational data, apply AI and automation, and build digital products around how teams work.";

export const metadata: Metadata = pageMetadata(
  pageTitle,
  pageDescription,
  "/",
);

const serviceHighlights = [
  {
    title: "ERP & business systems",
    copy: "Connect core operations",
    href: "/erp-implementation",
  },
  {
    title: "CRM & customer operations",
    copy: "Improve sales and service handoffs",
    href: "/what-we-do/modernize/crm-customer-operations",
  },
  {
    title: "Data, AI & automation",
    copy: "Turn information into useful action",
    href: "/what-we-do/intelligence",
  },
  {
    title: "Digital products & strategy",
    copy: "Build what your business needs next",
    href: "/what-we-do/build",
  },
] as const;

const challenges = [
  {
    title: "Work is split across too many tools",
    copy: "Teams repeat data entry, reconcile different versions and lose time to handoffs between disconnected systems.",
  },
  {
    title: "You can’t see what’s happening soon enough",
    copy: "Important questions about orders, stock, cash or delivery take too long to answer with confidence.",
  },
  {
    title: "The business has outgrown its old processes",
    copy: "Spreadsheets and workarounds helped you get here, but they make the next stage harder to manage.",
  },
] as const;

const capabilities = [
  {
    eyebrow: "ERP",
    title: "Bring core operations together.",
    copy: "Plan an ERP implementation around your workflows, information, integrations and the people who will use it.",
    href: "/erp-implementation",
    link: "Explore ERP implementation",
  },
  {
    eyebrow: "Data & AI",
    title: "Make information useful.",
    copy: "Connect trusted data to reporting, decisions and well-scoped automation opportunities.",
    href: "/what-we-do/intelligence",
    link: "Explore data and intelligence",
  },
  {
    eyebrow: "Digital products",
    title: "Build what your business needs next.",
    copy: "Shape technology strategy, integrations and digital experiences around real business priorities.",
    href: "/what-we-do/build",
    link: "Explore digital solutions",
  },
] as const;

const faqs = [
  {
    question: "Can Northstar help us choose an ERP?",
    answer:
      "Yes. Start with the processes, reporting needs, integrations and constraints your team has today. We can help assess what the business needs and identify the questions to resolve before choosing a platform.",
  },
  {
    question: "Do you only implement ERP systems?",
    answer:
      "No. We also work across CRM and customer operations, data and analytics, AI and automation, technology strategy and digital engineering.",
  },
  {
    question: "What should we prepare before an initial conversation?",
    answer:
      "A rough picture of the process that is hardest to manage is enough. You do not need a formal requirements document or a finished scope to start.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-navy py-12 text-white sm:py-14 lg:py-16">
        <div
          aria-hidden="true"
          className="absolute -right-36 -top-32 -z-10 h-[38rem] w-[38rem] rounded-full border border-white/10 sm:right-[-5rem]"
        >
          <div className="absolute inset-12 rounded-full border border-brand-gold/20" />
          <div className="absolute inset-28 rounded-full border border-brand-gold/30" />
          <div className="absolute inset-44 rounded-full border border-brand-gold/40" />
        </div>
        <Shell className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="max-w-3xl">
            <Eyebrow inverse>Business transformation · Technology services</Eyebrow>
            <h1 className="font-display text-4xl leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Make technology work for{" "}
              <span className="text-brand-gold-light">your business.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:mt-7 sm:text-lg sm:leading-8">
              From ERP and CRM to data, AI and digital products, we help you
              solve the right problems and deliver changes your teams can use.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ContactDialog
                label="Talk through your priorities"
                className="min-h-14 px-6"
              />
              <ButtonLink
                href="/what-we-do"
                secondary
                className="min-h-14 border-white/35"
              >
                Explore all services <ArrowUpRight />
              </ButtonLink>
            </div>
            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-white/55">
              <span>Prefer to speak directly?</span>
              <a className="font-semibold text-brand-gold-light hover:underline" href="tel:+916268535490">
                +91 62685 35490
              </a>
              <span aria-hidden="true">·</span>
              <a
                className="font-semibold text-brand-gold-light hover:underline"
                href={WHATSAPP_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
            </p>
          </div>

          <div
            aria-label="Overview of Northstar services"
            className="relative mx-auto w-full max-w-xl rounded-sm border border-white/15 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-7"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-light">
                  Connected capabilities
                </p>
                <p className="mt-1 font-display text-2xl">
                  Support for the work ahead
                </p>
              </div>
              <span className="rounded-full border border-brand-gold/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-gold-light">
                Northstar
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {serviceHighlights.map((service, index) => (
                <Link
                  className="group flex min-h-24 flex-col justify-between rounded-sm border border-white/10 bg-brand-navy/70 p-3 transition-colors hover:border-brand-gold/50 sm:p-4"
                  href={service.href}
                  key={service.title}
                >
                  <span className="flex items-center justify-between text-[10px] font-bold text-brand-gold-light">
                    0{index + 1}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold leading-5 text-white/90 sm:text-sm">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-[10px] leading-4 text-white/55 sm:text-xs">
                      {service.copy}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-4 border-t border-white/15 pt-4 text-xs leading-5 text-white/55">
              Start with the challenge. We’ll help you find the right next step.
            </p>
          </div>
        </Shell>
      </section>

      <Section tone="muted" className="py-8 sm:py-10">
        <Shell>
          <ul className="grid gap-5 text-sm sm:grid-cols-3 sm:gap-8">
            {[
              "Business-first thinking",
              "Clear priorities and practical delivery",
              "Solutions shaped around your teams",
            ].map((item) => (
              <li className="flex items-center gap-3 font-semibold" key={item}>
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full bg-brand-gold"
                />
                {item}
              </li>
            ))}
          </ul>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHeading
            eyebrow="A familiar turning point"
            title="When growth outpaces the systems behind it."
            copy="If routine work depends on manual follow-up and disconnected information, it may be time to rethink how the operation fits together."
          />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {challenges.map((challenge, index) => (
              <article
                className="rounded-sm border border-border p-6 sm:p-7"
                key={challenge.title}
              >
                <span className="text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-5 font-display text-2xl leading-tight">
                  {challenge.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {challenge.copy}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-sm border border-brand-gold/35 bg-surface-muted p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                Not sure where to start?
              </p>
              <p className="mt-2 font-display text-2xl">
                Take our six-question modernization scan.
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Get a score, a clear view of your strengths and priorities, and
                practical next steps shaped around your answers.
              </p>
            </div>
            <Link
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-brand-gold px-5 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-light"
              href="/maturity-scan"
            >
              Run the scan <ArrowUpRight />
            </Link>
          </div>
        </Shell>
      </Section>

      <Section id="implementation-process" tone="navy">
        <Shell>
          <SectionHeading
            inverse
            eyebrow="A practical implementation"
            title="A clear path from today’s process to a better one."
            copy="ERP projects run more smoothly when people understand the decisions, dependencies and next steps, not just how to use the software."
          />
          <div className="mt-12 rounded-sm bg-surface p-5 text-foreground sm:p-8 lg:p-10">
            <ImplementationJourney />
          </div>
          <Link
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline"
            href="/how-we-work"
          >
            See how we work <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <Section id="services">
        <Shell>
          <SectionHeading
            eyebrow="Beyond one implementation"
            title="The right support for your next business challenge."
            copy="ERP is one part of a connected technology landscape. Bring in the capabilities you need now, and keep a clear path for what comes next."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {capabilities.map((capability, index) => (
              <article
                className="flex flex-col rounded-sm border border-border p-6 sm:p-8"
                key={capability.title}
              >
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                  0{index + 1} · {capability.eyebrow}
                </span>
                <h3 className="mt-6 font-display text-2xl leading-tight">
                  {capability.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                  {capability.copy}
                </p>
                <Link
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
                  href={capability.href}
                >
                  {capability.link} <ArrowUpRight />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Not sure whether you need ERP or CRM?
            </p>
            <Link
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
              href="/erp-vs-crm"
            >
              Compare ERP and CRM <ArrowUpRight />
            </Link>
          </div>
        </Shell>
      </Section>

      <AgenticAiSection />

      <Section tone="muted">
        <Shell className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Make the change manageable</Eyebrow>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.035em] sm:text-5xl">
              Good implementation is about more than configuration.
            </h2>
            <p className="mt-5 leading-7 text-muted">
              The system is only useful when the process, information and
              people around it are ready to work together.
            </p>
            <ContactDialog
              className="mt-7"
              label="Talk through your challenge"
            />
          </div>
          <div className="divide-y divide-border border-y border-border">
            {[
              [
                "Start with fit",
                "Separate essential business needs from habits that can be simplified.",
              ],
              [
                "Protect the data",
                "Plan ownership, cleanup, migration and validation before cutover.",
              ],
              [
                "Prepare the people",
                "Bring users into decisions, practice and change readiness early.",
              ],
              [
                "Plan for what follows",
                "Treat launch as a milestone, with support and improvements still ahead.",
              ],
            ].map(([title, copy], index) => (
              <article className="flex gap-5 py-5" key={title}>
                <span className="pt-1 text-xs font-bold tracking-widest text-brand-gold">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading
            eyebrow="Questions before you begin"
            title="Start with the questions that matter."
          />
          <div className="divide-y divide-border border-y border-border">
            {faqs.map(({ question, answer }) => (
              <details className="group py-5" key={question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold marker:hidden">
                  {question}
                  <span
                    aria-hidden="true"
                    className="text-xl text-brand-gold transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </Shell>
      </Section>

      <HomeBulletin />

      <CtaBand
        title="Don’t start with a software demo. Start with the work."
        copy="Tell us where your current process is getting stuck. We’ll help you find a practical next step, whether that means ERP or another solution."
      />
    </>
  );
}
