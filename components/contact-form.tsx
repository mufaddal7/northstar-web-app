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
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = await response.json() as { message?: string };
      if (!response.ok) throw new Error(body.message || "Something went wrong.");
      form.reset();
      setStatus("success");
      setMessage("Thanks. Your message has been received and the team will be in touch.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your message. Please email hello@northstar53.com.");
    }
  }
  return <form className="contact-form" onSubmit={submit}><div className="field field--honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div><div className="form-grid"><Field label="Name" name="name" autoComplete="name" required/><Field label="Work email" name="email" type="email" autoComplete="email" required/><Field label="Company" name="company" autoComplete="organization" required/></div><div className="field"><label htmlFor="interest">What are you looking for?</label><select id="interest" name="interest" required defaultValue=""><option value="" disabled>Select an option</option><option>Modernize existing systems</option><option>Data & Analytics</option><option>AI & Automation</option><option>Build a digital product</option><option>Technology Strategy</option><option>Something else</option></select></div><div className="field"><label htmlFor="challenge">Tell us about your challenge</label><textarea id="challenge" name="challenge" rows={6} maxLength={2000} required/></div><button className="button button--gold" type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Start the conversation"}</button>{message ? <p className={`form-message form-message--${status}`} role="status">{message}</p> : null}</form>;
}

function Field({ label, name, type = "text", autoComplete, required }: { label: string; name: string; type?: string; autoComplete?: string; required?: boolean }) {
  return <div className="field"><label htmlFor={name}>{label}</label><input id={name} name={name} type={type} autoComplete={autoComplete} maxLength={120} required={required}/></div>;
}
