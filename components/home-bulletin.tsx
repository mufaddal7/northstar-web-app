import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Eyebrow, Section, Shell } from "@/components/ui";
import { newsStories } from "@/lib/news-content";
import { insightArticles } from "@/lib/site-data";

const bulletinStories = newsStories.slice(0, 2);
const bulletinInsights = insightArticles.slice(0, 2);

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function HomeBulletin() {
  return (
    <Section className="border-y border-border/70" id="bulletin" tone="muted">
      <Shell>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Eyebrow>Northstar bulletin</Eyebrow>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              News and insights for the decisions ahead.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              Timely updates and practical perspectives on the systems, data
              and technology shaping business change.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
              href="/news"
            >
              All news <ArrowUpRight />
            </Link>
            <Link
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-gold hover:underline"
              href="/insights"
            >
              All insights <ArrowUpRight />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <section aria-labelledby="home-bulletin-news">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
              <h3
                className="font-display text-xl sm:text-2xl"
                id="home-bulletin-news"
              >
                News
              </h3>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Current affairs
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {bulletinStories.map((story, index) => {
                const featured = index === 0;
                return (
                  <Link
                    className="group block min-w-0 rounded-sm focus-visible:outline-offset-4"
                    href={`/news/${story.slug}`}
                    key={story.slug}
                  >
                    <article
                      className={`h-full rounded-sm border p-5 transition-colors sm:p-6 ${
                        featured
                          ? "border-brand-navy bg-brand-navy text-white hover:border-brand-gold"
                          : "border-border bg-surface hover:border-brand-gold"
                      }`}
                    >
                      <p
                        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-wider ${
                          featured ? "text-brand-gold-light" : "text-brand-gold"
                        }`}
                      >
                        <span>{story.category}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={story.publishedAt}>
                          {formatDate(story.publishedAt)}
                        </time>
                      </p>
                      <h4
                        className={`mt-4 font-display text-xl leading-tight transition-colors sm:text-2xl ${
                          featured
                            ? "group-hover:text-brand-gold-light"
                            : "group-hover:text-brand-gold"
                        }`}
                      >
                        {story.title}
                      </h4>
                      <p
                        className={`mt-3 text-sm leading-6 ${
                          featured ? "text-white/70" : "text-muted"
                        }`}
                      >
                        {story.summary}
                      </p>
                      <span
                        className={`mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold ${
                          featured ? "text-brand-gold-light" : "text-brand-gold"
                        }`}
                      >
                        Read the news <ArrowUpRight />
                      </span>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="home-bulletin-insights">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
              <h3
                className="font-display text-xl sm:text-2xl"
                id="home-bulletin-insights"
              >
                From our insights
              </h3>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Practical perspectives
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {bulletinInsights.map((insight) => (
                <Link
                  className="group block min-w-0 rounded-sm focus-visible:outline-offset-4"
                  href={`/insights/${insight.slug}`}
                  key={insight.slug}
                >
                  <article className="h-full rounded-sm border border-border bg-surface p-5 transition-colors group-hover:border-brand-gold sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                      {insight.category}
                    </p>
                    <h4 className="mt-4 font-display text-xl leading-tight transition-colors group-hover:text-brand-gold sm:text-2xl">
                      {insight.title}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {insight.summary}
                    </p>
                    <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-gold">
                      Read the insight <ArrowUpRight />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Shell>
    </Section>
  );
}
