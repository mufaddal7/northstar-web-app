import type { MaturityScanResult } from "@/lib/maturity-scan";
import { SITE_URL } from "@/lib/site-data";

export function createMaturityReportEmail({
  company,
  completedAt,
  result,
}: {
  company: string;
  completedAt: string;
  result: MaturityScanResult;
}) {
  const completedLabel = `${new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(completedAt))} UTC`;
  const textStrengths = result.strengths
    .map((item) => `${item.dimension}\n${item.evidence}`)
    .join("\n\n");
  const textFocusAreas = result.focusAreas
    .map((item) => `${item.dimension}\n${item.evidence}`)
    .join("\n\n");
  const textDimensions = result.dimensions
    .map(
      (item, index) =>
        `Area ${String(index + 1).padStart(2, "0")}: ${item.dimension} (${item.score}/4)\n` +
        `Your answer: ${item.answer}\n` +
        `What this suggests: ${item.evidence}\n` +
        `${item.exposure}\n` +
        `Suggested next step: ${item.nextStep}\n` +
        `Explore ${item.serviceLabel}: ${SITE_URL}${item.serviceHref}`,
    )
    .join("\n\n");

  const strengthCards = result.strengths
    .map(
      (item) => `<tr>
        <td style="padding:14px;border:1px solid #e1e6ed;">
          <h3 style="margin:0;color:#14243b;font-size:15px;">${escapeHtml(item.dimension)}</h3>
          <p style="margin:7px 0 0;color:#5a6678;font-size:13px;line-height:1.6;">${escapeHtml(item.evidence)}</p>
        </td>
      </tr>`,
    )
    .join("");
  const focusCards = result.focusAreas
    .map(
      (item) => `<tr>
        <td style="padding:14px;border:1px solid #e1e6ed;">
          <h3 style="margin:0;color:#14243b;font-size:15px;">${escapeHtml(item.dimension)}</h3>
          <p style="margin:7px 0 0;color:#5a6678;font-size:13px;line-height:1.6;">${escapeHtml(item.evidence)}</p>
        </td>
      </tr>`,
    )
    .join("");
  const dimensionCards = result.dimensions
    .map(
      (item, index) => `<tr>
        <td style="padding:18px;border:1px solid #e1e6ed;">
          <p style="margin:0;color:#98752a;font-size:10px;font-weight:bold;letter-spacing:1.2px;">AREA ${String(index + 1).padStart(2, "0")} · ${item.score}/4</p>
          <h3 style="margin:7px 0 12px;color:#14243b;font-size:18px;">${escapeHtml(item.dimension)}</h3>
          <p style="margin:0 0 8px;color:#243247;font-size:13px;line-height:1.65;"><strong>Your answer:</strong> ${escapeHtml(item.answer)}</p>
          <p style="margin:0 0 8px;color:#243247;font-size:13px;line-height:1.65;"><strong>What this suggests:</strong> ${escapeHtml(item.evidence)}</p>
          <p style="margin:0 0 12px;color:#5a6678;font-size:13px;line-height:1.65;">${escapeHtml(item.exposure)}</p>
          <p style="margin:0 0 12px;padding:12px;background:#f3f5f8;color:#243247;font-size:13px;line-height:1.65;"><strong>Suggested next step:</strong> ${escapeHtml(item.nextStep)}</p>
          <a href="${escapeHtml(`${SITE_URL}${item.serviceHref}`)}" style="color:#14243b;font-size:13px;font-weight:bold;">Explore ${escapeHtml(item.serviceLabel)}</a>
        </td>
      </tr>
      <tr><td height="12" style="font-size:0;line-height:0;">&nbsp;</td></tr>`,
    )
    .join("");

  return {
    fromName: "Northstar Modernization Scan",
    subject: "Your Northstar business modernization report",
    text: [
      "NORTHSTAR BUSINESS MODERNIZATION MATURITY SCAN",
      `Company: ${company}`,
      `Completed: ${completedLabel}`,
      "",
      `Modernization score: ${result.score}%`,
      `Maturity level: ${result.level}`,
      "",
      result.summary,
      "",
      "This is a self-assessment based on your responses, not an audited benchmark, third-party ranking or Gartner assessment.",
      "",
      "WHAT IS WORKING",
      textStrengths,
      "",
      "WHERE TO FOCUS",
      textFocusAreas,
      "",
      "YOUR NEXT STEPS",
      textDimensions,
      "",
      `Discuss your results: ${SITE_URL}/contact`,
      "",
      "Northstar helps organizations connect business priorities with practical technology decisions.",
      SITE_URL,
    ].join("\n"),
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="margin:0;padding:24px 12px;background:#f3f5f8;font-family:Arial,Helvetica,sans-serif;color:#243247;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f5f8;">
      <tr>
        <td align="center">
          <table role="presentation" width="680" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;background:#ffffff;border-collapse:collapse;">
            <tr>
              <td style="padding:24px 28px;background:#14243b;color:#ffffff;">
                <p style="margin:0;color:#e3bd67;font-size:12px;font-weight:bold;letter-spacing:2px;">NORTHSTAR</p>
                <p style="margin:8px 0 0;color:#d9e0ea;font-size:12px;">BUSINESS MODERNIZATION MATURITY SCAN</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 18px;">
                <p style="margin:0;color:#5a6678;font-size:13px;line-height:1.6;">${escapeHtml(company)} · Completed ${escapeHtml(completedLabel)}</p>
                <h1 style="margin:8px 0 0;color:#14243b;font-size:26px;line-height:1.3;">Your business snapshot</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#14243b;">
                  <tr>
                    <td style="padding:22px;color:#ffffff;">
                      <p style="margin:0;color:#e3bd67;font-size:12px;font-weight:bold;letter-spacing:1px;">MODERNIZATION SCORE</p>
                      <p style="margin:8px 0 0;font-size:38px;font-weight:bold;line-height:1.1;">${result.score}% <span style="font-size:20px;font-weight:normal;">· ${escapeHtml(result.level)}</span></p>
                      <p style="margin:14px 0 0;color:#e1e7ef;font-size:14px;line-height:1.7;">${escapeHtml(result.summary)}</p>
                    </td>
                  </tr>
                </table>
                <p style="margin:10px 0 0;color:#68758a;font-size:11px;line-height:1.6;">This is a self-assessment based on your responses, not an audited benchmark, third-party ranking or Gartner assessment.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 28px 20px;">
                <h2 style="margin:0 0 12px;color:#14243b;font-size:19px;">What is working</h2>
                <p style="margin:0 0 12px;color:#5a6678;font-size:13px;line-height:1.6;">Signals of capability already present in your answers.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${strengthCards}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 28px 20px;">
                <h2 style="margin:0 0 12px;color:#14243b;font-size:19px;">Where to focus</h2>
                <p style="margin:0 0 12px;color:#5a6678;font-size:13px;line-height:1.6;">Areas where a practical change may reduce friction or risk.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${focusCards}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 28px 20px;">
                <h2 style="margin:0 0 12px;color:#14243b;font-size:19px;">Your next steps</h2>
                <p style="margin:0 0 12px;color:#5a6678;font-size:13px;line-height:1.6;">A practical move for each area.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${dimensionCards}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px;background:#f3f5f8;">
                <h2 style="margin:0 0 8px;color:#14243b;font-size:18px;">Turn a finding into a plan</h2>
                <p style="margin:0 0 16px;color:#5a6678;font-size:13px;line-height:1.65;">Talk through the results with our team and choose a sensible next step for your business.</p>
                <a href="${SITE_URL}/contact" style="display:inline-block;padding:12px 18px;background:#e3bd67;color:#14243b;font-size:13px;font-weight:bold;text-decoration:none;">Discuss your results</a>
                <p style="margin:18px 0 0;color:#68758a;font-size:11px;line-height:1.6;">Northstar helps organizations connect business priorities with practical technology decisions.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}
