import { SITE_URL } from "@/lib/site-data";

type NewsletterArticle = {
  title: string;
  summary: string;
  url: string;
};

export function createNewsletterWelcomeEmail(
  articles: NewsletterArticle[],
) {
  const unsubscribeUrl =
    "mailto:hello@northstar53.com?subject=Unsubscribe%20from%20Northstar%20updates";
  const textArticles = articles
    .map((article) => `${article.title}\n${article.summary}\n${article.url}`)
    .join("\n\n");
  const articleCards = articles
    .map(
      (article) => `
        <tr>
          <td style="padding:16px;border:1px solid #e1e6ed;">
            <a href="${escapeHtml(article.url)}" style="color:#14243b;font-size:16px;font-weight:bold;line-height:1.45;text-decoration:underline;">${escapeHtml(article.title)}</a>
            <p style="margin:8px 0 0;color:#5a6678;font-size:13px;line-height:1.6;">${escapeHtml(article.summary)}</p>
          </td>
        </tr>
        <tr><td height="12" style="font-size:0;line-height:0;">&nbsp;</td></tr>
      `,
    )
    .join("");

  return {
    subject: "Thanks for subscribing to Northstar",
    text: [
      "Hello,",
      "",
      "Thanks for subscribing to Northstar. We will occasionally share practical news and insights on business systems, data and technology.",
      "",
      "Recent news and insights:",
      textArticles || `${SITE_URL}/news`,
      "",
      "Northstar helps organizations navigate the space between business ambition and technology execution.",
      `Learn more: ${SITE_URL}/about`,
      "",
      `To stop receiving updates, reply to this email or email hello@northstar53.com: ${unsubscribeUrl}`,
      "",
      "The Northstar team",
    ].join("\n"),
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="margin:0;padding:0;background:#f3f5f8;font-family:Arial,Helvetica,sans-serif;color:#243247;">
    <div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">Practical news and insights on business systems, data and technology.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f5f8;">
      <tr>
        <td align="center" style="padding:28px 12px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-collapse:collapse;">
            <tr>
              <td style="padding:25px 32px;background:#14243b;color:#ffffff;">
                <p style="margin:0;color:#e3bd67;font-size:12px;font-weight:bold;letter-spacing:2px;">NORTHSTAR</p>
                <p style="margin:7px 0 0;color:#d9e0ea;font-size:12px;">NEWS AND INSIGHTS</p>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 32px 18px;">
                <p style="margin:0 0 10px;color:#98752a;font-size:11px;font-weight:bold;letter-spacing:1.5px;">WELCOME</p>
                <h1 style="margin:0 0 16px;color:#14243b;font-size:28px;line-height:1.25;">Thanks for subscribing.</h1>
                <p style="margin:0;color:#435168;font-size:16px;line-height:1.7;">We are glad you are here. From time to time, we will share practical perspectives on business systems, data, cybersecurity and technology decisions.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 32px 8px;">
                <h2 style="margin:0 0 14px;color:#14243b;font-size:18px;">Recent news and insights</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  ${articleCards}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 30px;">
                <h2 style="margin:0 0 9px;color:#14243b;font-size:18px;">A little about Northstar</h2>
                <p style="margin:0 0 17px;color:#435168;font-size:14px;line-height:1.7;">We help organizations connect business priorities with practical technology decisions across modernization, ERP, data and digital products.</p>
                <a href="${SITE_URL}/about" style="display:inline-block;padding:12px 18px;background:#e3bd67;color:#14243b;font-size:13px;font-weight:bold;text-decoration:none;">Get to know Northstar</a>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f3f5f8;color:#5a6678;font-size:12px;line-height:1.7;">
                <p style="margin:0 0 8px;">You subscribed to Northstar updates on our website. We will only send occasional news and insights.</p>
                <p style="margin:0;">To stop receiving updates, <a href="${unsubscribeUrl}" style="color:#14243b;text-decoration:underline;">unsubscribe by email</a> or reply with "unsubscribe".</p>
                <p style="margin:12px 0 0;">Northstar · <a href="${SITE_URL}" style="color:#14243b;">northstar53.com</a> · <a href="mailto:hello@northstar53.com" style="color:#14243b;">hello@northstar53.com</a></p>
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
