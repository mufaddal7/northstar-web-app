import { createNorthstarOgImage, openGraphImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt =
  "RAG chatbots, tool-augmented chatbots and agentic AI compared";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createNorthstarOgImage(
    "RAG Chatbots vs Tools vs Agentic AI",
    "AI agent comparison",
  );
}
