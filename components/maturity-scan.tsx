"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ButtonLink, Eyebrow, Shell } from "@/components/ui";
import type { MaturityScanResult } from "@/lib/maturity-scan";

type PublicQuestion = {
  id: string;
  dimension: string;
  prompt: string;
  options: { id: string; label: string }[];
};

type ScanResponse = {
  scanId: string;
  company: string;
  completedAt: string;
  result: MaturityScanResult;
};

type ScanPhase = "loading" | "questions" | "details" | "result" | "error";
type FeedbackRating = "accurate" | "partly-accurate" | "not-accurate";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const feedbackOptions: { value: FeedbackRating; label: string }[] = [
  { value: "accurate", label: "Accurate" },
  { value: "partly-accurate", label: "Partly accurate" },
  { value: "not-accurate", label: "Not accurate" },
];

export function MaturityScan() {
  const scanStepRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<ScanPhase>("loading");
  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scanId, setScanId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [completedAt, setCompletedAt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<MaturityScanResult | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [feedbackRating, setFeedbackRating] = useState<FeedbackRating | null>(
    null,
  );
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  useEffect(() => {
    let active = true;
    fetch("/api/maturity-scan", { cache: "no-store" })
      .then(async (response) => {
        const body = (await response.json()) as {
          questions?: PublicQuestion[];
        };
        if (!response.ok || !body.questions?.length) {
          throw new Error("The scan questions could not be loaded.");
        }
        if (active) {
          setQuestions(body.questions);
          setScanId(window.crypto.randomUUID());
          setPhase("questions");
        }
      })
      .catch(() => {
        if (active) {
          setErrorMessage(
            "The scan could not be loaded. Please check your connection and try again.",
          );
          setPhase("error");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const score = result?.score;
    if (score === undefined) return;
    let frame = 0;
    frame = requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setAnimatedScore(score);
        return;
      }

      const startedAt = performance.now();
      const duration = 1100;
      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        setAnimatedScore(Math.round(score * progress));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      setAnimatedScore(0);
      frame = requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(frame);
  }, [result]);

  const currentQuestion = questions[questionIndex];
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  function chooseAnswer(optionId: string) {
    if (!currentQuestion) return;
    setAnswers((current) => ({ ...current, [currentQuestion.id]: optionId }));
    setErrorMessage("");
  }

  function continueQuestions() {
    if (!currentAnswer) return;
    if (questionIndex === questions.length - 1) {
      setPhase("details");
    } else {
      setQuestionIndex((index) => index + 1);
    }
    focusScanStep();
  }

  function focusScanStep() {
    requestAnimationFrame(() => {
      const step = scanStepRef.current;
      if (!step) return;
      const behavior = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
        ? "instant"
        : "smooth";
      step.scrollIntoView({ behavior, block: "start" });
      step.focus({ preventScroll: true });
    });
  }

  async function submitScan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/maturity-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scanId, name, company, email, answers }),
      });
      const body = (await response.json()) as
        | (ScanResponse & { requestId?: string })
        | { message?: string; requestId?: string };

      if (!response.ok || !("result" in body)) {
        console.error("[maturity-scan] Scan submission failed.", {
          status: response.status,
          requestId: body.requestId,
        });
        setErrorMessage(
          "message" in body && body.message
            ? body.message
            : "We couldn’t complete the scan. Please try again.",
        );
        return;
      }

      setScanId(body.scanId);
      setCompany(body.company);
      setCompletedAt(body.completedAt);
      setResult(body.result);
      setPhase("result");
      window.gtag?.("event", "generate_lead", {
        method: "business_maturity_scan",
        score: body.result.score,
        maturity_level: body.result.level,
      });
    } catch (error) {
      console.error("[maturity-scan] Could not reach the scan API.", error);
      setErrorMessage(
        "We couldn’t reach the scan service. Your answers are still here; please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!feedbackRating) return;
    setFeedbackStatus("sending");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/maturity-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "feedback",
          scanId,
          rating: feedbackRating,
          comment: feedbackComment,
        }),
      });
      const body = (await response.json()) as {
        message?: string;
        requestId?: string;
      };
      if (!response.ok) {
        console.error("[maturity-scan] Feedback submission failed.", {
          status: response.status,
          requestId: body.requestId,
        });
        setFeedbackMessage(
          body.message || "Feedback could not be sent. Please try again.",
        );
        setFeedbackStatus("error");
        return;
      }
      setFeedbackMessage(
        body.message || "Thanks. Your feedback was sent to our team.",
      );
      setFeedbackStatus("sent");
    } catch (error) {
      console.error("[maturity-scan] Could not submit feedback.", error);
      setFeedbackMessage(
        "Feedback could not be sent. Please try again.",
      );
      setFeedbackStatus("error");
    }
  }

  function printReport() {
    document.body.dataset.printReport = "true";
    window.addEventListener(
      "afterprint",
      () => {
        delete document.body.dataset.printReport;
      },
      { once: true },
    );
    window.print();
  }

  return (
    <section className="maturity-scan-page bg-surface-muted py-12 sm:py-16 lg:py-20">
      <Shell className="maturity-scan-shell" width="medium">
        <div className="maturity-scan-intro mb-9 max-w-3xl sm:mb-12">
          <Eyebrow>Business modernization scan</Eyebrow>
          <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            See what is working. Find what to improve next.
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-muted sm:text-lg sm:leading-8">
            Take a six-question look at your processes, systems, data and
            readiness for change. Get a practical snapshot with next steps
            tailored to your answers.
          </p>
        </div>

        {phase === "loading" ? (
          <div
            aria-live="polite"
            className="rounded-sm border border-border bg-surface p-8 text-muted"
          >
            Preparing your questions…
          </div>
        ) : null}

        {phase === "error" ? (
          <div
            className="rounded-sm border border-border bg-surface p-8"
            role="alert"
          >
            <p className="text-status-error">{errorMessage}</p>
            <button
              className="mt-4 rounded-sm bg-brand-gold px-5 py-3 text-sm font-bold text-brand-navy"
              onClick={() => window.location.reload()}
              type="button"
            >
              Reload the scan
            </button>
          </div>
        ) : null}

        {phase === "questions" && currentQuestion ? (
          <div
            aria-labelledby="maturity-scan-question-title"
            className="scroll-mt-24 rounded-sm border border-border bg-surface p-5 sm:p-8"
            ref={scanStepRef}
            role="region"
            tabIndex={-1}
          >
            <div className="mb-7">
              <div className="mb-3 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                <span>
                  Question {questionIndex + 1} of {questions.length}
                </span>
                <span>{currentQuestion.dimension}</span>
              </div>
              <div
                aria-label={`Question ${questionIndex + 1} of ${questions.length}`}
                aria-valuemax={questions.length}
                aria-valuemin={0}
                aria-valuenow={questionIndex + 1}
                className="h-1.5 overflow-hidden rounded-full bg-surface-muted"
                role="progressbar"
              >
                <div
                  className="h-full rounded-full bg-brand-gold transition-[width] duration-300 motion-reduce:transition-none"
                  style={{
                    width: `${((questionIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <fieldset>
              <legend
                className="max-w-3xl font-display text-2xl leading-snug sm:text-3xl"
                id="maturity-scan-question-title"
              >
                {currentQuestion.prompt}
              </legend>
              <div className="mt-6 grid gap-3">
                {currentQuestion.options.map((option, index) => {
                  const selected = currentAnswer === option.id;
                  return (
                    <label
                      className={`flex cursor-pointer items-start gap-4 rounded-sm border p-4 transition-colors sm:p-5 ${
                        selected
                          ? "border-brand-gold bg-brand-gold/10"
                          : "border-border hover:border-brand-gold/70 hover:bg-surface-muted"
                      }`}
                      key={option.id}
                    >
                      <input
                        checked={selected}
                        className="peer sr-only"
                        name={currentQuestion.id}
                        onChange={() => chooseAnswer(option.id)}
                        type="radio"
                        value={option.id}
                      />
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-gold ${
                          selected
                            ? "border-brand-gold bg-brand-gold text-brand-navy"
                            : "border-border text-muted"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-sm leading-6 sm:text-base">
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-7 flex flex-col-reverse justify-between gap-3 sm:flex-row">
              <button
                className="min-h-12 rounded-sm border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted disabled:opacity-40"
                disabled={questionIndex === 0}
                onClick={() => {
                  setQuestionIndex((index) => index - 1);
                  focusScanStep();
                }}
                type="button"
              >
                Previous question
              </button>
              <button
                className="min-h-12 rounded-sm bg-brand-gold px-6 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!currentAnswer}
                onClick={continueQuestions}
                type="button"
              >
                {questionIndex === questions.length - 1
                  ? "See my results"
                  : "Next question"}
              </button>
            </div>
          </div>
        ) : null}

        {phase === "details" ? (
          <div
            aria-labelledby="maturity-scan-details-title"
            className="scroll-mt-24 grid gap-8 rounded-sm border border-border bg-surface p-5 sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:gap-12"
            ref={scanStepRef}
            role="region"
            tabIndex={-1}
          >
            <div>
              <Eyebrow>One last step</Eyebrow>
              <h2
                className="font-display text-3xl leading-tight sm:text-4xl"
                id="maturity-scan-details-title"
              >
                Your results are ready to build.
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Add your details to see your score, what your answers suggest
                and a recommended next move for each area. We use this
                information to provide your results and follow up about your
                business needs.
              </p>
              <p className="mt-4 text-sm leading-6 text-muted">
                Please do not include sensitive or confidential information.
                Read our{" "}
                <Link
                  className="font-semibold text-brand-gold underline underline-offset-2"
                  href="/privacy"
                >
                  privacy statement
                </Link>
                .
              </p>
            </div>
            <form className="grid content-start gap-4" onSubmit={submitScan}>
              <label className="grid gap-2 text-sm font-semibold">
                Name
                <input
                  autoComplete="name"
                  className="min-h-12 rounded-sm border border-border bg-surface px-3 text-foreground outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                  maxLength={100}
                  onChange={(event) => setName(event.target.value)}
                  required
                  value={name}
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Company
                <input
                  autoComplete="organization"
                  className="min-h-12 rounded-sm border border-border bg-surface px-3 text-foreground outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                  maxLength={150}
                  onChange={(event) => setCompany(event.target.value)}
                  required
                  value={company}
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Work email
                <input
                  autoComplete="email"
                  className="min-h-12 rounded-sm border border-border bg-surface px-3 text-foreground outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                  maxLength={254}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  value={email}
                />
              </label>
              {errorMessage ? (
                <p className="text-sm leading-6 text-status-error" role="alert">
                  {errorMessage}
                </p>
              ) : null}
              <button
                className="mt-1 min-h-12 rounded-sm bg-brand-gold px-5 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-light"
                disabled={submitting}
                type="submit"
              >
                {submitting ? "Preparing your results…" : "Get my modernization snapshot"}
              </button>
              <button
                className="min-h-10 text-sm font-semibold text-muted underline underline-offset-4"
                onClick={() => {
                  setPhase("questions");
                  focusScanStep();
                }}
                type="button"
              >
                Review my answers
              </button>
            </form>
          </div>
        ) : null}

        {phase === "result" && result ? (
          <div className="maturity-scan-report-shell space-y-8">
            <div className="maturity-scan-report space-y-8">
              <div className="maturity-scan-meta grid gap-3 rounded-sm border border-border bg-surface p-4 sm:grid-cols-[minmax(0,1.4fr)_1fr_1fr] sm:items-center sm:gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold">
                    Northstar report
                  </p>
                  <h2 className="mt-1 font-display text-lg leading-tight sm:text-xl">
                    Business modernization maturity scan
                  </h2>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                    Company
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold">
                    {company}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                    Completed
                  </p>
                  <time className="mt-1 block text-sm font-semibold" dateTime={completedAt}>
                    {new Intl.DateTimeFormat(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(completedAt))}
                  </time>
                </div>
              </div>
              <section className="maturity-scan-score-card grid gap-7 overflow-hidden rounded-sm bg-brand-navy p-6 text-white sm:p-9 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
                <div
                  aria-label={`Modernization score: ${result.score} percent`}
                  className="relative mx-auto flex h-44 w-44 items-center justify-center"
                  role="img"
                >
                  <svg
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 112 112"
                  >
                    <circle
                      className="maturity-scan-score-track stroke-white/15"
                      cx="56"
                      cy="56"
                      fill="none"
                      r="45"
                      strokeWidth="8"
                    />
                    <circle
                      className="maturity-scan-score-progress stroke-brand-gold transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none print:hidden"
                      cx="56"
                      cy="56"
                      fill="none"
                      r="45"
                      strokeDasharray={Math.PI * 90}
                      strokeDashoffset={
                        Math.PI * 90 * (1 - animatedScore / 100)
                      }
                      strokeLinecap="round"
                      strokeWidth="8"
                      transform="rotate(-90 56 56)"
                    />
                    <circle
                      className="maturity-scan-score-progress hidden print:inline"
                      cx="56"
                      cy="56"
                      fill="none"
                      r="45"
                      strokeDasharray={Math.PI * 90}
                      strokeDashoffset={
                        Math.PI * 90 * (1 - result.score / 100)
                      }
                      strokeLinecap="round"
                      strokeWidth="8"
                      transform="rotate(-90 56 56)"
                    />
                  </svg>
                  <div className="text-center">
                    <div className="font-display text-5xl leading-none">
                      <span className="print:hidden">{animatedScore}</span>
                      <span className="hidden print:inline">{result.score}</span>
                      <span className="text-2xl">%</span>
                    </div>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/65">
                      Modernization
                    </p>
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <Eyebrow inverse>Your business snapshot</Eyebrow>
                  <h2 className="font-display text-3xl sm:text-4xl">
                    {result.level}
                  </h2>
                  <p className="mx-auto mt-4 max-w-3xl leading-7 text-white/75 lg:mx-0">
                    {result.summary}
                  </p>
                  <p className="mt-4 text-xs leading-5 text-white/55">
                    This is a self-assessment based on your responses, not an
                    audited benchmark, third-party ranking or Gartner assessment.
                  </p>
                </div>
              </section>

              <div className="grid gap-5 md:grid-cols-2">
                <ResultList
                  heading="What is working"
                  intro="Signals of capability already present in your answers."
                  items={result.strengths}
                />
                <ResultList
                  heading="Where to focus"
                  intro="Areas where a practical change may reduce friction or risk."
                  items={result.focusAreas}
                />
              </div>

              <section>
                <div className="mb-5">
                  <Eyebrow>Your next steps</Eyebrow>
                  <h2 className="font-display text-3xl sm:text-4xl">
                    A practical move for each area
                  </h2>
                </div>
                <div className="grid gap-4">
                  {result.dimensions.map((dimension, index) => (
                    <article
                      className="rounded-sm border border-border bg-surface p-5 sm:p-6"
                      key={dimension.id}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.13em] text-brand-gold">
                            Area {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3 className="mt-1 font-display text-xl sm:text-2xl">
                            {dimension.dimension}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            aria-label={`${dimension.dimension} signal strength`}
                            aria-valuemax={4}
                            aria-valuemin={0}
                            aria-valuenow={dimension.score}
                            className="h-2 w-20 overflow-hidden rounded-full bg-surface-muted"
                            role="meter"
                          >
                            <div
                              className={`maturity-signal-fill h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none ${signalColor(dimension.score)}`}
                              style={{
                                width: `${(dimension.score / 4) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs font-bold">
                            {dimension.score}/4
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-muted">
                        <span className="font-semibold text-foreground">
                          Your answer:{" "}
                        </span>
                        {dimension.answer}
                      </p>
                      <div className="mt-4 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-muted">
                            What this suggests
                          </p>
                          <p className="mt-2 text-sm leading-6">
                            {dimension.evidence}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-muted">
                            {dimension.exposure}
                          </p>
                        </div>
                        <div className="rounded-sm bg-surface-muted p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-muted">
                            Suggested next step
                          </p>
                          <p className="mt-2 text-sm leading-6">
                            {dimension.nextStep}
                          </p>
                          <Link
                            className="mt-3 inline-flex text-sm font-bold text-brand-gold underline underline-offset-4"
                            href={dimension.serviceHref}
                          >
                            Explore {dimension.serviceLabel}
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <section className="maturity-scan-feedback grid gap-6 rounded-sm border border-border bg-surface p-5 sm:p-8 lg:grid-cols-[0.8fr_1fr] lg:gap-10">
              <div>
                <Eyebrow>Help us improve</Eyebrow>
                <h2 className="font-display text-2xl sm:text-3xl">
                  How accurate is this snapshot?
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  We record your rating with this scan and send it to our team
                  as a new Business modernization scan inquiry, along with your
                  score and any comment.
                </p>
              </div>
              {feedbackStatus === "sent" ? (
                <p
                  className="self-center text-sm font-semibold text-status-success"
                  role="status"
                >
                  {feedbackMessage}
                </p>
              ) : (
                <form className="grid gap-4" onSubmit={submitFeedback}>
                  <div className="flex flex-wrap gap-2">
                    {feedbackOptions.map((option) => (
                      <button
                        aria-pressed={feedbackRating === option.value}
                        className={`min-h-10 rounded-sm border px-3 py-2 text-sm font-semibold transition-colors ${
                          feedbackRating === option.value
                            ? "border-brand-gold bg-brand-gold/10 text-foreground"
                            : "border-border text-muted hover:border-brand-gold"
                        }`}
                        key={option.value}
                        onClick={() => setFeedbackRating(option.value)}
                        type="button"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <label className="grid gap-2 text-sm font-semibold">
                    Anything we should know? (optional)
                    <textarea
                      className="min-h-24 rounded-sm border border-border bg-surface px-3 py-2 text-foreground outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
                      maxLength={1200}
                      onChange={(event) =>
                        setFeedbackComment(event.target.value)
                      }
                      value={feedbackComment}
                    />
                  </label>
                  {feedbackStatus === "error" ? (
                    <p className="text-sm text-status-error" role="alert">
                      {feedbackMessage}
                    </p>
                  ) : null}
                  <button
                    className="min-h-11 w-fit rounded-sm bg-brand-gold px-5 py-2 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!feedbackRating || feedbackStatus === "sending"}
                    type="submit"
                  >
                    {feedbackStatus === "sending"
                      ? "Sending feedback…"
                      : "Send feedback"}
                  </button>
                </form>
              )}
            </section>

            <div className="maturity-scan-actions flex flex-col items-start gap-4 rounded-sm border border-brand-gold/30 bg-brand-gold/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="font-display text-2xl">
                  Want to turn a finding into a plan?
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Talk through the results with our team and choose a sensible
                  next step for your business.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  className="min-h-12 rounded-sm border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-surface"
                  onClick={printReport}
                  type="button"
                >
                  Print or save as PDF
                </button>
                <ButtonLink className="shrink-0" href="/contact">
                  Discuss your results
                </ButtonLink>
              </div>
            </div>
          </div>
        ) : null}
      </Shell>
    </section>
  );
}

function ResultList({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro: string;
  items: MaturityScanResult["strengths"];
}) {
  return (
    <section className="rounded-sm border border-border bg-surface p-5 sm:p-6">
      <h2 className="font-display text-2xl">{heading}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{intro}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="border-t border-border pt-3" key={item.id}>
            <h3 className="font-semibold">{item.dimension}</h3>
            <p className="mt-1 text-sm leading-6 text-muted">{item.evidence}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function signalColor(score: number) {
  if (score <= 1) return "bg-rose-500";
  if (score === 2) return "bg-amber-500";
  if (score === 3) return "bg-sky-500";
  return "bg-emerald-500";
}
