import { NextResponse } from "next/server";

const fields = ["name", "email", "company", "interest", "challenge"] as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try { payload = await request.json() as Record<string, unknown>; } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  if (typeof payload.website === "string" && payload.website.trim()) return NextResponse.json({ message: "Thanks. Your message has been received." });
  const values = Object.fromEntries(fields.map((field) => [field, typeof payload[field] === "string" ? payload[field].trim() : ""]));
  if (Object.values(values).some((value) => !value) || !emailPattern.test(values.email)) return NextResponse.json({ message: "Please complete all fields with a valid work email." }, { status: 400 });
  if (values.name.length > 120 || values.email.length > 120 || values.company.length > 120 || values.interest.length > 120 || values.challenge.length > 2000) return NextResponse.json({ message: "One or more fields are too long." }, { status: 400 });
  // The validated boundary is intentionally provider-neutral until a CRM or email service is configured.
  return NextResponse.json({ message: "Thanks. Your message has been received." }, { status: 202 });
}
