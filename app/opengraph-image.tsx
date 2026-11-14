import { ImageResponse } from "next/og";

export const alt =
  "Northstar business transformation, ERP, data and AI, and digital solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
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
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#d8be88",
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.18em",
          }}
        >
          NORTHSTAR
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              color: "#ffffff",
              display: "flex",
              fontSize: 64,
              letterSpacing: "-0.04em",
            }}
          >
            Transform what matters.
          </div>
          <div
            style={{
              color: "#d8be88",
              display: "flex",
              fontSize: 64,
              letterSpacing: "-0.04em",
            }}
          >
            Build what’s next.
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.25)",
            color: "rgba(255,255,255,0.72)",
            display: "flex",
            fontSize: 20,
            paddingTop: 22,
          }}
        >
          ERP · BUSINESS MODERNIZATION · DATA & AI · DIGITAL SOLUTIONS
        </div>
        <div
          style={{
            border: "1px solid rgba(197,160,89,0.28)",
            borderRadius: "50%",
            height: 560,
            position: "absolute",
            right: -210,
            top: -190,
            width: 560,
          }}
        />
      </div>
    ),
    size,
  );
}
