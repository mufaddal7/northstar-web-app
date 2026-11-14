import {
  createNorthstarOgImage,
  openGraphImageSize,
} from "@/lib/og-image";
import { insightArticles } from "@/lib/site-data";

export const runtime = "nodejs";
export const alt = "Northstar business and technology insight";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = insightArticles.find((item) => item.slug === slug);

  return createNorthstarOgImage(
    article?.title ?? "Northstar Insights",
    article?.category ?? "Insights",
    false,
  );
}
