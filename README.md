# LMS AI Assistant Demo

A standalone, frontend-only demonstration of the LMS interface.

## What this repository contains
- Next.js frontend copied from the LMS feature branch.
- No login page: the app opens directly on the dashboard.
- Demo identity and sample data are initialized locally in the browser.
- API requests are intercepted by the demo runtime and answered with mock data.
- AI assistant replies are simulated; no Groq/OpenAI key or AI backend is used.

## Run locally
```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Important
This is a visual and interactive demo only. Changes are not persisted to a real database. It does not connect to the production LMS backend, PostgreSQL/Neon, Qdrant, Cloudinary, or external AI services.

The original production repository is independent and has not been modified.
