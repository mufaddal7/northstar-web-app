import type { Metadata } from "next";
import { MaturityScan } from "@/components/maturity-scan";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Business Modernization Maturity Scan",
  "Answer six practical questions about your business processes, systems, data and change readiness. Get a personalized modernization score and next steps.",
  "/maturity-scan",
);

export default function MaturityScanPage() {
  return <MaturityScan />;
}
