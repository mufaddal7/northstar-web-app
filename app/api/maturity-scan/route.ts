import { randomInt, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { forwardContactSubmission } from "@/lib/contact-submission";
import {
  buildMaturityResult,
  getPublicMaturityQuestions,
  maturityQuestions,
} from "@/lib/maturity-scan";
import {
  getMaturityScan,
  saveMaturityFeedback,
  saveMaturityScan,
  setMaturityContactSaved,
  type MaturityScanRecord,
} from "@/lib/maturity-scan-store";
import { SITE_URL } from "@/lib/site-data";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET() {
  const questions = getPublicMaturityQuestions().map((question) => {
    const options = [...question.options];
    for (let index = options.length - 1; index > 0; index -= 1) {
      const swapIndex = randomInt(index + 1);
      [options[index], options[swapIndex]] = [
        options[swapIndex],
        options[index],
      ];
    }
    return { ...question, options };
  });

  return NextResponse.json(
    { questions },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request.", requestId },
      { status: 400 },
    );
  }

  if (!isRecord(payload)) {
    return NextResponse.json(
      { message: "Invalid request.", requestId },
      { status: 400 },
    );
  }

  if (payload.action === "feedback") {
    return saveFeedback(payload, requestId);
  }

  const parsed = parseScanSubmission(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.message, requestId },
      { status: 400 },
    );
  }

  try {
    const existing = await getMaturityScan(parsed.value.scanId);
    let record: MaturityScanRecord;

    if (existing) {
      if (
        existing.name !== parsed.value.name ||
        existing.company !== parsed.value.company ||
        existing.email !== parsed.value.email ||
        !sameAnswers(existing.answers, parsed.value.answers)
      ) {
        return NextResponse.json(
          {
            message: "This scan could not be verified. Please restart it.",
            requestId,
          },
          { status: 409 },
        );
      }
      if (existing.contactStatus === "saved") {
        return NextResponse.json({
          scanId: existing.scanId,
          requestId,
          result: existing.result,
        });
      }
      record = existing;
    } else {
      const result = buildMaturityResult(parsed.value.answers);
      record = {
        scanId: parsed.value.scanId,
        createdAt: new Date().toISOString(),
        name: parsed.value.name,
        company: parsed.value.company,
        email: parsed.value.email,
        answers: parsed.value.answers,
        result,
        contactStatus: "pending",
      };
      await saveMaturityScan(record);
    }

    const challenge = createContactDescription(record);
    if (challenge.length > 5000) {
      throw new Error("The scan summary exceeds the contact message limit.");
    }

    const contact = await forwardContactSubmission(
      {
        name: record.name,
        email: record.email,
        company: record.company,
        interest: "Business modernization scan",
        challenge,
      },
      requestId,
    );

    if (!contact.success) {
      return NextResponse.json(
        {
          message:
            "We couldn’t save your scan details just now. Your answers are safe; please try again.",
          requestId,
        },
        { status: contact.status },
      );
    }

    const markedSaved = await setMaturityContactSaved(record.scanId);
    if (!markedSaved) {
      throw new Error("The scan record could not be updated after contact submission.");
    }

    return NextResponse.json({
      scanId: record.scanId,
      requestId,
      result: record.result,
    });
  } catch (error) {
    console.error(`[maturity-scan:${requestId}] Could not complete scan:`, error);
    return NextResponse.json(
      {
        message:
          "We couldn’t complete the scan right now. Please try again in a moment.",
        requestId,
      },
      { status: 500 },
    );
  }
}

