import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
import {
  ErpAiAdoptionRoadmap,
  ErpAiLoop,
} from "@/components/erp-ai-infographics";
import { SapErpPortfolio } from "@/components/sap-erp-portfolio";
import { ContactDialog } from "@/components/contact-dialog";
import {
  Eyebrow,
  PageHero,
  Section,
  Shell,
} from "@/components/ui";
import { insightContent } from "@/lib/insight-content";
import { pageMetadata } from "@/lib/metadata";
import { insightArticles, SITE_URL } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insightArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = insightArticles.find((item) => item.slug === slug);
  if (!article) return {};

  const metadata = pageMetadata(
    article.title,
    article.summary,
    `/insights/${article.slug}`,
  );
  const imageUrl = `${SITE_URL}/insights/${article.slug}/opengraph-image`;
  return {
    ...metadata,
    openGraph: {
      type: "article",
      siteName: "Northstar",
      title: `${article.title} | Northstar`,
      description: article.summary,
      url: `${SITE_URL}/insights/${article.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${article.title} | Northstar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Northstar`,
      description: article.summary,
      images: [imageUrl],
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = insightArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  const content = insightContent[article.slug];
  const relatedArticles = content.related
    .map((relatedSlug) =>
      insightArticles.find((item) => item.slug === relatedSlug),
    )
    .filter((item) => item !== undefined);
  const articleSchema = {
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    image: `${SITE_URL}/insights/${article.slug}/opengraph-image`,
    mainEntityOfPage: `${SITE_URL}/insights/${article.slug}`,
  };
  const faqSchema = content.faqs?.length
    ? {
        "@type": "FAQPage",
        mainEntity: content.faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }
    : null;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": faqSchema ? [articleSchema, faqSchema] : [articleSchema],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero
        dark
        eyebrow={article.category}
        title={article.title}
        description={article.summary}
      >
        <Link
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline"
          href="/insights"
        >
          All insights <ArrowUpRight />
        </Link>
      </PageHero>

      <Section>
        <Shell className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <article className="max-w-3xl">
            <p className="text-lg leading-8 text-foreground sm:text-xl sm:leading-9">
              {content.opening}
            </p>
            {content.infographics?.sapPortfolio ? (
              <SapErpPortfolio
                description={content.infographics.sapPortfolio.description}
                heading={content.infographics.sapPortfolio.heading}
              />
            ) : null}
            {content.infographics?.loop ? (
              <ErpAiLoop
                description={content.infographics.loop.description}
                heading={content.infographics.loop.heading}
              />
            ) : null}
            <div className="mt-10 space-y-10">
              {content.sections.map((section, index) => (
                <section key={section.heading}>
                  <Eyebrow>0{index + 1}</Eyebrow>
                  <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-muted sm:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.points ? (
                    <ul className="mt-5 space-y-3">
                      {section.points.map((point) => (
                        <li
                          className="flex gap-3 text-sm leading-6 text-muted"
                          key={point}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
            {content.infographics?.adoption ? (
              <ErpAiAdoptionRoadmap
                description={content.infographics.adoption.description}
                heading={content.infographics.adoption.heading}
              />
            ) : null}
            {content.faqs?.length ? (
              <section className="mt-10 border-t border-border pt-8">
                <Eyebrow>Common questions</Eyebrow>
                <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                  Frequently asked questions
                </h2>
                <div className="mt-5 divide-y divide-border border-y border-border">
                  {content.faqs.map(({ question, answer }) => (
                    <details className="group py-4" key={question}>
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold marker:hidden">
                        <span>{question}</span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-brand-gold transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-3 pr-7 text-sm leading-7 text-muted">
                        {answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
            {content.sources?.length ? (
              <section className="mt-10 border-t border-border pt-6">
                <Eyebrow>Sources and further reading</Eyebrow>
                <ul className="mt-4 space-y-3">
                  {content.sources.map((source) => (
                    <li key={source.href}>
                      <a
                        className="inline-flex items-start gap-2 text-sm font-semibold text-brand-gold hover:underline"
                        href={source.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span>{source.label}</span>
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-5 text-muted">
                  Product names, availability and support roadmaps can change.
                  Confirm current details with SAP and your implementation
                  partner.
                </p>
              </section>
            ) : null}
            {article.category.includes("AI") ? (
              <aside className="mt-10 border border-brand-gold/50 bg-brand-gold/10 p-5 sm:p-6">
                <Eyebrow>Related AI guide</Eyebrow>
                <h2 className="font-display text-2xl leading-tight">
                  AI agent vs agentic AI
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Clarify the difference between an AI agent, an agentic
                  workflow and the tools that support them.
                </p>
                <Link
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
                  href="/ai-agent-vs-agentic-ai"
                >
                  Read the guide <ArrowUpRight />
                </Link>
              </aside>
            ) : null}
          </article>

          <aside className="h-fit rounded-sm border border-border bg-surface-muted p-5 sm:p-6 lg:sticky lg:top-28">
            <Eyebrow>A question to take back</Eyebrow>
            <p className="font-display text-xl leading-snug">
              {content.decisionPrompt}
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
              href={content.service.href}
            >
              {content.service.label} <ArrowUpRight />
            </Link>
          </aside>
        </Shell>
      </Section>

      <Section tone="muted">
        <Shell width="medium">
          <Eyebrow>How Northstar can help</Eyebrow>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            {content.service.heading}
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted">
            {content.service.copy}
          </p>
          <Link
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
            href={content.service.href}
          >
            {content.service.label} <ArrowUpRight />
          </Link>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <Eyebrow>Continue reading</Eyebrow>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedArticles.map((related) => (
              <Link
                className="group rounded-sm border border-border p-5 transition-colors hover:border-brand-gold sm:p-6"
                href={`/insights/${related.slug}`}
                key={related.slug}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {related.category}
                </span>
                <span className="mt-3 block font-display text-xl leading-tight group-hover:text-brand-gold">
                  {related.title}
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-muted">
                  Read the article <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="navy">
        <Shell className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow inverse>Apply this to your business</Eyebrow>
            <h2 className="max-w-3xl font-display text-3xl leading-tight sm:text-4xl">
              {content.cta.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">
              {content.cta.copy}
            </p>
          </div>
          <ContactDialog
            className="min-h-12"
            label={content.cta.contactLabel}
          />
        </Shell>
      </Section>
    </>
  );
}
