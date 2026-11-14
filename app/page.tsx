import Link from "next/link";
import { ArrowUpRight, CompassMark } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { ModelDiagram } from "@/components/model-diagram";
import { ButtonLink, Eyebrow, Section, SectionHeading, Shell } from "@/components/ui";
import { challenges, industries, insights, pillars, processSteps } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-navy py-20 text-white sm:py-28 lg:py-32">
        <div className="absolute -right-36 top-8 -z-10 h-[34rem] w-[34rem] rounded-full border border-white/10 sm:right-[-5rem]">
          <div className="absolute inset-12 rounded-full border border-brand-gold/30" />
          <div className="absolute inset-28 rounded-full border border-brand-gold/40" />
          <CompassMark className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-brand-gold" />
        </div>
        <Shell>
          <div className="max-w-3xl">
            <Eyebrow inverse>Technology transformation partner</Eyebrow>
            <h1 className="font-display text-5xl leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Transform what matters.
              <span className="mt-2 block text-brand-gold-light">Build what&apos;s next.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">
              Northstar helps businesses modernize operations, unlock intelligence from their data, and build digital solutions that create lasting business value.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact">
                Start a conversation <ArrowUpRight />
              </ButtonLink>
              <ButtonLink href="/what-we-do" secondary>
                Explore our capabilities <ArrowUpRight />
              </ButtonLink>
            </div>
          </div>
          <div className="mt-16 hidden items-center gap-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 sm:flex">
            <span>Business challenge</span><i className="h-px w-10 bg-brand-gold" /><span>Strategy + engineering</span><i className="h-px w-10 bg-brand-gold" /><span>Measurable outcome</span>
          </div>
        </Shell>
      </section>

      <Section tone="muted">
        <Shell>
          <SectionHeading eyebrow="The Northstar model" title="Three capabilities. One transformation journey." copy="Move from the systems you rely on, to the intelligence you need, to what you are ready to build." />
          <div className="mt-10"><ModelDiagram /></div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHeading eyebrow="Business challenges" title="What are you trying to achieve?" copy="Start with the business problem. We’ll help define the right transformation path." />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map(([title, copy, pillar], index) => (
              <Link key={title} href={`/what-we-do/${pillar}`} className="group rounded-sm border border-border p-6 transition-colors hover:border-brand-gold hover:bg-surface-muted sm:p-7">
                <span className="text-xs font-bold tracking-widest text-brand-gold">0{index + 1}</span>
                <h3 className="mt-7 font-display text-2xl leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                <ArrowUpRight className="mt-5 h-5 w-5 text-brand-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="navy">
        <Shell>
          <SectionHeading inverse eyebrow="Capabilities" title="Modernize. Intelligence. Build." copy="Business capabilities that bring strategy, technology and execution together." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Link key={pillar.slug} href={`/what-we-do/${pillar.slug}`} className="group rounded-sm border border-white/15 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-brand-gold/70 hover:bg-white/[0.07] sm:p-8">
                <span className="text-xs font-bold tracking-widest text-brand-gold-light">{pillar.number}</span>
                <h3 className="mt-8 font-display text-3xl">{pillar.name}</h3>
                <p className="mt-1 text-sm text-white/65">{pillar.title}</p>
                <ul className="mt-7 space-y-3 border-t border-white/15 pt-5 text-sm text-white/75">
                  {pillar.services.map((service) => <li key={service.slug}>{service.title}</li>)}
                </ul>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-gold-light">Explore {pillar.name}<ArrowUpRight /></span>
              </Link>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHeading eyebrow="How we work" title="From business challenge to measurable outcome." copy="Strategy without execution doesn’t transform a business. We bring strategy and engineering together to move from ideas to working capabilities." />
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map(([number, title, copy]) => (
              <li key={number} className="border-t border-border py-5">
                <span className="text-xs font-bold tracking-widest text-brand-gold">{number}</span>
                <h3 className="mt-4 font-display text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>Transformation in practice</Eyebrow>
            <h2 className="max-w-xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl">Complex work needs a clear story.</h2>
          </div>
          <div>
            <p className="leading-7 text-muted">Explore an enterprise development modernization example, from the platform challenge to the capabilities involved and the measures used to assess progress.</p>
            <Link className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline" href="/case-studies">View case study <ArrowUpRight /></Link>
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <SectionHeading eyebrow="Industries" title="Technology built around your business." copy="Different industries have different customers, processes, regulations and operational realities." />
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map(([name, copy], index) => (
              <article key={name} className="rounded-sm border border-border p-5 sm:p-6">
                <span className="text-xs font-bold tracking-widest text-brand-gold">0{index + 1}</span>
                <h3 className="mt-6 font-display text-2xl">{name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
              </article>
            ))}
          </div>
          <Link className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline" href="/industries">Explore industries <ArrowUpRight /></Link>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell className="grid gap-8 md:grid-cols-2 md:items-center">
          <SectionHeading eyebrow="Northstar insights" title="Perspectives with practical value." copy="Explore practical guidance on modernization, data, AI and digital engineering—from platform decisions to automation opportunities." />
          <div className="divide-y divide-border border-y border-border">
            {insights.map((insight, index) => (
              <p key={insight} className="flex items-center gap-4 py-4 font-display text-xl"><b className="text-xs font-bold text-brand-gold">0{index + 1}</b>{insight}</p>
            ))}
          </div>
          <Link className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline md:col-start-2" href="/insights">Explore insights <ArrowUpRight /></Link>
        </Shell>
      </Section>
      <CtaBand />
    </>
  );
}
