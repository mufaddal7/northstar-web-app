import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { openGraphImageSize } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Odoo vs NetSuite comparison by Northstar";
export const size = openGraphImageSize;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [odooLogo, netsuiteLogo] = await Promise.all([
    readFile(path.join(process.cwd(), "public", "external_logos", "odoo.png")),
    readFile(
      path.join(process.cwd(), "public", "external_logos", "oracle netsuite.png"),
    ),
  ]);

  return new ImageResponse(
    <div
      style={{
        alignItems: "flex-start",
        background:
          "linear-gradient(125deg, #0c132a 0%, #17213a 70%, #25304a 100%)",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "64px",
        position: "relative",
        width: "100%",
      }}
    >
      <div style={{ color: "#d8be88", display: "flex", fontSize: 20, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        ERP platform comparison
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ alignItems: "center", background: "#ffffff", borderRadius: 8, display: "flex", height: 84, justifyContent: "center", padding: "14px 22px", width: 250 }}>
          <img
            alt="Odoo Enterprise"
            height={196}
            src={`data:image/png;base64,${odooLogo.toString("base64")}`}
            style={{ height: 56, objectFit: "contain", width: 178 }}
            width={621}
          />
        </div>
        <div style={{ alignItems: "center", display: "flex", fontSize: 28, fontWeight: 700 }}>
          vs
        </div>
        <div style={{ alignItems: "center", background: "#ffffff", borderRadius: 8, display: "flex", height: 84, justifyContent: "center", padding: "14px 22px", width: 250 }}>
          <img
            alt="Oracle NetSuite"
            height={152}
            src={`data:image/png;base64,${netsuiteLogo.toString("base64")}`}
            style={{ height: 56, objectFit: "contain", width: 178 }}
            width={417}
          />
        </div>
      </div>
      <div style={{ color: "#ffffff", display: "flex", fontSize: 58, letterSpacing: "-0.04em", lineHeight: 1.12, maxWidth: 1000 }}>
        Odoo vs NetSuite
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.72)", display: "flex", fontSize: 18, paddingTop: 20 }}>
        ERP · BUSINESS MODERNIZATION · DATA & AI · DIGITAL SOLUTIONS
      </div>
    </div>,
    openGraphImageSize,
  );
}
