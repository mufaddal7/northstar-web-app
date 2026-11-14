import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { PageHero, Section, SectionHeading, Shell } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { getPillar, pillars } from "@/lib/site-data";

type Props = { params: Promise<{ pillar: string }> };

export function generateStaticParams() {
  return pillars.map(({ slug }) => ({ pillar: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  return pillar
    ? pageMetadata(
        pillar.title,
        pillar.seoDescription,
        `/what-we-do/${pillar.slug}`,
      )
    : {};
}

export default async function PillarPage({ params }: Props) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  return (
    <>
      <PageHero
        dark
        eyebrow={`${pillar.number} · ${pillar.name}`}
        title={pillar.statement}
        description={pillar.description}
      />
      <Section>
        <Shell>
          <SectionHeading eyebrow={`${pillar.name} capabilities`} title={pillar.title} />
          <div className="mt-8 divide-y divide-border border-y border-border">
            {pillar.services.map((service, index) => (
              <Link key={service.slug} href={`/what-we-do/${pillar.slug}/${service.slug}`} className="group grid gap-4 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-6">
                <span className="text-xs font-bold tracking-widest text-brand-gold">0{index + 1}</span>
                <div>
                  <h2 className="font-display text-2xl">{service.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{service.description}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-brand-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ))}
          </div>
        </Shell>
      </Section>
      <Section tone="muted">
        <Shell className="grid gap-6 md:grid-cols-2 md:items-center">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">Business-first. Built for progress.</h2>
          <p className="leading-7 text-muted">
            We begin by understanding what the business needs to achieve, then
            connect the right strategy, technology and engineering work to
            create an outcome that matters.
          </p>
        </Shell>
      </Section>
      <CtaBand
        title={pillar.cta}
        copy="Start with the challenge in front of you. We’ll help define the practical next step."
      />
    </>
  );
}
