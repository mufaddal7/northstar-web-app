import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
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
  };
};

const dataDirectory = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDirectory, "maturity-scans.json");
let writeQueue = Promise.resolve();

async function serializeWrite<T>(operation: () => Promise<T>): Promise<T> {
  const pending = writeQueue.then(operation, operation);
  writeQueue = pending.then(
    () => undefined,
    () => undefined,
  );
  return pending;
}

async function readRecords(): Promise<MaturityScanRecord[]> {
  try {
    const contents = await readFile(dataFile, "utf8");
    const records: unknown = JSON.parse(contents);
    if (!Array.isArray(records)) {
      throw new Error("Maturity scan store must contain a JSON array.");
    }
    return records as MaturityScanRecord[];
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }
    throw error;
  }
}

async function writeRecords(records: MaturityScanRecord[]) {
  await mkdir(dataDirectory, { recursive: true, mode: 0o700 });
  const temporaryFile = `${dataFile}.${randomUUID()}.tmp`;
  await writeFile(temporaryFile, JSON.stringify(records, null, 2), {
    encoding: "utf8",
    mode: 0o600,
  });
  await rename(temporaryFile, dataFile);
}

export async function getMaturityScan(
  scanId: string,
): Promise<MaturityScanRecord | undefined> {
  const records = await readRecords();
  return records.find((record) => record.scanId === scanId);
}

export async function saveMaturityScan(record: MaturityScanRecord) {
  return serializeWrite(async () => {
    const records = await readRecords();
    const existingIndex = records.findIndex(
      ({ scanId }) => scanId === record.scanId,
    );
    if (existingIndex === -1) {
      records.push(record);
    } else {
      records[existingIndex] = record;
    }
    await writeRecords(records);
  });
}

export async function setMaturityContactSaved(scanId: string) {
  return serializeWrite(async () => {
    const records = await readRecords();
    const record = records.find((item) => item.scanId === scanId);
    if (!record) return false;
    record.contactStatus = "saved";
    await writeRecords(records);
    return true;
  });
}

export async function saveMaturityFeedback(
  scanId: string,
  feedback: MaturityScanRecord["feedback"],
) {
  return serializeWrite(async () => {
    const records = await readRecords();
    const record = records.find((item) => item.scanId === scanId);
    if (!record) return false;
    record.feedback = feedback;
    await writeRecords(records);
    return true;
  });
}
