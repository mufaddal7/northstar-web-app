import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { insightArticles, insightTopics } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Northstar perspectives on modernization, data, AI, digital engineering and technology strategy.",
};
export default function InsightsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">Northstar insights</p>
          <h1>
            Perspectives with
            <br />
            <em>practical value.</em>
          </h1>
          <p>
            Practical guidance to help leaders make better decisions about
            modernization, data, AI and digital engineering.
          </p>
        </div>
      </section>
      <section className="section section--paper">
        <div className="shell">
          <div className="category-grid">
            {insightTopics.map(([category, description], index) => (
              <article key={category}>
                <span>0{index + 1}</span>
                <h2>{category}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Ideas to put to work</p>
          <div className="insight-article-grid">
            {insightArticles.map(({ category, title, summary }, index) => (
              <article key={title}>
                <span>
                  0{index + 1} · {category}
                </span>
                <h2>{title}</h2>
                <p>{summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
