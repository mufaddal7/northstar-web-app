"use client";

import { FormEvent, useId, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({
  initialInterest = "",
}: {
  initialInterest?: string;
}) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json()) as {
        message?: string;
        requestId?: string;
      };
      if (!response.ok) {
        console.error("[contact-form] Contact API request failed.", {
          status: response.status,
          requestId: body.requestId,
        });
        throw new Error(body.message || "Something went wrong.");
      }
      console.info("[contact-form] Contact API accepted the submission.", {
        requestId: body.requestId,
      });
      window.gtag?.("event", "generate_lead", { method: "contact_form" });
      form.reset();
      setStatus("success");
      setMessage(
        "Thanks. Your message has been received and the team will be in touch.",
      );
    } catch (error) {
      if (!(error instanceof Error && error.message === "Unable to submit your inquiry right now.")) {
        console.error("[contact-form] Could not reach the contact API.", error);
      }
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please email hello@northstar53.com.",
      );
    }
  }
  return (
    <form className="space-y-5" onSubmit={submit}>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          name="name"
          autoComplete="name"
          required
        />
        <Field
          id={`${formId}-email`}
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          id={`${formId}-company`}
          label="Company"
          name="company"
          autoComplete="organization"
          required
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor={`${formId}-interest`}>What are you looking for?</label>
        <select className="min-h-12 w-full rounded-sm border border-border bg-surface px-3 text-foreground outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20" id={`${formId}-interest`} name="interest" required defaultValue={initialInterest}>
          <option value="" disabled>
            Select an option
          </option>
          <option>ERP implementation</option>
          <option>CRM implementation</option>
          <option>ERPNext implementation</option>
          <option>ERP & Business Systems</option>
          <option>Modernize existing systems</option>
          <option>Data & Analytics</option>
          <option>AI & Automation</option>
          <option>Build a digital product</option>
          <option>Technology Strategy</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor={`${formId}-challenge`}>Tell us about your challenge</label>
        <textarea
          className="w-full rounded-sm border border-border bg-surface px-3 py-3 text-foreground outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
          id={`${formId}-challenge`}
          name="challenge"
          rows={6}
          maxLength={2000}
          required
        />
      </div>
      <button
        className="inline-flex min-h-12 items-center justify-center rounded-sm bg-brand-gold px-5 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-light disabled:cursor-wait disabled:opacity-70"
        type="submit"
        disabled={status === "loading" || status === "success"}
      >
        {status === "loading"
          ? "Sending…"
          : status === "success"
            ? "Message sent"
            : "Start the conversation"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "error" ? "text-status-error" : "text-status-success"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold" htmlFor={id}>{label}</label>
      <input
        className="min-h-12 w-full rounded-sm border border-border bg-surface px-3 text-foreground outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        maxLength={120}
        required={required}
      />
    </div>
  );
}
