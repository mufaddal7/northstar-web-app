
import { NextResponse } from "next/server";

const fields = [
  "name",
  "email",
  "company",
  "interest",
  "challenge",
] as const;

const allowedInterests = [
  "Modernize existing systems",
  "Data & Analytics",
  "AI & Automation",
  "Build a digital product",
  "Technology Strategy",
  "Something else",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    let payload: Record<string, unknown>;

    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 }
      );
    }

    if (
      !payload ||
      typeof payload !== "object" ||
      Array.isArray(payload)
    ) {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 }
      );
    }

    // Honeypot: silently accept bot submissions without saving them.
    if (
      typeof payload.website === "string" &&
      payload.website.trim()
    ) {
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
      ])
    ) as Record<(typeof fields)[number], string>;

    if (fields.some((field) => !values[field])) {
      return NextResponse.json(
        { message: "Please complete all fields." },
        { status: 400 }
      );
    }

    if (
      !emailPattern.test(values.email) ||
      values.email.length > 254
    ) {
      return NextResponse.json(
        { message: "Please enter a valid work email." },
        { status: 400 }
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
        { status: 400 }
      );
    }

    if (!allowedInterests.includes(values.interest)) {
      return NextResponse.json(
        { message: "Please select a valid service." },
        { status: 400 }
      );
    }

    // Read secrets exclusively on the server.
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const apiSecret = process.env.GOOGLE_SCRIPT_SECRET;

    if (!scriptUrl || !apiSecret) {
      console.error("Google Sheets integration is not configured.");

      return NextResponse.json(
        { message: "Unable to submit your inquiry right now." },
        { status: 500 }
      );
    }

    // Forward the validated data to Google Apps Script.
    const googleResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        workEmail: values.email,
        company: values.company,
        interest: values.interest,
        challenge: values.challenge,
        secret: apiSecret,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    const result = await googleResponse.json();

    if (!googleResponse.ok || result.success !== true) {
      console.error("Google Sheets rejected a contact submission.");

      return NextResponse.json(
        { message: "Unable to submit your inquiry right now." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: "Thanks. Your message has been received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact submission failed:", error);

    return NextResponse.json(
      { message: "Unable to submit your inquiry right now." },
      { status: 502 }
    );
  }
}
