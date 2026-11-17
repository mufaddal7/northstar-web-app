import {
  createNorthstarOgImage,
  openGraphImageSize,
} from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "What is ERP? A practical guide by Northstar";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createNorthstarOgImage(
    "What Is ERP?",
    "Business systems explained",
    false,
  );
}
