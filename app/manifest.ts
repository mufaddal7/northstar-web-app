import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Northstar",
    short_name: "Northstar",
    description:
      "Business modernization, ERP, data and AI, and digital solutions from Northstar.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C132A",
    theme_color: "#0C132A",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
