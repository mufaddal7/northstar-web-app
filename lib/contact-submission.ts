export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  interest: string;
  challenge: string;
};

export type ContactSubmissionResult =
  | { success: true }
  | { success: false; status: 500 | 502 };

export async function forwardContactSubmission(
  values: ContactSubmission,
  requestId: string,
): Promise<ContactSubmissionResult> {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const apiSecret = process.env.GOOGLE_SCRIPT_SECRET;

  if (!scriptUrl || !apiSecret) {
    console.error(
      `[contact:${requestId}] Google Sheets integration is not configured.`,
    );
    return { success: false, status: 500 };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: apiSecret,
        name: values.name,
        workEmail: values.email,
        company: values.company,
        interest: values.interest,
        challenge: values.challenge,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    const responseText = await response.text();
    let result: { success?: unknown; error?: unknown } | null = null;
    try {
      const parsed: unknown = JSON.parse(responseText);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        result = parsed as { success?: unknown; error?: unknown };
      }
    } catch {
      // The response body is not logged because it may contain submitted data.
    }

    if (!response.ok || result?.success !== true) {
      const upstreamError =
        typeof result?.error === "string"
          ? result.error
          : "Invalid Apps Script response.";
      console.error(
        `[contact:${requestId}] Apps Script rejected submission (HTTP ${response.status}): ${upstreamError}`,
      );
      return { success: false, status: 502 };
    }

    console.info(
      `[contact:${requestId}] Apps Script confirmed the contact submission (HTTP ${response.status}).`,
    );
    return { success: true };
  } catch (error) {
    console.error(`[contact:${requestId}] Contact submission failed:`, error);
    return { success: false, status: 502 };
  }
}
