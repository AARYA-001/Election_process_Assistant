# Election Process Assistant

A production-grade, AI-powered civic education web app that helps users understand the US election process.

## Features

- 🤖 **AI Chat** — Ask election questions, powered by Google Gemini 1.5 Flash (streaming SSE)
- 📅 **Interactive Timeline** — Step-by-step election process from registration to inauguration
- 📋 **Voter Registration Wizard** — Guided walkthrough with state-specific information
- 🗺️ **Polling Place Finder** — Google Maps + Civic Information API integration
- 📆 **Calendar Integration** — Add key dates to Google Calendar with one click
- ⏰ **Election Countdown** — Live countdown to the next presidential election
- ❓ **FAQ Section** — Common election questions with expandable answers

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vite + TypeScript (Vanilla TS) |
| Backend | Node.js + Express (hardened) |
| AI | Google Gemini 1.5 Flash (streaming SSE) |
| Cache/Rate Limit | Upstash Redis |
| Maps | Google Maps JS API |
| Civic Data | Google Civic Information API (server-side proxy) |

## Quick Start

### 1. Clone and install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment

```bash
cp .env.example backend/.env
# Edit backend/.env with your API keys
```

### 3. Run development servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies API requests to `http://localhost:3000`.

## API Keys Required

| Key | Where to get it | Used by |
|-----|----------------|---------|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) | Backend (server-side) |
| `GOOGLE_CIVIC_API_KEY` | [Google Cloud Console](https://console.cloud.google.com) | Backend (server-side) |
| `UPSTASH_REDIS_REST_URL` | [Upstash Console](https://console.upstash.com) | Backend (rate limiting + cache) |
| `UPSTASH_REDIS_REST_TOKEN` | [Upstash Console](https://console.upstash.com) | Backend (rate limiting + cache) |
| `VITE_GOOGLE_MAPS_API_KEY` | [Google Cloud Console](https://console.cloud.google.com) | Frontend (client-side, referrer-locked) |

## Security

- All sensitive API keys are server-side only
- Google Maps API key is HTTP referrer-locked
- Prompt injection detection on all chat inputs
- DOMPurify sanitization on all AI output
- Redis-distributed rate limiting
- Helmet + strict CSP headers
- Domain-locked CORS
- Request body size limits

## License

MIT
