import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-data";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const fullTitle = `${title} | Northstar`;
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: fullTitle,
  };

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Northstar",
      title: fullTitle,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
