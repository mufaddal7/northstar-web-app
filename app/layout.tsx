import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ServiceWorker } from "@/components/service-worker";
import { InquiryPrompt } from "@/components/inquiry-prompt";
import { NewsletterPrompt } from "@/components/newsletter-prompt";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { SITE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Northstar | Transform what matters. Build what’s next.",
    template: "%s | Northstar",
  },
  description:
    "Northstar helps businesses modernize operations, unlock intelligence from their data, and build digital solutions that create lasting business value.",
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.svg" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Northstar",
    title: "Northstar | Transform what matters. Build what’s next.",
    description:
      "Business modernization, ERP, data and AI, and digital solutions shaped around the way your teams work.",
    url: SITE_URL,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Northstar business transformation and technology services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northstar | Transform what matters. Build what’s next.",
    description:
      "Business modernization, ERP, data and AI, and digital solutions shaped around the way your teams work.",
    images: ["/opengraph-image"],
  },
};

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Northstar",
      url: SITE_URL,
      email: "hello@northstar53.com",
      telephone: "+916268535490",
      logo: `${SITE_URL}/icon.svg`,
      slogan: "Transform what matters. Build what’s next.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Northstar",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try { document.documentElement.dataset.theme = localStorage.getItem("northstar-theme") || "light"; } catch { document.documentElement.dataset.theme = "light"; }`}
        </Script>
      </head>
      <body>
        <a className="sr-only fixed left-4 top-[-100px] z-[100] bg-brand-gold px-4 py-3 text-brand-navy focus:top-4 focus:not-sr-only" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <Breadcrumbs />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <InquiryPrompt />
        <NewsletterPrompt />
        <AnalyticsTracker />
        <ServiceWorker />
        <script type="application/ld+json">{structuredData}</script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TY80VCFXKZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TY80VCFXKZ', { send_page_view: false });
          `}
        </Script>
      </body>
    </html>
  );
}
