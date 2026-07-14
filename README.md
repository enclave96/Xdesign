# Xdesign

AI-powered design analysis platform. Upload screenshots, images, PDFs, Figma exports, or live website URLs and receive detailed usability and accessibility reports.

## Live Demo

**https://sculpture-above-computation-bibliography.trycloudflare.com**

> Demo account: `demo@xdesign.app` / `demo1234`

The live demo runs via Cloudflare Tunnel from this cloud environment. For persistent hosting, deploy using Docker (`Dockerfile`) or Render (`render.yaml`).

## Features

- **Multi-format upload** — Drag & drop images, PDFs, screenshots, Figma exports, or paste a live website URL
- **Comprehensive analysis** — Visual hierarchy, navigation, readability, consistency, interaction clarity, WCAG compliance, color contrast, typography, and touch-target sizing
- **Interactive reports** — Overall scores, severity levels, annotated design previews, and actionable recommendations
- **Project history** — Save and revisit past analyses
- **Downloadable reports** — Export full HTML reports

## Tech Stack

- **Frontend** — Next.js 14, React, TypeScript, Tailwind CSS, liquid glass UI
- **Backend** — Next.js API routes, Prisma, SQLite, Sharp image processing
- **Auth** — JWT with HTTP-only cookies

## Quick Start (Local)

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Initialize database
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm run start
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Prisma database URL (default: `file:./dev.db`) |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `UPLOAD_DIR` | Directory for uploaded files (default: `./uploads`) |
| `CHROMIUM_PATH` | Optional path to Chromium for website screenshots |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/projects` | List projects |
| POST | `/api/projects` | Upload design or submit URL |
| POST | `/api/projects/[id]/analyze` | Start analysis |
| GET | `/api/analyses/[id]` | Get analysis results |
| GET | `/api/analyses/[id]/report` | Download HTML report |

## License

MIT
