# Northstar project guidance

## Scope and brand

- Work in the Next.js application. Ignore legacy `v1`, `v2`, and `v3` folders and files.
- Keep the Northstar look and feel: navy and gold, the existing theme tokens, logos, fonts, and reusable UI components.
- Prefer the shared `Shell`, `Section`, `PageHero`, `SectionHeading`, `ButtonLink`, and `CtaBand` components over one-off page layouts.
- Keep styling local to components or pages. Change global CSS only for site-wide foundations such as theme tokens, base styles, or shared behavior.

## UX and accessibility

- Design mobile-first and verify layouts at narrow phone widths as well as desktop. Prevent horizontal overflow, cramped content, and unstable or glitchy interactions.
- Use semantic HTML, a clear heading hierarchy, descriptive link text, visible focus states, and accessible names for controls.
- Make touch targets comfortable to use. Keep animations subtle, non-blocking, and disabled or simplified for reduced-motion preferences.
- Respect the existing light and dark themes and use theme variables rather than hard-coded surface colors where practical.

## Writing and content

- Use clear, natural language that is easy for a business reader to understand. Explain necessary technical terms and acronyms.
- Lead with the reader’s problem and practical outcome. Avoid filler, inflated claims, repetitive AI-sounding phrasing, and unsupported statistics or promises.
- Do not use em dashes in website copy.
- Give each page a distinct purpose and a useful next step. Keep calls to action relevant and low pressure.

## SEO

- Every public page needs a unique, descriptive title and meta description. Use the shared metadata helper and include a canonical URL.
- Include Open Graph and Twitter metadata with an appropriate image. Use the existing branded image generation for share cards; create a page-specific cover when it adds value.
- Keep `app/sitemap.ts` and `app/robots.ts` aligned with indexable routes. Do not add utility, offline, or not-found pages to the sitemap; mark them `noindex`.
- Use accurate structured data that matches visible page content. Do not invent business locations, credentials, clients, results, or other claims.
- Write for people and search intent. Do not add `meta keywords` or stuff keywords into titles and copy.
- Link related pages naturally so visitors and crawlers can discover relevant services and insights.

## Implementation and checks

- Follow the existing Next.js App Router, TypeScript, Tailwind CSS, and component patterns. Reuse shared logic rather than duplicating it.
- Keep secrets in environment variables; never commit credentials. Use durable external storage for data that must persist on Vercel serverless deployments.
- For code changes, run the narrowest relevant checks. Available project checks are `yarn lint`, `yarn typecheck`, and `yarn build`.
- Builds may rewrite `next-env.d.ts`; restore its tracked imports after validation if they change.
