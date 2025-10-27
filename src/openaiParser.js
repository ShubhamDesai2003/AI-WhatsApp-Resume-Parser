// ============================================
// ✅ Gemini Resume Parser (Stable JSON Version)
// ============================================

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function callOpenAI(textContent) {
  const prompt = `
Extract the following fields from the given text:
Full Name, Email, Phone, Education, and Skills.

Return the result **only in valid JSON format** like this:
{
  "name": "Full Name",
  "email": "Email Address",
  "phone": "Phone Number",
  "education": "Highest Qualification or Degree",
  "skills": ["Skill1", "Skill2", "Skill3"]
}

Text:
${textContent}
`;

  try {
    const result = await model.generateContent(prompt);
    let output = result.response.text().trim();

    // 🧹 Sanitize Gemini markdown output (remove ```json and ``` blocks)
    output = output
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsed = JSON.parse(output);
      console.log("✅ Gemini JSON Parsed Successfully:", parsed);
      return parsed;
    } catch (err) {
      console.warn("⚠️ Gemini returned unparseable output:", output);
      return { raw_output: output };
    }

  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    return { error: error.message };
  }
}
