import {
  createNorthstarOgImage,
  openGraphImageSize,
} from "@/lib/og-image";
import { getNewsStory } from "@/lib/news-content";

export const runtime = "nodejs";
export const alt = "Northstar cybersecurity news briefing";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getNewsStory(slug);

  return createNorthstarOgImage(
    story?.title ?? "Northstar News",
    story?.category ?? "News",
    false,
  );
}
