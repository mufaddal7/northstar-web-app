/* eslint-disable @next/next/no-img-element -- ImageResponse needs an img to embed the public SVG as a data URI. */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const openGraphImageSize = { width: 1200, height: 630 };

export async function createNorthstarOgImage(
  heading: string,
  category: string,
  includeLogo = true,
) {
  let logoSource: string | undefined;
  if (includeLogo) {
    const logo = await readFile(
      path.join(process.cwd(), "public", "Dark theme logo.svg"),
    );
    logoSource = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  }
  const headingSize = heading.length > 48 ? 48 : heading.length > 36 ? 56 : 64;

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
          padding: "64px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 28,
          }}
        >
          {logoSource ? (
            <img
              alt="Northstar"
              height={60}
              src={logoSource}
              style={{
                objectFit: "contain",
                objectPosition: "left center",
                width: 350,
              }}
              width={350}
            />
          ) : (
            <div
              style={{
                color: "#d8be88",
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              NORTHSTAR
            </div>
          )}
          <div
            style={{
              border: "1px solid rgba(197,160,89,0.5)",
              borderRadius: 999,
              color: "#d8be88",
              display: "flex",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "10px 16px",
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
        </div>
        <div
          style={{
            color: "#ffffff",
            display: "flex",
            fontSize: headingSize,
            letterSpacing: "-0.04em",
            lineHeight: 1.12,
            maxWidth: 1000,
          }}
        >
          {heading}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.25)",
            color: "rgba(255,255,255,0.72)",
            display: "flex",
            fontSize: 18,
            paddingTop: 20,
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
    openGraphImageSize,
  );
}
