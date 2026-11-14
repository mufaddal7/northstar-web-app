"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
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
      const body = (await response.json()) as { message?: string };
      if (!response.ok)
        throw new Error(body.message || "Something went wrong.");
      form.reset();
      setStatus("success");
      setMessage(
        "Thanks. Your message has been received and the team will be in touch.",
      );
    } catch (error) {
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
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          label="Company"
          name="company"
          autoComplete="organization"
          required
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="interest">What are you looking for?</label>
        <select className="min-h-12 w-full rounded-sm border border-border bg-surface px-3 text-foreground outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20" id="interest" name="interest" required defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          <option>Modernize existing systems</option>
          <option>Data & Analytics</option>
          <option>AI & Automation</option>
          <option>Build a digital product</option>
          <option>Technology Strategy</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="challenge">Tell us about your challenge</label>
        <textarea
          className="w-full rounded-sm border border-border bg-surface px-3 py-3 text-foreground outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
          id="challenge"
          name="challenge"
          rows={6}
          maxLength={2000}
          required
        />
      </div>
      <button
        className="inline-flex min-h-12 items-center justify-center rounded-sm bg-brand-gold px-5 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-light disabled:cursor-wait disabled:opacity-70"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Start the conversation"}
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
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold" htmlFor={name}>{label}</label>
      <input
        className="min-h-12 w-full rounded-sm border border-border bg-surface px-3 text-foreground outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        maxLength={120}
        required={required}
      />
    </div>
  );
}
