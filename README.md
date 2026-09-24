# Kshitij Gemini Agent

Google Gen AI track submission for Kshitij, IIT Kharagpur.

Author: Parth Pariwandh, Jadavpur University.

A streaming Gemini chat client with conversation memory, a small typed React surface, and a Vite build that reads the key from the environment instead of hardcoding it.

## Stack

| Layer | Choice |
| :--- | :--- |
| UI | React 19 + TypeScript |
| Bundler | Vite 6 |
| Model | Gemini 2.5 Flash via `@google/genai` |
| Styling | Tailwind (CDN in `index.html`) |

## Setup

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`.
3. Install and run:

```bash
npm install
npm run dev
```

The app listens on `http://localhost:3000`.

```bash
npm run build
npm run preview
```

## Layout

```
.
├── App.tsx
├── services/gemini.ts
├── hooks/useChatSession.ts
├── components/
├── types.ts
├── index.html
└── vite.config.ts
```

## Behaviour

The session is created once and reused, so Gemini keeps turn history.

Replies stream token by token into the last model bubble.

Transcripts persist in `localStorage` under `kshitij-gemini-session`.

Clear chat resets the UI and starts a fresh Gemini chat object.

The API key stays in `.env.local`. Vite injects it at build time. The key is never committed.

## Event note

This repository is the Kshitij / Google Gen AI app. The Amazon ML Challenge 2026 entity resolution work lives in a separate repository: `Xminati-Amazon-ML-Challenge-2026`.
