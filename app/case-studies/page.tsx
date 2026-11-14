import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = { title: "Case studies", description: "An enterprise development modernization example, from business challenge to approach and outcome measures." };
export default function CaseStudiesPage() {
  return <>
    <section className="page-hero page-hero--ink">
      <div className="shell">
        <p className="eyebrow">Case studies</p>
        <h1>Transformation<br/><em>in practice.</em></h1>
        <p>See how a complex platform challenge can be framed around the business need, the work and the outcomes that matter.</p>
      </div>
    </section>
    <section className="section">
      <div className="shell case-placeholder case-placeholder--large">
        <p className="eyebrow">Enterprise development</p>
        <h2>Modernizing enterprise development at scale</h2>
        <p>A large enterprise needed to modernize its developer platform and migrate thousands of repositories to a new enterprise development environment.</p>
        <div className="case-detail-grid">
          <div>
            <h3>The transformation</h3>
            <p>The work brings platform engineering and developer experience together with GitHub Enterprise, CI/CD modernization and automation.</p>
          </div>
          <div>
            <h3>How success is measured</h3>
            <p>Relevant measures include repository migration coverage and velocity, manual effort, developer experience and operational efficiency.</p>
          </div>
        </div>
        <p className="case-note">Client identity and quantified results are not included in the approved material, so no client details or performance claims are presented here.</p>
      </div>
    </section>
    <CtaBand title="Have a transformation challenge of your own?"/>
  </>;
}
