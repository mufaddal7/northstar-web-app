import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { ModelDiagram } from "@/components/model-diagram";
import { SectionHeading } from "@/components/section-heading";
import { pillars } from "@/lib/site-data";

export const metadata: Metadata = { title: "What we do", description: "Explore Northstar's connected capabilities across business modernization, data and intelligence, and digital solutions." };

export default function WhatWeDoPage() {
  return <><section className="page-hero page-hero--ink"><div className="shell"><p className="eyebrow">What we do</p><h1>Transform the business.<br/><em>Build what comes next.</em></h1><p>From modernizing the systems that run your business to building the digital products that differentiate it, Northstar brings strategy, technology and execution together.</p></div></section><section className="section section--paper"><div className="shell"><ModelDiagram compact/></div></section><section className="section"><div className="shell"><SectionHeading eyebrow="The three capabilities" title="A connected transformation model."/><div className="pillar-detail-list">{pillars.map((pillar) => <article key={pillar.slug}><div><span>{pillar.number}</span><p>{pillar.name}</p></div><div><h2>{pillar.title}</h2><p>{pillar.description}</p></div><ul>{pillar.services.map((service) => <li key={service.slug}><Link href={`/what-we-do/${pillar.slug}/${service.slug}`}>{service.title}<ArrowUpRight/></Link></li>)}</ul><Link className="text-link" href={`/what-we-do/${pillar.slug}`}>Explore {pillar.name} <ArrowUpRight/></Link></article>)}</div></div></section><CtaBand/></>;
}
