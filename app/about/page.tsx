import type { Metadata } from "next";
import {
  CommunityIcon,
  EmpathyIcon,
  ForwardDeployedIcon,
  GlobeIcon,
} from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { PageHero, Section, SectionHeading, Shell, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "About Northstar",
  "Northstar makes empathetic technology practical, accessible and useful for businesses, their people and their communities.",
  "/about",
);

const commitments = [
  {
    icon: EmpathyIcon,
    eyebrow: "Empathetic technology",
    title: "Start with people, not platforms.",
    copy: "We listen to the people doing the work, understand the decisions behind it and design technology that earns trust through usefulness.",
  },
  {
    icon: GlobeIcon,
    eyebrow: "Accessible by design",
    title: "Make good technology available to more businesses.",
    copy: "Our eventual goal is simple: make thoughtful, capable technology accessible to organizations of every size, wherever they are building.",
  },
  {
    icon: CommunityIcon,
    eyebrow: "Give back",
    title: "Contribute beyond the project.",
    copy: "We are committed to sharing knowledge, supporting open source and investing time in the communities that make better technology possible.",
  },
  {
    icon: ForwardDeployedIcon,
    eyebrow: "Forward-deployed people",
    title: "Stay close to the outcome.",
    copy: "Our people are not only engineers. They work alongside customers from discovery through adoption, improvement and measurable business success.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="About Northstar"
        title={
          <>
            Technology with a human point of view.
          </>
        }
        description="Northstar helps businesses move forward with technology that is practical, empathetic and built around the people who make the business work."
      >
        <p className="max-w-2xl text-sm leading-6 text-white/60">
          We believe the best technology is not the most impressive thing in
          the room. It is the thing that helps people do their best work.
        </p>
      </PageHero>

      <Section>
        <Shell className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Our vision"
            title="A world where good technology is within reach."
            copy="We want to make the benefits of thoughtful technology available to more businesses, more teams and more communities."
          />
          <div className="relative overflow-hidden rounded-sm border border-border bg-brand-navy p-7 text-white sm:p-10">
            <div
              aria-hidden="true"
              className="about-orbit absolute -right-20 -top-20 h-72 w-72 rounded-full border border-brand-gold/25"
            >
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-gold" />
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full border border-white/10"
            />
            <div className="relative z-10 max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-light">
                The Northstar principle
              </p>
              <p className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
                Progress should feel possible, not reserved for the few.
              </p>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">
                That means choosing the right level of ambition, building in
                stages and leaving every team more capable than when we began.
              </p>
            </div>
          </div>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell>
          <SectionHeading
            eyebrow="What we stand for"
            title="Enterprise capability, delivered with empathy."
            copy="These commitments shape how we advise, build, collaborate and measure the work."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {commitments.map(({ icon: Icon, eyebrow, title, copy }) => (
              <article
                className="rounded-sm border border-border bg-surface p-6 sm:p-8"
                key={title}
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/40 text-brand-gold">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="pt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    0{commitments.findIndex((item) => item.title === title) + 1}
                  </span>
                </div>
                <Eyebrow>{eyebrow}</Eyebrow>
                <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">{copy}</p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>Global by intention</Eyebrow>
            <h2 className="max-w-3xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl">
              Build a global organization without losing local understanding.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-muted">
              Our ambition is to become a truly global organization: connected
              across markets, curious about different contexts and capable of
              bringing the right expertise to the right customer at the right
              time.
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              Global scale should not make work feel distant. It should make
              better experience, knowledge and opportunity more available.
            </p>
          </div>
          <div
            aria-label="Illustration of connected teams across a global organization"
            className="relative min-h-72 overflow-hidden rounded-sm border border-border bg-surface-muted p-6"
            role="img"
          >
            <div className="absolute inset-8 rounded-full border border-brand-gold/30" />
            <div className="absolute inset-16 rounded-full border border-border" />
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-navy text-center text-xs font-bold uppercase tracking-[0.12em] text-brand-gold-light">
              Shared
              <br />
              direction
            </div>
            {[
              ["left-8 top-10", "Customers"],
              ["right-8 top-14", "Teams"],
              ["left-12 bottom-9", "Community"],
              ["right-10 bottom-8", "Open source"],
            ].map(([position, label]) => (
              <span
                className={`absolute ${position} rounded-full border border-brand-gold/50 bg-surface px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-foreground shadow-sm`}
                key={label}
              >
                {label}
              </span>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="navy">
        <Shell className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <SectionHeading
            inverse
            eyebrow="How we work"
            title="Forward-deployed engineers, invested in the whole journey."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ["01", "Understand", "Work with customers in context, close to the decisions and workflows that matter."],
              ["02", "Build", "Combine strategy, engineering and enablement so the solution works beyond launch day."],
              ["03", "Evolve", "Stay accountable for adoption, learning and the next improvement, not only the first release."],
            ].map(([number, title, copy]) => (
              <article className="border-t border-white/20 pt-5" key={number}>
                <span className="text-xs font-bold tracking-widest text-brand-gold-light">
                  {number}
                </span>
                <h3 className="mt-3 font-display text-2xl text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{copy}</p>
              </article>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid gap-8 md:grid-cols-2 md:items-end lg:gap-16">
          <div>
            <Eyebrow>Our responsibility</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-5xl">
              Build capability, then share it.
            </h2>
          </div>
          <p className="max-w-xl leading-7 text-muted">
            We will measure our growth not only by the work we deliver, but by
            the capability we help create around us. That includes contributing
            to open source, sharing practical knowledge and showing up for the
            communities where technology is learned, built and used.
          </p>
        </Shell>
      </Section>

      <CtaBand
        title="Let’s build a more capable future together."
        copy="Bring us the business problem, the ambition or the first question. We’ll help you find a practical way forward."
      />
    </>
  );
}
