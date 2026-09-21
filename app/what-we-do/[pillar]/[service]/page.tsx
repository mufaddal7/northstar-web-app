import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { processSteps, allServices, getService } from "@/lib/site-data";

type Props = { params: Promise<{ pillar: string; service: string }> };
export function generateStaticParams() { return allServices.map(({ pillar, slug }) => ({ pillar: pillar.slug, service: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { pillar, service } = await params; const item = getService(pillar, service); return item ? { title: item.title, description: item.description } : {}; }

export default async function ServicePage({ params }: Props) {
  const { pillar: pillarSlug, service: serviceSlug } = await params;
  const item = getService(pillarSlug, serviceSlug);
  if (!item) notFound();
  const { pillar, ...service } = item;
  return <><section className="service-hero"><div className="shell"><p className="crumbs"><Link href="/what-we-do">What we do</Link><span>/</span><Link href={`/what-we-do/${pillar.slug}`}>{pillar.name}</Link></p><p className="eyebrow">{pillar.title}</p><h1>{service.title}</h1><p>{service.description}</p></div></section><section className="section section--paper"><div className="shell service-challenge"><p className="eyebrow">The challenge</p><h2>{service.challenge}</h2></div></section><section className="section"><div className="shell service-content"><div><p className="eyebrow">What we do</p><h2>Practical capabilities, focused on the business.</h2></div><ul className="numbered-points">{service.whatWeDo.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul></div></section><section className="section section--ink"><div className="shell service-content service-content--inverse"><div><p className="eyebrow">How we approach it</p><h2>From discovery to continuous improvement.</h2></div><ol className="mini-process">{processSteps.map(([number, title]) => <li key={number}><span>{number}</span>{title}</li>)}</ol></div></section><section className="section"><div className="shell service-content"><div><p className="eyebrow">Business outcomes</p><h2>What the work is designed to improve.</h2></div><ul className="outcome-list">{service.outcomes.map((outcome) => <li key={outcome}>{outcome}<ArrowUpRight/></li>)}</ul></div></section><section className="section section--paper"><div className="shell technologies"><p className="eyebrow">Relevant technologies</p><h2>Technology supports the story - it is not the story.</h2><div>{service.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><p>Specific platforms are selected only when they create useful value for the business context.</p></div></section><section className="section"><div className="shell case-placeholder"><p className="eyebrow">Relevant case studies</p><h2>Approved stories of transformation will appear here.</h2><p>We do not publish confidential client information, metrics or outcomes without approval.</p><Link className="text-link" href="/case-studies">Explore case studies <ArrowUpRight/></Link></div></section><CtaBand title="Let’s discuss your challenge." copy="A focused conversation is often the fastest way to find where technology can make a meaningful difference."/></>;
}
