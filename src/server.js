import dotenv from "dotenv";
dotenv.config();


import express from "express";
import bodyParser from "body-parser";
import { callOpenAI } from "./openaiParser.js";
import { appendToSheet } from "./sheets.js";
import { extractTextFromFile } from "./fileHandler.js";
import axios from "axios";

// Suppress pdfjs-dist font warnings
const originalWarn = console.warn;
console.warn = (msg, ...args) => {
  if (typeof msg === "string" && msg.includes("standardFontDataUrl")) return;
  originalWarn(msg, ...args);
};


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));




app.post("/webhook", async (req, res) => {
    try {
      const message = req.body.Body;
      const from = req.body.From;
      const numMedia = parseInt(req.body.NumMedia);
  
      let textContent = "";
  
      if (numMedia > 0) {
        // 📄 Resume file received
        const fileUrl = req.body.MediaUrl0;
        const fileType = req.body.MediaContentType0;
        const response = await axios.get(fileUrl, {
          responseType: "arraybuffer",
          auth: {
            username: process.env.TWILIO_ACCOUNT_SID,
            password: process.env.TWILIO_AUTH_TOKEN,
          },
        });
        textContent = await extractTextFromFile(response.data, fileType);
      } else {
        // 💬 Text message
        textContent = message;
      }
  
      // 🧠 Parse text using OpenAI
      const parsedData = await callOpenAI(textContent);
  
      // 📊 Store parsed data in Google Sheets
      await appendToSheet(parsedData);
  
      // 💬 Send reply to user
      const twimlResponse = `
        <Response>
          <Message>✅ Resume processed successfully! Data saved.</Message>
        </Response>
      `;
      res.type("text/xml");
      res.send(twimlResponse);
  
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Internal Server Error");
    }
  });



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});