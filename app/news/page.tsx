import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { PageHero, Section, Shell, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { newsStories } from "@/lib/news-content";

export const metadata: Metadata = pageMetadata(
  "Cybersecurity News & Data Security Briefings",
  "Practical cybersecurity and data security briefings for business and technology leaders, with guidance on vulnerability prioritization, SecOps and protecting information.",
  "/news",
);

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Northstar news"
        title={
          <>
            Clear perspective on <span className="text-brand-gold">current risks.</span>
          </>
        }
        description="Practical briefings to help business and technology leaders assess changing threats, protect important data and choose their next steps."
      >
        <p className="max-w-2xl text-sm leading-6 text-muted">
          These articles are educational guidance, not incident response or
          legal advice. Apply recommendations to your environment and involve
          your security and privacy specialists.
        </p>
      </PageHero>
      <Section>
        <Shell>
          <Eyebrow>Threat and data protection briefings</Eyebrow>
          <div className="grid gap-5 md:grid-cols-2">
            {newsStories.map((story) => (
              <article
                className="flex h-full flex-col rounded-sm border border-border p-6 transition-colors hover:border-brand-gold sm:p-8"
                key={story.slug}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  <span>{story.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={story.publishedAt}>
                    {new Date(`${story.publishedAt}T12:00:00`).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </time>
                </div>
                <h2 className="mt-5 font-display text-2xl leading-tight sm:text-3xl">
                  {story.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {story.summary}
                </p>
                <ul
                  aria-label={`${story.title} topics`}
                  className="mt-5 flex flex-wrap gap-2"
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
                <Link
                  className="mt-7 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-brand-gold hover:underline"
                  href={`/news/${story.slug}`}
                >
                  Read the briefing <ArrowUpRight />
                </Link>
              </article>
            ))}
          </div>
        </Shell>
      </Section>
    </>
  );
}
