import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { forwardContactSubmission } from "@/lib/contact-submission";
import {
  markNewsletterGoogleSheetSynced,
  markNewsletterWelcomeEmailSent,
  registerNewsletterSubscriber,
} from "@/lib/newsletter-store";
import { sendEmail } from "@/lib/email-service";
import { createNewsletterWelcomeEmail } from "@/lib/emails/newsletter-welcome";
import { newsStories } from "@/lib/news-content";
import { SITE_URL } from "@/lib/site-data";
import type { NewsletterSource } from "@/lib/newsletter-ui-state";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: Request) {
  const requestId = randomUUID();

  try {
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

    if (typeof payload.website === "string" && payload.website.trim()) {
      return NextResponse.json({ message: "Thanks for subscribing." });
    }

    const email =
      typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    if (!emailPattern.test(email) || email.length > 254) {
      return NextResponse.json(
        { message: "Enter a valid email address.", requestId },
        { status: 400 },
      );
    }

    if (payload.consent !== true) {
      return NextResponse.json(
        { message: "Please confirm you want to receive email updates.", requestId },
        { status: 400 },
      );
    }

    if (!isNewsletterSource(payload.source)) {
      return NextResponse.json(
        { message: "Invalid subscription source.", requestId },
        { status: 400 },
      );
    }
    const source = payload.source;
    const consentedAt = new Date().toISOString();

    const subscription = await registerNewsletterSubscriber({
      email,
      consentedAt,
      source,
    });

    if (!subscription.googleSheetSynced) {
      const description = [
        "News Letter Subscription",
        "Northstar website signup.",
        "Explicit email opt-in recorded.",
        `Consent time: ${consentedAt}`,
        `Signup source: ${source}`,
      ].join("\n");
      const forwarded = await forwardContactSubmission(
        {
          name: "Website newsletter subscriber",
          email,
          company: "Website signup",
          interest: "Something else",
          challenge: description,
        },
        requestId,
      );

      if (!forwarded.success) {
        return NextResponse.json(
          {
            message:
              "Your email is saved, but we couldn’t finish adding it to the newsletter list. Please try again.",
            requestId,
          },
          { status: forwarded.status },
        );
      }

      const synced = await markNewsletterGoogleSheetSynced(email);
      if (!synced) {
        throw new Error(
          "The newsletter subscription was forwarded but its sync status could not be recorded.",
        );
      }
    }

    if (!subscription.welcomeEmailSent) {
      const welcomeEmail = createNewsletterWelcomeEmail(
        newsStories.slice(0, 2).map((story) => ({
          title: story.title,
          summary: story.summary,
          url: `${SITE_URL}/news/${story.slug}`,
        })),
      );
      try {
        await sendEmail({
          to: email,
          ...welcomeEmail,
        });
      } catch (error) {
        console.error(
          `[newsletter:${requestId}] Welcome email delivery failed:`,
          error,
        );
        return NextResponse.json(
          {
            message:
              "Your subscription is saved, but we couldn’t send the welcome email. Please try again.",
            requestId,
          },
          { status: 502 },
        );
      }

      const emailMarkedSent = await markNewsletterWelcomeEmailSent(email);
      if (!emailMarkedSent) {
        throw new Error(
          "The welcome email was sent but its delivery status could not be recorded.",
        );
      }
    }

    return NextResponse.json({
      message: subscription.alreadySubscribed
        ? "This email is already subscribed to Northstar updates."
        : "Thanks for subscribing to Northstar updates.",
      alreadySubscribed: subscription.alreadySubscribed,
      requestId,
    });
  } catch (error) {
    console.error(`[newsletter:${requestId}] Subscription failed:`, error);
    return NextResponse.json(
      {
        message: "We couldn’t complete your subscription right now. Please try again.",
        requestId,
      },
      { status: 500 },
    );
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNewsletterSource(value: unknown): value is NewsletterSource {
  return value === "footer" || value === "popup";
}
