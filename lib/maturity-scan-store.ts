import { neon } from "@neondatabase/serverless";
import type { MaturityScanResult } from "@/lib/maturity-scan";

export type MaturityScanRecord = {
  scanId: string;
  createdAt: string;
  name: string;
  company: string;
  email: string;
  answers: Record<string, string>;
  result: MaturityScanResult;
  contactStatus: "pending" | "saved";
  feedback?: {
    rating: "accurate" | "partly-accurate" | "not-accurate";
    comment: string;
    submittedAt: string;
    contactStatus: "pending" | "sent";
  };
};

let sql: ReturnType<typeof neon<false, false>> | undefined;
let tableReady: Promise<void> | undefined;

function getSql() {
  const databaseUrl =
    process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim();
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL or POSTGRES_URL is required for maturity scan storage. Configure a Neon Postgres database in the deployment environment.",
    );
  }

  sql ??= neon(databaseUrl);
  return sql;
}

async function ensureTable() {
  if (!tableReady) {
    tableReady = getSql()`
      CREATE TABLE IF NOT EXISTS maturity_scan_records (
        scan_id UUID PRIMARY KEY,
        record JSONB NOT NULL
      )
    `
      .then(() => undefined)
      .catch((error: unknown) => {
        tableReady = undefined;
        throw error;
      });
  }
  await tableReady;
}

export async function getMaturityScan(
  scanId: string,
): Promise<MaturityScanRecord | undefined> {
  await ensureTable();
  const rows = await getSql()`
    SELECT record
    FROM maturity_scan_records
    WHERE scan_id = ${scanId}::uuid
    LIMIT 1
  `;
  return rows[0]?.record as MaturityScanRecord | undefined;
}

export async function saveMaturityScan(record: MaturityScanRecord) {
  await ensureTable();
  await getSql()`
    INSERT INTO maturity_scan_records (scan_id, record)
    VALUES (${record.scanId}::uuid, ${JSON.stringify(record)}::jsonb)
    ON CONFLICT (scan_id) DO UPDATE SET record = EXCLUDED.record
  `;
}

export async function setMaturityContactSaved(scanId: string) {
  await ensureTable();
  const rows = await getSql()`
    UPDATE maturity_scan_records
    SET record = jsonb_set(record, '{contactStatus}', '"saved"'::jsonb, true)
    WHERE scan_id = ${scanId}::uuid
    RETURNING scan_id
  `;
  return rows.length > 0;
}

export async function saveMaturityFeedback(
  scanId: string,
  feedback: NonNullable<MaturityScanRecord["feedback"]>,
) {
  await ensureTable();
  const rows = await getSql()`
    UPDATE maturity_scan_records
    SET record = jsonb_set(
      record,
      '{feedback}',
      ${JSON.stringify(feedback)}::jsonb,
      true
    )
    WHERE scan_id = ${scanId}::uuid
    RETURNING scan_id
  `;
  return rows.length > 0;
}
