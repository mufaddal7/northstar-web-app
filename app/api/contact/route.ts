import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { forwardContactSubmission } from "@/lib/contact-submission";
import { sendEmail } from "@/lib/email-service";
import { createContactAcknowledgementEmail } from "@/lib/emails/contact-acknowledgement";

const fields = ["name", "email", "company", "interest", "challenge"] as const;

const allowedInterests = [
  "ERP implementation",
  "CRM implementation",
  "Modernize existing systems",
  "ERPNext implementation",
  "ERP & Business Systems",
  "Data & Analytics",
  "AI & Automation",
  "Build a digital product",
  "Technology Strategy",
  "Business modernization scan",
  "Something else",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const requestId = randomUUID();

  try {
    let payload: Record<string, unknown>;

    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 },
      );
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 },
      );
    }

    // Honeypot: silently accept bot submissions without saving them.
    if (typeof payload.website === "string" && payload.website.trim()) {
      return NextResponse.json({
        message: "Thanks. Your message has been received.",
      });
    }

    const values = Object.fromEntries(
      fields.map((field) => [
        field,
        typeof payload[field] === "string"
          ? (payload[field] as string).trim()
          : "",
      ]),
    ) as Record<(typeof fields)[number], string>;

    if (fields.some((field) => !values[field])) {
      return NextResponse.json(
        { message: "Please complete all fields." },
        { status: 400 },
      );
    }

    if (!emailPattern.test(values.email) || values.email.length > 254) {
      return NextResponse.json(
        { message: "Please enter a valid work email." },
        { status: 400 },
      );
    }

    if (
      values.name.length > 100 ||
      values.company.length > 150 ||
      values.interest.length > 100 ||
      values.challenge.length > 5000
    ) {
      return NextResponse.json(
        { message: "One or more fields are too long." },
        { status: 400 },
      );
    }

    if (!allowedInterests.includes(values.interest)) {
      return NextResponse.json(
        { message: "Please select a valid service." },
        { status: 400 },
      );
    }

    const submission = await forwardContactSubmission(values, requestId);
    if (!submission.success) {
      return NextResponse.json(
        { message: "Unable to submit your inquiry right now.", requestId },
        { status: submission.status },
      );
    }

    let acknowledgementSent = true;
    try {
      await sendEmail({
        to: values.email,
        ...createContactAcknowledgementEmail({
          name: values.name,
          interest: values.interest,
        }),
      });
    } catch (error) {
      acknowledgementSent = false;
      console.error(
        `[contact:${requestId}] Submitter acknowledgement failed:`,
        error,
      );
    }

    return NextResponse.json(
      {
        message: "Thanks. Your message has been received.",
        acknowledgementSent,
        requestId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(`[contact:${requestId}] Contact submission failed:`, error);

    return NextResponse.json(
      { message: "Unable to submit your inquiry right now.", requestId },
      { status: 502 },
    );
  }
}
