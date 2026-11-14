const SHEET_NAME = "Responses";

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    const expectedSecret =
      PropertiesService.getScriptProperties().getProperty("API_SECRET");

    const data = JSON.parse(e.postData.contents || "{}");

    // Verify that the request came through your Next.js backend.
    if (!expectedSecret || data.secret !== expectedSecret) {
      return jsonResponse({ success: false, error: "Unauthorized" });
    }

    const name = cleanText(data.name, 100);
    const email = cleanText(data.workEmail, 254).toLowerCase();
    const company = cleanText(data.company, 150);
    const interest = cleanText(data.interest, 100);
    const challenge = cleanText(data.challenge, 5000);

    const allowedOptions = [
      "Modernize existing systems",
      "Data & Analytics",
      "AI & Automation",
      "Build a digital product",
      "Technology Strategy",
      "Something else",
    ];

    if (!name || !company || !challenge) {
      return jsonResponse({
        success: false,
        error: "Please complete all required fields.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({
        success: false,
        error: "Please provide a valid work email.",
      });
    }

    if (!allowedOptions.includes(interest)) {
      return jsonResponse({
        success: false,
        error: "Invalid inquiry category.",
      });
    }

    lock.waitLock(10000);

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
      "1LYxAmctYfTES26f8fc9UVPHJPpzknWZqMQK0itgh2mk",
    );

    if (!spreadsheetId) {
      throw new Error("Missing SPREADSHEET_ID configuration.");
    }

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("Responses worksheet not found.");
    }

    sheet.appendRow([
      new Date(),
      safeCell(name),
      safeCell(email),
      safeCell(company),
      safeCell(interest),
      safeCell(challenge),
    ]);

    return jsonResponse({ success: true });
  } catch (error) {
    console.error(error);

    return jsonResponse({
      success: false,
      error: "Unable to process your submission.",
    });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

// Prevent submitted text from being interpreted as a spreadsheet formula.
function safeCell(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
