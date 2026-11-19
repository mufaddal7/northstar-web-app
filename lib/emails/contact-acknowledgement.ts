import { SITE_URL } from "@/lib/site-data";

export function createContactAcknowledgementEmail({
  name,
  interest,
}: {
  name: string;
  interest: string;
}) {
  const safeName = escapeHtml(name);
  const safeInterest = escapeHtml(interest);

  return {
    fromName: "Northstar Client Care",
    subject: "We received your message | Northstar",
    text: [
      `Hello ${name},`,
      "",
      "Thanks for contacting Northstar. We have received your enquiry and a member of our team will review it and get back to you shortly.",
      "",
      `Enquiry type: ${interest}`,
      "",
      "If you need to add anything, reply to this email or contact hello@northstar53.com.",
      "",
      "The Northstar team",
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
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-collapse:collapse;">
            <tr>
              <td style="padding:24px 28px;background:#14243b;color:#ffffff;">
                <p style="margin:0;color:#e3bd67;font-size:12px;font-weight:bold;letter-spacing:2px;">NORTHSTAR</p>
                <p style="margin:8px 0 0;color:#d9e0ea;font-size:12px;">MESSAGE RECEIVED</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 28px;">
                <p style="margin:0 0 10px;color:#98752a;font-size:11px;font-weight:bold;letter-spacing:1.4px;">THANK YOU FOR REACHING OUT</p>
                <h1 style="margin:0 0 16px;color:#14243b;font-size:26px;line-height:1.3;">We have received your message.</h1>
                <p style="margin:0;color:#435168;font-size:15px;line-height:1.7;">Hello ${safeName}, a member of our team will review your enquiry and get back to you shortly.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:22px;background:#f3f5f8;">
                  <tr>
                    <td style="padding:14px 16px;color:#435168;font-size:13px;line-height:1.6;">
                      <strong style="color:#14243b;">Enquiry type</strong><br>
                      ${safeInterest}
                    </td>
                  </tr>
                </table>
                <p style="margin:22px 0 0;color:#5a6678;font-size:13px;line-height:1.7;">If you need to add anything, reply to this email or write to <a href="mailto:hello@northstar53.com" style="color:#14243b;">hello@northstar53.com</a>.</p>
                <p style="margin:22px 0 0;color:#435168;font-size:13px;">The Northstar team</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#f3f5f8;color:#68758a;font-size:11px;">
                <a href="${SITE_URL}" style="color:#14243b;">northstar53.com</a>
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
