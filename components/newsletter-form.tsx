"use client";

import Link from "next/link";
import { FormEvent, useId, useState } from "react";
import {
  newsletterSubscribedEvent,
  newsletterSubscribedKey,
  type NewsletterSource,
} from "@/lib/newsletter-ui-state";

type Status = "idle" | "loading" | "success" | "error";
type Variant = "surface" | "footer";

export function NewsletterForm({
  source,
  variant = "surface",
}: {
  source: NewsletterSource;
  variant?: Variant;
}) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inFooter = variant === "footer";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    let responseReceived = false;

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          consent: data.get("consent") === "on",
          source,
          website: data.get("website"),
        }),
      });
      responseReceived = true;
      const body = (await response.json()) as {
        message?: string;
        requestId?: string;
        alreadySubscribed?: boolean;
      };

      if (!response.ok) {
        console.error("[newsletter-form] Subscription request failed.", {
          status: response.status,
          requestId: body.requestId,
        });
        throw new Error(body.message || "Unable to subscribe right now.");
      }

      try {
        window.localStorage.setItem(newsletterSubscribedKey, "true");
      } catch {
        // The current page still reflects the successful subscription.
      }
      window.dispatchEvent(
        new CustomEvent(newsletterSubscribedEvent, { detail: { source } }),
      );
      setStatus("success");
      setMessage(
        body.alreadySubscribed
          ? "This email is already subscribed to Northstar updates."
          : "Thanks. You’re subscribed to Northstar updates.",
      );
    } catch (error) {
      if (!responseReceived) {
        console.error("[newsletter-form] Could not reach the subscription API.", error);
      }
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to subscribe right now. Please try again.",
      );
    }
  }

  const inputStyle = inFooter
    ? "border-white/25 bg-white/10 text-white placeholder:text-white/50 focus:border-brand-gold-light focus:ring-brand-gold-light/20"
    : "border-border bg-surface text-foreground placeholder:text-muted focus:border-brand-gold focus:ring-brand-gold/20";
  const consentStyle = inFooter ? "text-white/70" : "text-muted";

  return (
    <form className="w-full min-w-0" onSubmit={submit}>
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input
          autoComplete="off"
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
        />
      </div>
      <label className="sr-only" htmlFor={`${formId}-email`}>
        Email address
      </label>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <input
          autoComplete="email"
          className={`min-h-12 w-full min-w-0 rounded-sm border px-3 text-sm outline-none transition focus:ring-2 ${inputStyle}`}
          disabled={status === "loading" || status === "success"}
          id={`${formId}-email`}
          maxLength={254}
          name="email"
          placeholder="you@company.com"
          required
          type="email"
        />
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-brand-gold px-5 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-light disabled:cursor-wait disabled:opacity-70"
          disabled={status === "loading" || status === "success"}
          type="submit"
        >
          {status === "loading"
            ? "Adding you…"
            : status === "success"
              ? "Subscribed"
              : "Subscribe"}
        </button>
      </div>
      <div className="mt-3 flex items-start gap-2">
        <input
          className="mt-1 h-4 w-4 shrink-0 accent-brand-gold"
          disabled={status === "loading" || status === "success"}
          id={`${formId}-consent`}
          name="consent"
          required
          type="checkbox"
        />
        <label
          className={`text-xs leading-5 ${consentStyle}`}
          htmlFor={`${formId}-consent`}
        >
          I agree to receive occasional Northstar news and insights by email.
          Unsubscribe any time. See our{" "}
          <Link
            className={
              inFooter
                ? "font-semibold text-brand-gold-light underline"
                : "font-semibold text-brand-gold underline"
            }
            href="/privacy"
          >
            privacy statement
          </Link>
          .
        </label>
      </div>
      {message ? (
        <p
          className={`mt-3 text-sm ${
            status === "error" ? "text-status-error" : "text-status-success"
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
