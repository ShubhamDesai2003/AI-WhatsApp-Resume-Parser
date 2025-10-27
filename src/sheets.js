import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";


const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(fs.readFileSync(process.env.GOOGLE_CREDENTIALS_PATH)),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

function normalize(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return value ?? "";
}

async function ensureHeaderRow() {
  const HEADER_VALUES = [["Name", "Email", "Phone", "Education", "Skills"]];
  const spreadsheetId = process.env.SHEET_ID;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:E1",
  });
  const currentHeaders = res.data.values?.[0] || [];
  if (currentHeaders.length === 0) {
    console.log("🧾 Setting up header row for the first time...");
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1:E1",
      valueInputOption: "RAW",
      resource: { values: HEADER_VALUES },
    });
  }
}

export async function appendToSheet(data) {
  try {
    await ensureHeaderRow();
    const values = [[
      normalize(data.name),
      normalize(data.email),
      normalize(data.phone),
      normalize(data.education),
      normalize(data.skills)
    ]];
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A:E",
      valueInputOption: "USER_ENTERED",
      resource: { values },
    });
    console.log("✅ Data added to Google Sheet:", values[0]);
  } catch (err) {
    console.error("❌ Error appending data to Google Sheet:", err.message);
  }
}
