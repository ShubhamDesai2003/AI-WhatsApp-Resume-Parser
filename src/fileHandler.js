import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.standardFontDataUrl = `node_modules/pdfjs-dist/standard_fonts/`;
import mammoth from "mammoth";
import { Buffer } from "node:buffer";

export async function extractTextFromFile(fileBuffer, fileType) {
  try {
    if (fileType.includes("pdf")) {
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileBuffer) });
      const pdf = await loadingTask.promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ") + "\n";
      }

      console.log("✅ PDF text extracted successfully (pdfjs-dist)");
      return text;

    } else if (fileType.includes("word") || fileType.includes("docx")) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      console.log("✅ Word text extracted successfully");
      return result.value;
    } else {
      console.warn("⚠️ Unsupported file type:", fileType);
      return "";
    }
  } catch (error) {
    console.error("❌ Error extracting text:", error.message);
    return "";
  }
}
