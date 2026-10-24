# PathLab India — Career Discovery Platform (Classes 9–12)
### Full-Stack Implementation with React, Node.js, SQLite, and Google Gemma 4

[![Build Status](https://img.shields.io/badge/Build-Passing-emerald)](https://github.com)
[![Vitest Coverage](https://img.shields.io/badge/Tests-13%2F13%20Passed-blue)](https://vitest.dev)
[![AI Model](https://img.shields.io/badge/AI-Gemma%204%20(31B)--it%3Anovita-purple)](https://huggingface.co/google/gemma-4-31B-it)
[![Focus](https://img.shields.io/badge/Education-CBSE%20%7C%20ICSE%20%7C%20State%20Boards-orange)](https://ncert.nic.in)

---

## 1. Overview & Objective

**PathLab India** is an intelligent, transparent, and privacy-first career discovery web application engineered specifically for Indian high school students (Classes 9–12, ages 14–18).

The platform tackles a critical challenge in Indian secondary education: students often select high-stakes academic streams (Science PCM, Science PCB, Commerce with/without Math, Humanities) under intense societal pressure without structured exposure to diverse careers, verified national entrance examinations, educational pathways, or practical micro-experiences of what professionals actually do day-to-day.

### Core Capabilities:
1. **Holland RIASEC + Academic Stream Engine**: Transparent mathematical recommender scoring student affinity across 6 Holland dimensions, subject preferences, and work environments.
2. **Verified Indian Education Pathways**: Authentic guidance on stream selection (Classes 11–12), verified entrance examinations (JEE Main/Adv, NEET-UG, CLAT, UCEED, NID-DAT, CA Foundation, CUET-UG, NDA), college degrees, and realistic Indian salary benchmarks (Entry & Mid-Career in INR LPA).
3. **Signature Feature: "Try Before You Choose"**: 5-minute interactive micro-simulations (e.g. Bus-Pass Usability Debugging, Canteen Sales Data Mystery, CRISPR Plant Genetics Assay, Fest Stall Capital Allocator, Corporate Contract Audit) that offer experiential trial and bounded profile nudges.
4. **Google Gemma 4 AI Integration**: Powered by `google/gemma-4-31B-it:novita` on Hugging Face Router (`https://router.huggingface.co/v1`) for personalized fit rationale and interactive mentor Q&A.
5. **Deterministic Fallback Engine**: If Hugging Face credits are exhausted (HTTP 402), token is missing, or offline, the platform seamlessly uses its rule-based reasoning engine without breaking any feature.
6. **Privacy for Minors**: Zero compulsory account creation, no collection of phone numbers, Aadhaar, or marks. Persistent sessions and bookmarked careers stored in SQLite.

---

## 2. Architecture & Monorepo Structure

```
├── apps/
│   ├── api/                          # Node.js + Express + TypeScript Backend
│   │   ├── src/
│   │   │   ├── config/               # Environment & secret isolation (HF_TOKEN)
│   │   │   ├── controllers/          # Career, Assessment, Activity & Saved controllers
│   │   │   ├── data/                 # 15+ verified Indian career profiles & question bank
│   │   │   ├── db/                   # Native SQLite (node:sqlite) client, schema, seed
│   │   │   ├── engine/               # Deterministic Holland RIASEC scoring engine
│   │   │   ├── routes/               # Express REST routes (/api/health, /api/careers...)
│   │   │   ├── services/             # Gemma 4 Hugging Face Router integration + fallback
│   │   │   └── types/                # Strict TypeScript contracts & domain models
│   │   ├── tests/                    # Vitest unit & integration test suites
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                          # React 18 + Vite + TypeScript Frontend
│       ├── src/
│       │   ├── components/           # Navbar, Footer, UI Cards, Modals
│       │   ├── features/
│       │   │   ├── assessment/       # 4-step wizard, RIASEC scorecard & Results dashboard
│       │   │   ├── careers/          # Career Catalog & deep-dive educational roadmaps
│       │   │   ├── comparison/       # Side-by-side career comparison matrix
│       │   │   ├── gemma/            # "Ask Gemma" interactive mentor drawer
│       │   │   ├── landing/          # Hero landing & stream selector highlights
│       │   │   ├── saved/            # Bookmarks drawer with notes
│       │   │   └── simulation/       # Signature "Try Before You Choose" interactive tasks
│       │   ├── lib/api.ts            # Typed client for backend API
│       │   ├── App.tsx               # Central application state coordinator
│       │   └── index.css             # Vanilla CSS design system (glassmorphism & tokens)
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── package.json                      # Workspaces root scripts (dev, build, test, seed)
├── MASTER_PLAN.md                    # Product specification & architectural master plan
├── .env.example                      # Sanitized environment template
└── .gitignore                        # Gitignore preventing .env and database leakage
```

---

## 3. Getting Started & Reproducible Setup

### Prerequisites
- Node.js v20+ or v26+ (Tested on v26.12.1)
- npm v10+ or v11+ (Tested on v11.20.0)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `apps/api/.env`:
```bash
cp .env.example apps/api/.env
```
Set your server-side environment variables in `apps/api/.env`:
```env
HF_TOKEN=your_hugging_face_token_here
PORT=4000
NODE_ENV=development
DATABASE_PATH=./data/career_discovery.db
CLIENT_ORIGIN=http://localhost:5173
```
*(Note: Never expose `HF_TOKEN` to client-side bundles or git repositories.)*

### 3. Seed Database
Initializes the SQLite database schema and seeds 15 verified Indian career profiles and 5 interactive activities:
```bash
npm run seed
```

### 4. Run Both Dev Servers (Concurrently)
```bash
npm run dev
```
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:4000](http://localhost:4000)
- API Health Check: [http://localhost:4000/api/health](http://localhost:4000/api/health)

---

## 4. Running Automated Tests

Run the backend unit and integration test suite:
```bash
npm test
```
**Test Results (13/13 Passing)**:
- Deterministic Holland RIASEC vector calculation.
- Asha student profile matching (UX Designer top match).
- Skipped sections & flat profile detection.
- Cluster diversity cap enforcement (max 2 per cluster).
- API integration endpoints (`/api/health`, `/api/careers`, `/api/assessments`, `/api/compare`, `/api/activities`).
- Gemma AI inference error interception (HTTP 402 / credit exhaustion handled gracefully with deterministic fallback).
- SQLite session & bookmark persistence.

---

## 5. Production Builds

Compile both TypeScript projects for production:
```bash
npm run build
```
- `apps/api`: Builds to `apps/api/dist/server.js` via `tsc`.
- `apps/web`: Builds to `apps/web/dist/` via `tsc && vite build`.

---

## 6. Gemma 4 AI Integration Reference

The model service is isolated server-side at `apps/api/src/services/gemma.service.ts` using the OpenAI-compatible SDK:

```typescript
import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
  timeout: 15000,
});

const completion = await client.chat.completions.create({
  model: "google/gemma-4-31B-it:novita",
  messages: [...],
});
```

### Resiliency & Fallback Guarantee
- **Credits Exhausted (402)**: Automatically switches to the transparent deterministic reasoning engine.
- **Offline / Rate-limited**: Zero 500 error crashes. Responses indicate `{ aiGenerated: false, model: "deterministic_engine_v1" }`.
- **Validation**: Runtime response validation using Zod schemas.

---

## 7. Verified Indian Career Dataset

Contains 15+ verified career profiles spanning all major streams:
- **Science (PCM)**: Software Engineer & AI Architect, Data Scientist, Aerospace Systems Engineer, Sustainable Architect, Cybersecurity Analyst.
- **Science (PCB)**: Biomedical & Genetics Researcher, Sports Physiotherapist, Environmental Scientist.
- **Commerce**: Chartered Accountant (ICAI), Investment Banker & Equity Analyst.
- **Humanities & Law**: Corporate Lawyer & Legal Counsel (CLAT), Clinical & Child Psychologist, Civil Servant (IAS/IPS/IFS).
- **Design & Media**: UX / Product Designer (UCEED/NID), Brand Strategist & Growth Marketer.

---

## 8. Official Pointers for Students

- **National Career Service (NCS)**: [ncs.gov.in](https://www.ncs.gov.in)
- **NCERT School Guidance & Counselling**: [ncert.nic.in](https://ncert.nic.in)
- **National Testing Agency (NTA)**: [jeemain.nta.nic.in](https://jeemain.nta.nic.in) | [cuetug.ntaonline.in](https://cuetug.ntaonline.in) | [neet.nta.nic.in](https://neet.nta.nic.in)
- **Consortium of NLUs (CLAT)**: [consortiumofnlus.ac.in](https://consortiumofnlus.ac.in)
- **National Institute of Design (NID DAT)**: [admissions.nid.edu](https://admissions.nid.edu)
- **Institute of Chartered Accountants of India (ICAI)**: [icai.org](https://www.icai.org)
