import { createNorthstarOgImage, openGraphImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "AI agent versus agentic AI explained";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createNorthstarOgImage(
    "AI Agent vs Agentic AI",
    "AI architecture guide",
  );
}
