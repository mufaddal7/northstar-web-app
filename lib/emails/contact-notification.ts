type ContactDetails = {
  name: string;
  email: string;
  company: string;
  interest: string;
  challenge: string;
};

export function createContactNotificationEmail(values: ContactDetails) {
  const challengeHtml = escapeHtml(values.challenge).replace(/\r?\n/g, "<br>");

  return {
    fromName: "Northstar Contact",
    subject: `New Northstar enquiry: ${values.interest}`,
    text: [
      "A new Northstar website enquiry was received.",
      "",
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company}`,
      `Interest: ${values.interest}`,
      "",
      "Message:",
      values.challenge,
    ].join("\n"),
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="margin:0;padding:24px 12px;background:#f3f5f8;font-family:Arial,Helvetica,sans-serif;color:#243247;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-collapse:collapse;">
            <tr>
              <td style="padding:22px 28px;background:#14243b;color:#ffffff;">
                <p style="margin:0;color:#e3bd67;font-size:12px;font-weight:bold;letter-spacing:2px;">NORTHSTAR</p>
                <h1 style="margin:10px 0 0;font-size:21px;line-height:1.35;">New website enquiry</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:14px;line-height:1.6;">
                  ${detailRow("Name", values.name)}
                  ${detailRow("Email", values.email, `mailto:${values.email}`)}
                  ${detailRow("Company", values.company)}
                  ${detailRow("Interest", values.interest)}
                </table>
                <h2 style="margin:24px 0 8px;color:#14243b;font-size:16px;">Message</h2>
                <p style="margin:0;padding:16px;border:1px solid #e1e6ed;color:#435168;font-size:14px;line-height:1.7;">${challengeHtml}</p>
                <p style="margin:20px 0 0;font-size:14px;">
                  <a href="mailto:${escapeHtml(values.email)}" style="color:#14243b;font-weight:bold;">Reply to ${escapeHtml(values.name)}</a>
                </p>
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

function detailRow(label: string, value: string, href?: string) {
  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:#14243b;">${escapeHtml(value)}</a>`
    : escapeHtml(value);

  return `<tr>
    <th align="left" style="width:100px;padding:8px 12px 8px 0;color:#68758a;font-weight:normal;vertical-align:top;">${escapeHtml(label)}</th>
    <td style="padding:8px 0;color:#243247;word-break:break-word;">${content}</td>
  </tr>`;
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
