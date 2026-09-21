import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/lib/site-data";

export const metadata: Metadata = { title: "How we work", description: "Northstar brings business-first thinking, practical strategy and strong engineering together from discovery through optimization." };

export default function HowWeWorkPage() { return <><section className="page-hero"><div className="shell"><p className="eyebrow">How we work</p><h1>From strategy<br/><em>to execution.</em></h1><p>Transformation happens when strategy, technology and execution move together.</p></div></section><section className="section section--ink"><div className="shell"><SectionHeading inverse eyebrow="The approach" title="A considered path from ambition to working capability."/><ol className="process-list process-list--light">{processSteps.map(([number, title, copy]) => <li key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></li>)}</ol></div></section><section className="section"><div className="shell principles-statement"><div><p className="eyebrow">What stays true</p><h2>Business-first thinking. Practical strategy. Strong engineering.</h2></div><p>We use a structured approach without treating every challenge the same. The work stays grounded in the business context, delivered iteratively and optimized around meaningful outcomes.</p></div></section><CtaBand/></> }
