import { createNorthstarOgImage, openGraphImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Odoo vs NetSuite comparison by Northstar";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createNorthstarOgImage("Odoo vs NetSuite", "ERP comparison", false);
}
