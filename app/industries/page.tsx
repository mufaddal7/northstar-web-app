import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { industries } from "@/lib/site-data";

export const metadata: Metadata = { title: "Industries", description: "Northstar applies modern technology with an understanding of the business context in which it operates." };
export default function IndustriesPage() { return <><section className="page-hero"><div className="shell"><p className="eyebrow">Industries</p><h1>Technology built<br/><em>around your business.</em></h1><p>Every industry has different customers, processes, regulations and operational realities. We apply modern technology with an understanding of that context.</p></div></section><section className="section section--paper"><div className="shell industry-page-grid">{industries.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></article>)}</div></section><section className="section"><div className="shell case-placeholder"><p className="eyebrow">Growing with the work</p><h2>Industry perspectives will evolve as additional market presence and approved case studies are developed.</h2></div></section><CtaBand/></> }
