import type { Metadata } from "next";
import { MaturityScan } from "@/components/maturity-scan";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Business Modernization Assessment",
  "Assess your business processes, systems, data and readiness for change with six questions. Get a personalized modernization score and practical next steps.",
  "/maturity-scan",
);

export default function MaturityScanPage() {
  return <MaturityScan />;
}
