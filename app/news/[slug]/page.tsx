import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
import { ContactDialog } from "@/components/contact-dialog";
import { Eyebrow, PageHero, Section, Shell } from "@/components/ui";
import { getNewsStory, newsStories } from "@/lib/news-content";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsStories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getNewsStory(slug);
  if (!story) return {};

  const path = `/news/${story.slug}`;
  const imageUrl = `${SITE_URL}${path}/opengraph-image`;
  const metadata = pageMetadata(story.title, story.description, path);
  return {
    ...metadata,
    openGraph: {
      type: "article",
      siteName: "Northstar",
      title: `${story.title} | Northstar`,
      description: story.description,
      url: `${SITE_URL}${path}`,
      publishedTime: story.publishedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${story.title} | Northstar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${story.title} | Northstar`,
      description: story.description,
      images: [imageUrl],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  if (slug === "october-2026-cve-prioritization") {
    permanentRedirect("/news/five-critical-cves-security-teams-2026");
  }
  const story = getNewsStory(slug);
  if (!story) notFound();

  const imageUrl = `${SITE_URL}/news/${story.slug}/opengraph-image`;
  const articleSchema = {
    "@type": "NewsArticle",
    headline: story.title,
    description: story.description,
    datePublished: story.publishedAt,
    dateModified: story.publishedAt,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Northstar",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Northstar",
    },
    image: [imageUrl],
    mainEntityOfPage: `${SITE_URL}/news/${story.slug}`,
    keywords: story.tags.join(", "),
    articleSection: story.category,
  };
  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: story.faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: `${SITE_URL}/news`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: story.title,
        item: `${SITE_URL}/news/${story.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [articleSchema, faqSchema, breadcrumbSchema],
          }),
        }}
      />
      <PageHero
        dark
        eyebrow={`News · ${story.category}`}
        title={story.title}
        description={story.summary}
      >
        <Link
          className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline"
          href="/news"
        >
          All news <ArrowUpRight />
        </Link>
      </PageHero>

      <Section>
        <Shell className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <article className="min-w-0 max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span>Northstar</span>
              <span aria-hidden="true">·</span>
              <time dateTime={story.publishedAt}>
                {new Date(`${story.publishedAt}T12:00:00`).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </time>
            </div>
            <ul
              aria-label="Article topics"
              className="mt-4 flex flex-wrap gap-2"
            >
              {story.tags.map((tag) => (
                <li
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
            {story.showTakeaway === false ? null : (
              <section className="mt-8 rounded-sm border-l-4 border-brand-gold bg-surface-muted p-5 sm:p-6">
                <Eyebrow>Key takeaway</Eyebrow>
                <p className="text-base leading-7 text-foreground sm:text-lg sm:leading-8">
                  {story.takeaway}
                </p>
              </section>
            )}
            <div className="mt-10 space-y-10">
              {story.sections.map((section, index) => (
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
                  {section.vulnerabilities?.length ? (
                    <div className="mt-6 space-y-4">
                      {section.vulnerabilities.map((vulnerability) => (
                        <article
                          className="rounded-sm border border-border p-5 sm:p-6"
                          key={vulnerability.cve}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="font-display text-xl leading-tight sm:text-2xl">
                                {vulnerability.product}
                              </h3>
                              <a
                                className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-brand-gold hover:underline"
                                href={`https://www.cve.org/CVERecord?id=${vulnerability.cve}`}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {vulnerability.cve}
                              </a>
                            </div>
                            <span className="rounded-sm border border-brand-gold/50 px-3 py-1 text-xs font-bold text-brand-gold">
                              CVSS v3.1 {vulnerability.score}
                            </span>
                          </div>
                          <dl className="mt-3 grid gap-2 border-y border-border py-3 text-xs leading-5 text-muted sm:grid-cols-2">
                            <div>
                              <dt className="inline font-semibold text-foreground">
                                CVE published:{" "}
                              </dt>
                              <dd className="inline">
                                {vulnerability.published}, 2026
                              </dd>
                            </div>
                            <div>
                              <dt className="inline font-semibold text-foreground">
                                CISA KEV added:{" "}
                              </dt>
                              <dd className="inline">
                                {vulnerability.addedToKev}, 2026
                              </dd>
                            </div>
                          </dl>
                          <p className="mt-4 text-sm leading-7 text-muted">
                            {vulnerability.impact}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-muted">
                            <strong className="text-foreground">
                              Affected scope:{" "}
                            </strong>
                            {vulnerability.scope}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-muted">
                            <strong className="text-foreground">
                              What to check:{" "}
                            </strong>
                            {vulnerability.action}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                            <a
                              className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-brand-gold hover:underline"
                              href={`https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=${vulnerability.cve}`}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              CISA KEV entry <ArrowUpRight />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : null}
                  {section.points ? (
                    <ul className="mt-5 space-y-3">
                      {section.points.map((point) => (
                        <li
                          className="flex gap-3 text-sm leading-6 text-muted sm:text-base"
                          key={point}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
            <section className="mt-10 border-t border-border pt-8">
              <Eyebrow>Common questions</Eyebrow>
              <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {story.faqs.map(({ question, answer }) => (
                  <details className="group py-4" key={question}>
                    <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-2 font-semibold marker:hidden">
                      <span>{question}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-brand-gold transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-2 pr-7 text-sm leading-7 text-muted">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
            <section className="mt-10 border-t border-border pt-6">
              <Eyebrow>Sources and further reading</Eyebrow>
              <ul className="mt-4 space-y-4">
                {story.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      className="inline-flex min-h-11 items-start gap-2 py-2 text-sm font-semibold text-brand-gold hover:underline"
                      href={source.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>{source.label}</span>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" />
                    </a>
                    {source.note ? (
                      <p className="text-xs leading-5 text-muted">
                        {source.note}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          </article>
          <aside className="h-fit rounded-sm border border-border bg-surface-muted p-5 sm:p-6 lg:sticky lg:top-28">
            <Eyebrow>Put the brief to work</Eyebrow>
            <p className="font-display text-xl leading-snug">
              Talk through your technology priorities and next steps.
            </p>
            <ContactDialog
              className="mt-5 min-h-11"
              label="Discuss your priorities"
            />
            <p className="mt-4 text-xs leading-5 text-muted">
              For organization-specific security advice, involve your security,
              legal and privacy specialists.
            </p>
          </aside>
        </Shell>
      </Section>

      <Section tone="navy">
        <Shell className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow inverse>More practical briefings</Eyebrow>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Explore Northstar news and perspectives.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">
              Read guidance on current technology risks, business systems and
              data-led change.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-gold-light hover:underline"
            href="/news"
          >
            Browse all news <ArrowUpRight />
          </Link>
        </Shell>
      </Section>
    </>
  );
}
