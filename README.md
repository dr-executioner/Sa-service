# Sentiment Analysis API – Gemini Powered

A robust Node.js + TypeScript backend service for sentiment analysis, designed to intelligently filter and process messages from a portfolio’s “Contact Me” section. AI-powered, built with Railway cloud support, Docker-ready, and equipped with anti-abuse mechanisms for real-world deployment.

---

## 🚀 Features

- **Google Gemini Integration**: Uses Gemini generative AI to classify the usefulness and tone of incoming messages.
- **Intelligent Filtering**: Automatically screens out messages containing slang, random spam, or low-effort text before forwarding.

*Coming Soon*
- **Email Forwarding**: "Fruitful" messages are sent to my email address; others are silently discarded.
- **Full Submission Logging**: All messages, regardless of sentiment, are stored in a connected database for auditing.
- **Spam Protection**: Includes backend rate limiting and frontend anti-abuse features like throttling and honeypot fields.

---

## 🛠️ Tech Stack

- Node.js / Express.js
- TypeScript
- Google Gemini API (`@google/genai`)
- Railway (deployment)
- Docker (local development & deployment)
- Environment variables for API secrets

---

## 📝 API Usage

**Endpoint:**  
`POST /api/analyse`

**Request Example:**
