import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ServiceWorker } from "@/components/service-worker";
import { SITE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Northstar | Transform what matters. Build what’s next.",
    template: "%s | Northstar",
  },
  description:
    "Northstar helps businesses modernize operations, unlock intelligence from their data, and build digital solutions that create lasting business value.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Northstar",
    title: "Northstar | Transform what matters. Build what’s next.",
    description:
      "Business transformation, technology strategy and engineering together.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Northstar | Transform what matters. Build what’s next.",
    description:
      "Business transformation, technology strategy and engineering together.",
  },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.svg" },
  manifest: "/manifest.webmanifest",
};

const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Northstar",
  url: SITE_URL,
  email: "hello@northstar53.com",
  telephone: "+916268535490",
  slogan: "Transform what matters. Build what’s next.",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try { const saved = localStorage.getItem("northstar-theme"); const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); document.documentElement.dataset.theme = theme; } catch {}`}
        </Script>
      </head>
      <body>
        <a className="sr-only fixed left-4 top-[-100px] z-[100] bg-brand-gold px-4 py-3 text-brand-navy focus:top-4 focus:not-sr-only" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <ServiceWorker />
        <script type="application/ld+json">{organizationSchema}</script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TY80VCFXKZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TY80VCFXKZ');
          `}
        </Script>
      </body>
    </html>
  );
}
