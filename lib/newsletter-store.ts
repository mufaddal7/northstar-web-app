import { neon } from "@neondatabase/serverless";
import type { NewsletterSource } from "@/lib/newsletter-ui-state";

type NewsletterRow = {
  google_sheet_synced_at: string | Date | null;
  welcome_email_sent_at: string | Date | null;
};

let sql: ReturnType<typeof neon<false, false>> | undefined;
let tableReady: Promise<void> | undefined;

function getSql() {
  const databaseUrl =
    process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim();
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL or POSTGRES_URL is required for newsletter storage.",
    );
  }

  sql ??= neon(databaseUrl);
  return sql;
}

async function ensureTable() {
  if (!tableReady) {
    tableReady = getSql()`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        email TEXT PRIMARY KEY,
        subscribed_at TIMESTAMPTZ NOT NULL,
        consented_at TIMESTAMPTZ NOT NULL,
        source TEXT NOT NULL,
        google_sheet_synced_at TIMESTAMPTZ,
        welcome_email_sent_at TIMESTAMPTZ
      )
    `
      .then(async () => {
        await getSql()`
          ALTER TABLE newsletter_subscribers
          ADD COLUMN IF NOT EXISTS welcome_email_sent_at TIMESTAMPTZ
        `;
      })
      .then(() => undefined)
      .catch((error: unknown) => {
        tableReady = undefined;
        throw error;
      });
  }
  await tableReady;
}

export async function registerNewsletterSubscriber({
  email,
  consentedAt,
  source,
}: {
  email: string;
  consentedAt: string;
  source: NewsletterSource;
}) {
  await ensureTable();
  const db = getSql();
  const inserted = await db`
    INSERT INTO newsletter_subscribers (
      email,
      subscribed_at,
      consented_at,
      source
    )
    VALUES (
      ${email},
      ${consentedAt}::timestamptz,
      ${consentedAt}::timestamptz,
      ${source}
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING google_sheet_synced_at, welcome_email_sent_at
  `;

  if (inserted.length) {
    return {
      alreadySubscribed: false,
      googleSheetSynced: Boolean(
        (inserted[0] as NewsletterRow).google_sheet_synced_at,
      ),
      welcomeEmailSent: Boolean(
        (inserted[0] as NewsletterRow).welcome_email_sent_at,
      ),
    };
  }

  const existing = await db`
    SELECT google_sheet_synced_at, welcome_email_sent_at
    FROM newsletter_subscribers
    WHERE email = ${email}
    LIMIT 1
  `;
  if (!existing.length) {
    throw new Error("The newsletter subscription could not be verified.");
  }

  return {
    alreadySubscribed: true,
    googleSheetSynced: Boolean(
      (existing[0] as NewsletterRow).google_sheet_synced_at,
    ),
    welcomeEmailSent: Boolean(
      (existing[0] as NewsletterRow).welcome_email_sent_at,
    ),
  };
}

export async function markNewsletterGoogleSheetSynced(email: string) {
  await ensureTable();
  const rows = await getSql()`
    UPDATE newsletter_subscribers
    SET google_sheet_synced_at = NOW()
    WHERE email = ${email}
    RETURNING email
  `;
  return rows.length > 0;
}

export async function markNewsletterWelcomeEmailSent(email: string) {
  await ensureTable();
  const rows = await getSql()`
    UPDATE newsletter_subscribers
    SET welcome_email_sent_at = NOW()
    WHERE email = ${email}
    RETURNING email
  `;
  return rows.length > 0;
}
