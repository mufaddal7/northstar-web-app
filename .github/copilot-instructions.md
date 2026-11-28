# Northstar Project Guidance

## Scope & Architecture
- **Workspace:** Work only in the active Next.js App Router codebase; ignore legacy `v1`, `v2`, and `v3` folders.
- **Brand & Tokens:** Maintain Northstar’s navy-and-gold palette, theme tokens, logos, fonts, and light/dark mode support. Never hard-code surface colors where theme variables exist.
- **Components & Styling:** Compose pages using `Shell`, `Section`, `PageHero`, `SectionHeading`, `ButtonLink`, and `CtaBand`. Scope Tailwind/CSS locally; modify global CSS only for site-wide tokens or base styles.
- **Data & Security:** Keep secrets in environment variables. Use durable external storage (never local filesystem) for persistent state on Vercel.

## Responsive Design, UX & Accessibility
- **Breakpoints & Large Screens:** Design mobile-first (`360px+`) and scale cleanly across `1920×1080` (FHD), `2560×1440` (QHD), `3440×1440` (ultrawide), and `3840×2160` (4K/high-DPI). Cap readable content with `max-width` containers (`1200px–1440px`) while letting section backgrounds bleed full-width. Use fluid units (`clamp()`, Grid/Flexbox), sharp SVG/high-DPI assets, and balanced vertical heights (`min-height` over rigid `100vh`). Prevent horizontal overflow.
- **Accessibility & Motion:** Use semantic HTML, valid heading hierarchy, descriptive links, visible focus states, accessible control labels, and comfortable touch targets. Keep animations subtle and respect `prefers-reduced-motion`.

## Copy & SEO
- **Voice:** Write clear, business-focused copy leading with reader problems and practical outcomes. Define technical terms/acronyms. Avoid filler, hype, unverified claims, and **em dashes (`—`)**.
- **Page Intent:** Give every page a single clear goal, relevant low-pressure CTA, and natural internal links.
- **GEO-friendly structure:** Make pages useful to both people and answer engines by answering the primary question early, defining terms on first use, using explicit comparison language, showing concrete scenarios, keeping claims visible and verifiable, and linking related guidance naturally. Use clear headings and concise takeaway blocks instead of keyword repetition.
- **Metadata & Indexing:** Use the shared metadata helper on all public pages for unique titles, descriptions, canonical URLs, and OG/Twitter cards (using the branded share-card generator unless a custom cover adds clear value). Avoid `meta keywords` and keyword stuffing.
- **Crawling & Schema:** Keep `app/sitemap.ts` and `app/robots.ts` synced with indexable routes. Set `noindex` on utility/offline/404 pages and exclude them from the sitemap. Ensure JSON-LD structured data strictly reflects visible on-page facts.

## Verification
- Reuse existing TypeScript/Tailwind utilities rather than duplicating logic.
- Run the narrowest relevant check after changes: `yarn lint`, `yarn typecheck`, or `yarn build`.
- If `yarn build` modifies `next-env.d.ts`, restore its tracked state before finishing.