function parseScanSubmission(payload: Record<string, unknown>):
  | {
      success: true;
      value: {
        scanId: string;
        name: string;
        company: string;
        email: string;
        answers: Record<string, string>;
      };
    }
  | { success: false; message: string } {
  const { scanId, name, company, email, answers } = payload;
  if (
    typeof scanId !== "string" ||
    !uuidPattern.test(scanId) ||
    typeof name !== "string" ||
    typeof company !== "string" ||
    typeof email !== "string" ||
    !isRecord(answers)
  ) {
    return {
      success: false,
      message: "Please complete your details and answers.",
    };
  }

  const cleanName = name.trim();
  const cleanCompany = company.trim();
  const cleanEmail = email.trim().toLowerCase();
  if (
    !cleanName ||
    cleanName.length > 100 ||
    !cleanCompany ||
    cleanCompany.length > 150 ||
    !emailPattern.test(cleanEmail) ||
    cleanEmail.length > 254
  ) {
    return {
      success: false,
      message: "Enter a valid name, company and email address.",
    };
  }

  const questionIds = maturityQuestions.map(({ id }) => id);
  const answerIds = Object.keys(answers);
  if (
    answerIds.length !== questionIds.length ||
    questionIds.some((id) => typeof answers[id] !== "string")
  ) {
    return {
      success: false,
      message: "Please answer all six questions before continuing.",
    };
  }

  const cleanAnswers: Record<string, string> = {};
  for (const question of maturityQuestions) {
    const answerId = answers[question.id];
    if (
      typeof answerId !== "string" ||
      !question.options.some(({ id }) => id === answerId)
    ) {
      return {
        success: false,
        message: "One of your answers could not be verified. Please review it.",
      };
    }
    cleanAnswers[question.id] = answerId;
  }

  return {
    success: true,
    value: {
      scanId,
      name: cleanName,
      company: cleanCompany,
      email: cleanEmail,
      answers: cleanAnswers,
    },
  };
}

async function saveFeedback(
  payload: Record<string, unknown>,
  requestId: string,
) {
  const { scanId, rating, comment } = payload;
  if (
    typeof scanId !== "string" ||
    !uuidPattern.test(scanId) ||
    (rating !== "accurate" &&
      rating !== "partly-accurate" &&
      rating !== "not-accurate") ||
    typeof comment !== "string" ||
    comment.trim().length > 1200
  ) {
    return NextResponse.json(
    {
      message:
        "Please choose a rating and keep feedback under 1,200 characters.",
      requestId,
    },
      { status: 400 },
    );
  }

  try {
    const saved = await saveMaturityFeedback(scanId, {
      rating,
      comment: comment.trim(),
      submittedAt: new Date().toISOString(),
    });
    if (!saved) {
      return NextResponse.json(
        { message: "This scan could not be found. Please run it again.", requestId },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Thanks for your feedback.", requestId });
  } catch (error) {
    console.error(`[maturity-scan:${requestId}] Could not save feedback:`, error);
    return NextResponse.json(
      { message: "We couldn’t save your feedback right now.", requestId },
      { status: 500 },
    );
  }
}

function createContactDescription(record: MaturityScanRecord) {
  const answerDetails = record.result.dimensions.map(
    (dimension, index) =>
      `${index + 1}. ${dimension.dimension}\n` +
      `Response: ${dimension.answer}\n` +
      `Next step: ${dimension.nextStep}\n` +
      `Northstar: ${dimension.serviceLabel} (${SITE_URL}${dimension.serviceHref})`,
  );

  return [
    "Northstar Business Modernization Maturity Scan",
    `Scan ID: ${record.scanId}`,
    `Modernization score: ${record.result.score}%`,
    `Maturity level: ${record.result.level}`,
    `Completed: ${record.createdAt}`,
    "",
    "Personalized assessment:",
    record.result.summary,
    "",
    "Strengths:",
    ...record.result.strengths.map(
      ({ dimension, evidence }) => `- ${dimension}: ${evidence}`,
    ),
    "",
    "Priority areas:",
    ...record.result.focusAreas.map(
      ({ dimension, exposure }) => `- ${dimension}: ${exposure}`,
    ),
    "",
    ...answerDetails,
  ].join("\n");
}

function sameAnswers(
  first: Record<string, string>,
  second: Record<string, string>,
) {
  return Object.keys(second).every((key) => first[key] === second[key]);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
