import { randomUUID } from "node:crypto";

type EmailMessage = {
  to: string;
  fromName: string;
  subject: string;
  text: string;
  html: string;
};

type OAuthTokenResponse = {
  access_token?: unknown;
};

export async function sendEmail({
  to,
  fromName,
  subject,
  text,
  html,
}: EmailMessage) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim();
  const configuredFrom =
    process.env.EMAIL_FROM?.trim() || "hello@northstar53.com";
  const fromAddress =
    configuredFrom.match(/<([^<>]+)>/)?.[1]?.trim() ?? configuredFrom;
  const replyTo =
    process.env.EMAIL_REPLY_TO?.trim() || "hello@northstar53.com";

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Google Gmail API OAuth credentials are not configured.",
    );
  }

  validateHeader(to, "recipient");
  validateHeader(fromName, "sender name");
  validateHeader(subject, "subject");
  validateHeader(fromAddress, "sender");
  validateHeader(replyTo, "reply-to");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    throw new Error("The email recipient is invalid.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromAddress)) {
    throw new Error("The configured sender address is invalid.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
    throw new Error("The configured reply-to address is invalid.");
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  const tokenPayload: unknown = await tokenResponse.json().catch(() => null);
  if (
    !tokenResponse.ok ||
    !isRecord(tokenPayload) ||
    typeof tokenPayload.access_token !== "string"
  ) {
    throw new Error(
      `Google OAuth token refresh failed (HTTP ${tokenResponse.status}).`,
    );
  }

  const boundary = `northstar_${randomUUID().replace(/-/g, "")}`;
  const mimeMessage = [
    `From: =?UTF-8?B?${Buffer.from(fromName, "utf8").toString("base64")}?= <${fromAddress}>`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    foldBase64(Buffer.from(text, "utf8").toString("base64")),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    foldBase64(Buffer.from(html, "utf8").toString("base64")),
    `--${boundary}--`,
    "",
  ].join("\r\n");
  const raw = Buffer.from(mimeMessage, "utf8").toString("base64url");

  const sendResponse = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenPayload.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    },
  );

  if (!sendResponse.ok) {
    throw new Error(`Gmail API send failed (HTTP ${sendResponse.status}).`);
  }
}

function foldBase64(value: string) {
  return value.match(/.{1,76}/g)?.join("\r\n") ?? "";
}

function validateHeader(value: string, label: string) {
  if (!value || /[\r\n]/.test(value)) {
    throw new Error(`The email ${label} is invalid.`);
  }
}

function isRecord(value: unknown): value is OAuthTokenResponse {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
