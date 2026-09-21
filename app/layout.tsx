import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ServiceWorker } from "@/components/service-worker";
import { SITE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Northstar | Transform what matters. Build what’s next.", template: "%s | Northstar" },
  description: "Northstar helps businesses modernize operations, unlock intelligence from their data, and build digital solutions that create lasting business value.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Northstar", title: "Northstar | Transform what matters. Build what’s next.", description: "Business transformation, technology strategy and engineering together.", url: SITE_URL },
  twitter: { card: "summary_large_image", title: "Northstar | Transform what matters. Build what’s next.", description: "Business transformation, technology strategy and engineering together." },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.svg" },
  manifest: "/manifest.webmanifest"
};

const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Northstar",
  url: SITE_URL,
  email: "hello@northstar53.com",
  telephone: "+916268535490",
  slogan: "Transform what matters. Build what’s next."
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/><main id="main-content">{children}</main><SiteFooter/><ServiceWorker/><script type="application/ld+json">{organizationSchema}</script></body></html>;
}
