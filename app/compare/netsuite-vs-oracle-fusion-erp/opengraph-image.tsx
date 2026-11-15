import {
  createNorthstarOgImage,
  openGraphImageSize,
} from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "NetSuite vs Oracle Fusion Cloud ERP comparison by Northstar";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createNorthstarOgImage(
    "NetSuite vs Oracle Fusion Cloud ERP",
    "ERP comparison",
    false,
  );
}
