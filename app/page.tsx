import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { ContactDialog } from "@/components/contact-dialog";
import { CtaBand } from "@/components/cta-band";
import { ImplementationJourney } from "@/components/implementation-journey";
import { ButtonLink, Eyebrow, Section, SectionHeading, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { WHATSAPP_URL } from "@/lib/site-data";

const pageTitle = "ERPNext Implementation & Business Systems";
const pageDescription =
  "Northstar helps businesses implement ERPNext around the way they work, connect core operations and build the digital capabilities they need next.";

export const metadata: Metadata = pageMetadata(
  pageTitle,
  pageDescription,
  "/",
);

const operatingAreas = [
  "Finance",
  "Sales & CRM",
  "Inventory",
  "Procurement",
  "Manufacturing",
  "Projects",
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
    eyebrow: "ERPNext",
    title: "Bring core operations together.",
    copy: "Plan an ERPNext implementation around your workflows, data, integrations and the people who will use it.",
    href: "/erpnext-implementation",
    link: "Explore ERPNext implementation",
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
    question: "Can Northstar help us decide if ERPNext is the right fit?",
    answer:
      "Yes. Start with the processes, reporting needs, integrations and constraints your team has today. We can help assess fit and identify the questions to resolve before committing to a rollout.",
  },
  {
    question: "Do you only work on ERPNext?",
    answer:
      "No. ERPNext is one way we help modernize operations. We also work across data and analytics, AI and automation, technology strategy and digital engineering.",
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
      <section className="relative isolate overflow-hidden bg-brand-navy py-16 text-white sm:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="absolute -right-36 -top-32 -z-10 h-[38rem] w-[38rem] rounded-full border border-white/10 sm:right-[-5rem]"
        >
          <div className="absolute inset-12 rounded-full border border-brand-gold/20" />
          <div className="absolute inset-28 rounded-full border border-brand-gold/30" />
          <div className="absolute inset-44 rounded-full border border-brand-gold/40" />
        </div>
        <Shell className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-3xl">
            <Eyebrow inverse>ERPNext implementation · Business transformation</Eyebrow>
            <h1 className="font-display text-4xl leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              ERPNext that helps your business{" "}
              <span className="text-brand-gold-light">run as one.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:mt-7 sm:text-lg sm:leading-8">
              Connect finance, sales, inventory and delivery in a system shaped
              around how your teams work. Start with the business problem, then
              build a practical path to implementation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ContactDialog
                label="Plan an ERPNext conversation"
                className="min-h-14 px-6"
              />
              <ButtonLink
                href="#services"
                secondary
                className="min-h-14 border-white/35"
              >
                Explore our services <ArrowUpRight />
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
            aria-label="Illustration of connected business operations"
            className="relative mx-auto w-full max-w-xl rounded-sm border border-white/15 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-7"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-light">
                  A connected operation
                </p>
                <p className="mt-1 font-display text-2xl">
                  One clearer view of work
                </p>
              </div>
              <span className="rounded-full border border-brand-gold/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-gold-light">
                ERPNext
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {operatingAreas.map((area, index) => (
                <div
                  className="flex min-h-20 items-center gap-3 rounded-sm border border-white/10 bg-brand-navy/70 p-3 sm:p-4"
                  key={area}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-bold text-brand-gold-light">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-white/85">
                    {area}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-white/15 pt-4 text-xs leading-5 text-white/55">
              The right scope depends on your processes, people and priorities.
            </p>
          </div>
        </Shell>
      </section>

      <Section tone="muted" className="py-8 sm:py-10">
        <Shell>
          <ul className="grid gap-5 text-sm sm:grid-cols-3 sm:gap-8">
            {[
              "Business-first process discovery",
              "Phased scope and visible decisions",
              "Adoption planned before go-live",
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
        </Shell>
      </Section>

      <Section id="implementation-process" tone="navy">
        <Shell>
          <SectionHeading
            inverse
            eyebrow="A practical implementation"
            title="A clear path from today’s process to a better one."
            copy="ERP projects work better when people understand the decisions, dependencies and next steps—not just the software screens."
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
        </Shell>
      </Section>

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

      <CtaBand
        title="Don’t start with a software demo. Start with the work."
        copy="Tell us where your current process is getting stuck. We’ll help you identify a practical next step—whether that is ERPNext or a different solution."
      />
    </>
  );
}
