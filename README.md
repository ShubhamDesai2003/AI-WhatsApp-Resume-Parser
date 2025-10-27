# 🤖 AI-Powered WhatsApp Resume Parser

**Candidate:** Shubham Desai  
**Email:** shubhamdesaai01@gmail.com  
**Contact:** 7620268492  
**Project Date:** October 27, 2025  

---

## 📋 Project Overview
This project was created as part of the **Zigme AI × WhatsApp Integration Assignment**.  
It demonstrates how **AI and automation** can simplify resume management by automatically reading messages or resume files received on WhatsApp, extracting important candidate details, and storing them in a structured **Google Sheet**.

---

## 🎯 Objective
To develop a demo system that:
- Reads incoming WhatsApp messages or resume files (PDF/DOCX)
- Extracts candidate details like **Name**, **Email**, **Phone**, **Education**, and **Skills**
- Uses **AI** (Google Gemini) for intelligent text parsing
- Stores the data automatically in **Google Sheets** for easy review and management

---

## ⚙️ System Architecture
WhatsApp → Twilio API → Node.js (Express) → Gemini AI → Google Sheets

yaml
Copy code

1. **Twilio WhatsApp Sandbox API** handles incoming messages and resume files.  
2. **Node.js + Express** backend processes the webhook requests.  
3. **pdfjs-dist** and **mammoth** extract readable text from resumes.  
4. **Google Gemini 2.5 Flash API** converts raw text into structured JSON data.  
5. **Google Sheets API** stores parsed data automatically in a spreadsheet.

---

## 🧰 Tools & Technologies Used
| Category | Tools / Libraries |
|-----------|------------------|
| **Backend** | Node.js, Express.js |
| **AI / NLP** | Google Gemini 2.5 Flash API |
| **Messaging** | Twilio WhatsApp Sandbox API |
| **File Handling** | pdfjs-dist, mammoth |
| **Data Storage** | Google Sheets API |
| **Environment** | dotenv, ngrok |

---

## 🚀 Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/AI-WhatsApp-Resume-Parser.git
cd AI-WhatsApp-Resume-Parser
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Configure Environment Variables
Create a .env file and add your credentials:

ini
Copy code
PORT=3000
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth
GEMINI_API_KEY=your_gemini_key
SHEET_ID=your_google_sheet_id
GOOGLE_CREDENTIALS_PATH=./credentials.json
4️⃣ Run the Server
bash
Copy code
node src/server.js
5️⃣ Expose the Server Publicly
Use ngrok to generate a public URL:

bash
Copy code
ngrok http 3000
Copy the generated HTTPS link and update your Twilio Sandbox webhook:

arduino
Copy code
https://<your-ngrok-url>/webhook
💬 How It Works
A user sends a WhatsApp message or uploads a resume file.

Twilio forwards the data to the Node.js server via webhook.

The server extracts text, processes it with Gemini AI, and stores structured details in Google Sheets.

Logs show each successful operation in real time.

🧠 What the Demo Achieves
This demo showcases how AI and automation can optimize recruitment by eliminating repetitive tasks.
Instead of manually copying details from resumes, this system:

Automatically reads and parses candidate resumes

Extracts structured data accurately

Saves time and reduces manual errors

Provides real-time updates to a Google Sheet

It’s a simple yet powerful demonstration of how AI can enhance real-world workflows through intelligent automation.