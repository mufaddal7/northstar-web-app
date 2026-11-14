import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
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
  return {
    ...metadata,
    openGraph: {
      type: "article",
      siteName: "Northstar",
      title: article.title,
      description: article.summary,
      url: `${SITE_URL}/insights/${article.slug}`,
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
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Organization",
      name: "Northstar",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Northstar",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/insights/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
