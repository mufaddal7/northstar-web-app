import {
  createNorthstarOgImage,
  openGraphImageSize,
} from "@/lib/og-image";

export const runtime = "nodejs";
export const alt =
  "Northstar business transformation, ERP, data and AI, and digital solutions";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createNorthstarOgImage(
    "Transform what matters. Build what’s next.",
    "Business transformation",
  );
}
