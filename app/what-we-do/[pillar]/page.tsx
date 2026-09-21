import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { getPillar, pillars } from "@/lib/site-data";

type Props = { params: Promise<{ pillar: string }> };

export function generateStaticParams() { return pillars.map(({ slug }) => ({ pillar: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { pillar: slug } = await params; const pillar = getPillar(slug); return pillar ? { title: pillar.name, description: pillar.description } : {}; }

export default async function PillarPage({ params }: Props) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();
  return <><section className="page-hero page-hero--ink"><div className="shell"><p className="eyebrow">{pillar.number} · {pillar.name}</p><h1>{pillar.statement}</h1><p>{pillar.description}</p></div></section><section className="section"><div className="shell"><SectionHeading eyebrow={`${pillar.name} capabilities`} title={pillar.title}/><div className="service-index">{pillar.services.map((service, index) => <Link href={`/what-we-do/${pillar.slug}/${service.slug}`} key={service.slug}><span>0{index + 1}</span><div><h2>{service.title}</h2><p>{service.description}</p></div><ArrowUpRight/></Link>)}</div></div></section><section className="section section--paper"><div className="shell two-column-statement"><div><p className="eyebrow">How we help</p><h2>Business-first. Built for progress.</h2></div><div><p>We begin by understanding what the business needs to achieve, then connect the right strategy, technology and engineering work to create an outcome that matters.</p></div></div></section><CtaBand title={pillar.cta} copy="Start with the challenge in front of you. We’ll help define the practical next step."/></>;
}
