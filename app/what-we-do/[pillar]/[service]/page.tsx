import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { PageHero, Section, SectionHeading, Shell, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import {
  allServices,
  getService,
  processSteps,
  SITE_URL,
} from "@/lib/site-data";

type Props = { params: Promise<{ pillar: string; service: string }> };

export function generateStaticParams() {
  return allServices.map(({ pillar, slug }) => ({
    pillar: pillar.slug,
    service: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillar, service } = await params;
  const item = getService(pillar, service);
  return item
    ? pageMetadata(
        item.title,
        item.seoDescription,
        `/what-we-do/${item.pillar.slug}/${item.slug}`,
      )
    : {};
}

export default async function ServicePage({ params }: Props) {
  const { pillar: pillarSlug, service: serviceSlug } = await params;
  const item = getService(pillarSlug, serviceSlug);
  if (!item) notFound();
  const { pillar, ...service } = item;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.seoDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/what-we-do/${pillar.slug}/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHero
        dark
        eyebrow={`${pillar.name} / ${pillar.title}`}
        title={service.title}
        description={service.description}
      >
        <Link href={`/what-we-do/${pillar.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline">
          Explore {pillar.name} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </PageHero>
      <Section tone="muted">
        <Shell width="medium">
          <Eyebrow>The challenge</Eyebrow>
          <h2 className="font-display text-3xl leading-tight sm:text-5xl">{service.challenge}</h2>
        </Shell>
      </Section>
      <Section>
        <Shell className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="What we do" title="Practical capabilities, focused on the business." />
          <ul className="divide-y divide-border border-y border-border">
            {service.whatWeDo.map((item, index) => (
              <li key={item} className="flex gap-5 py-4">
                <span className="pt-1 text-xs font-bold tracking-widest text-brand-gold">0{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Shell>
      </Section>
      <Section tone="navy">
        <Shell>
          <SectionHeading inverse eyebrow="How we approach it" title="From discovery to continuous improvement." />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map(([number, title, copy]) => (
              <li key={number} className="border-t border-white/20 py-4">
                <span className="text-xs font-bold text-brand-gold-light">{number}</span>
                <h3 className="mt-3 font-display text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{copy}</p>
              </li>
            ))}
          </ol>
        </Shell>
      </Section>
      <Section>
        <Shell className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="Business outcomes" title="What the work is designed to improve." />
          <ul className="divide-y divide-border border-y border-border">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-center justify-between gap-4 py-4 font-display text-xl">
                {outcome}<ArrowUpRight className="h-5 w-5 shrink-0 text-brand-gold" />
              </li>
            ))}
          </ul>
        </Shell>
      </Section>
      <Section tone="muted">
        <Shell width="medium">
          <Eyebrow>Relevant technologies</Eyebrow>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">Technology supports the story. It is not the story.</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.technologies.map((technology) => (
              <span key={technology} className="rounded-full border border-border px-4 py-2 text-sm">{technology}</span>
            ))}
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">Specific platforms are selected only when they create useful value for the business context.</p>
        </Shell>
      </Section>
      <Section>
        <Shell width="medium">
          <Eyebrow>Transformation in practice</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl">Connect the challenge to the outcome.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted">
            A useful case study explains the business need, the approach taken
            and the capabilities involved. Explore an enterprise development
            modernization example and the measures used to assess progress.
          </p>
          <Link className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline" href="/case-studies">
            Explore case studies <ArrowUpRight />
          </Link>
        </Shell>
      </Section>
      <CtaBand
        title="Let’s discuss your challenge."
        copy="A focused conversation is often the fastest way to find where technology can make a meaningful difference."
      />
    </>
  );
}
