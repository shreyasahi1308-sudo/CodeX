# FIGUROUT — Career Discovery Platform (Classes 9–12)
### Full-Stack Implementation with React, Node.js, SQLite, and Google Gemma 4

[![Build Status](https://img.shields.io/badge/Build-Passing-emerald)](https://github.com)
[![Vitest Coverage](https://img.shields.io/badge/Tests-14%2F14%20Passed-blue)](https://vitest.dev)
[![AI Model](https://img.shields.io/badge/AI-Gemma%204%20(31B)--it%3Anovita-purple)](https://huggingface.co/google/gemma-4-31B-it)
[![Focus](https://img.shields.io/badge/Education-CBSE%20%7C%20ICSE%20%7C%20State%20Boards-orange)](https://ncert.nic.in)

---

## 1. Overview & Objective

**FIGUROUT** is an intelligent, transparent, and privacy-first career discovery web application engineered specifically for Indian high school students (Classes 9–12, ages 14–18).

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
- **Node.js**: `v22.5.0+` or `v26+` (Tested on `v26.12.1`).
  > **Important**: The backend uses the native `node:sqlite` (`DatabaseSync`) module introduced in Node.js v22.5.0. Older versions (Node 18 or older Node 20 releases) will throw `ERR_MODULE_NOT_FOUND: Cannot find package 'node:sqlite'`.
- **npm**: `v10+` or `v11+` (Tested on `v11.20.0`).
- **Hugging Face Account** *(Optional)*: Free account with a User Access Token (Read / Inference permissions) for live Gemma 4 inference. If omitted, the platform runs offline in deterministic fallback mode with zero setup blockers.

---

### 1. Install Dependencies
Install all workspace dependencies from the root repository directory:
```bash
npm install
```
*(You can also install workspace dependencies individually: `npm install --workspace=apps/api` and `npm install --workspace=apps/web`.)*

---

### 2. Environment Variables Configuration

Copy `.env.example` to create your local `.env`:
```bash
# Recommended: Copy to apps/api/.env for backend isolation
cp .env.example apps/api/.env

# Or copy to root .env (also auto-detected by backend dotenv)
cp .env.example .env
```

#### Environment Variables Reference
| Variable | Required? | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `HF_TOKEN` | Optional | *(None)* | Server-side Hugging Face User Access Token for live Gemma 4 inference. |
| `PORT` | Optional | `4000` | Port on which the Express backend API listens. |
| `NODE_ENV` | Optional | `development` | Runtime mode (`development`, `production`, `test`). |
| `DATABASE_PATH` | Optional | `./data/career_discovery.db` | Relative file path to the SQLite database. |
| `CLIENT_ORIGIN` | Optional | `http://localhost:5173` | Allowed CORS origin for the Vite frontend dev server. |

---

### 3. Secure Hugging Face Token Configuration (Server-Side Only)

The platform integrates with Google Gemma 4 (`google/gemma-4-31B-it:novita`) via the Hugging Face Router endpoint (`https://router.huggingface.co/v1`).

1. **Obtain a Token**:
   - Go to [Hugging Face Settings -> Access Tokens](https://huggingface.co/settings/tokens).
   - Generate a token with **Read** / **Inference** permissions.
2. **Configure on the Server**:
   - Set `HF_TOKEN` in `apps/api/.env` (or root `.env`):
   ```env
   HF_TOKEN=hf_your_actual_token_here
   ```
3. **Security Architecture & Isolation**:
   - `HF_TOKEN` is loaded **strictly on the server side** in `apps/api/src/config/index.ts` and consumed only in `apps/api/src/services/gemma.service.ts`.
   - Never prefix `HF_TOKEN` with `VITE_` and never place it inside `apps/web/`.
   - The client application never talks to Hugging Face directly; all AI inference is proxied through protected server routes (`/api/mentor/chat`, `/api/careers/:id/ask`, `/api/careers/:id/explain`).
   - `.gitignore` guards all `.env*` files from accidental git commits.
4. **Offline & Fallback Guarantee**:
   - If `HF_TOKEN` is omitted, empty, or invalid, the platform launches in `deterministic_only` mode without errors.
   - All assessments, stream guidance, and mentor responses fall back to the rule-based counselor engine (`deterministic_engine_v1`).
5. **Verify Configuration**:
   - Verify health and model status via the API health check:
     ```bash
     curl http://localhost:4000/api/health
     ```
   - When configured: `"tokenConfigured": true, "mode": "live_with_fallback"`.
   - When unconfigured: `"tokenConfigured": false, "mode": "deterministic_only"`.

---

### 4. Database Initialization & Seeding
Initialize the SQLite schema and seed verified Indian career profiles (15 careers across Science, Commerce, Humanities, and Design) along with 5 interactive micro-challenges:
```bash
npm run seed
```
*(Or directly target the workspace: `npm run seed --workspace=apps/api`.)*

---

### 5. Run the Application in Development

#### Option A: Run Both Services Concurrently (Recommended)
From the root directory:
```bash
npm run dev
```
- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:4000](http://localhost:4000)
- **API Health Check**: [http://localhost:4000/api/health](http://localhost:4000/api/health)

#### Option B: Run Services Individually
- **Backend API only**:
  ```bash
  npm run dev:api
  # or: npm run dev --workspace=apps/api
  # or from apps/api: npm run dev
  ```
- **Frontend App only**:
  ```bash
  npm run dev:web
  # or: npm run dev --workspace=apps/web
  # or from apps/web: npm run dev
  ```
  *(Note: The frontend dev server proxies all `/api` requests to `http://localhost:4000`. Ensure the backend API is active.)*

---

### 6. Production Builds
Compile both TypeScript applications for production:
```bash
npm run build
```
- `apps/api`: Builds to `apps/api/dist/server.js` via `tsc`.
- `apps/web`: Builds to `apps/web/dist/` via `tsc && vite build`.

To preview the production frontend build:
```bash
npm run preview --workspace=apps/web
```
To run the production backend server:
```bash
npm run start --workspace=apps/api
```

---

## 4. Testing the Interactive Career Mentor

You can test the Interactive Career Mentor via the Web UI, automated test suites, or direct REST API requests:

### 1. In the Web UI
1. Launch both services with `npm run dev`.
2. Open [http://localhost:5173](http://localhost:5173).
3. Access the mentor drawer in either of two ways:
   - **General Career Mentor**: Click **"Interactive Career Mentor"** / **"Ask Gemma"** on the hero banner.
   - **Career-Specific Mentor**: Go to **Explore Careers**, click on any career card (e.g. *UX / Product Designer* or *Data Scientist*), and click **"Ask Mentor"**.
4. Type a question (e.g., *"What stream should I pick in Class 11?"*) or click a starter suggestion chip.
5. Notice the model badge at the bottom of the assistant response:
   - `✦ GEMMA 4 31B-IT (LIVE ROUTER)` when a valid `HF_TOKEN` is configured.
   - `✦ DETERMINISTIC COUNSELOR FALLBACK` when running offline or without `HF_TOKEN`.

### 2. Automated Test Suite
Run the full Vitest suite covering both unit and integration tests:
```bash
npm test
# or: npm test --workspace=apps/api
```
To run tests with simulated Hugging Face token configuration:
```bash
HF_TOKEN=test-token npm test
```

### 3. Direct REST API Testing (cURL)
- **General Career Mentor Chat**:
  ```bash
  curl -X POST http://localhost:4000/api/mentor/chat \
    -H "Content-Type: application/json" \
    -d '{
      "question": "How do I decide between Science and Commerce after Class 10?",
      "history": []
    }'
  ```
- **Career-Specific Mentor**:
  ```bash
  curl -X POST http://localhost:4000/api/careers/ux-designer/ask \
    -H "Content-Type: application/json" \
    -d '{
      "question": "What entrance exams are required for UX Design in India?",
      "history": []
    }'
  ```

---

## 5. Running Automated Tests

Run the backend unit and integration test suite:
```bash
npm test
```
**Test Results (14/14 Passing)**:
- Deterministic Holland RIASEC vector calculation.
- Asha student profile matching (UX Designer top match).
- Skipped sections & flat profile detection.
- Cluster diversity cap enforcement (max 2 per cluster).
- API integration endpoints (`/api/health`, `/api/careers`, `/api/assessments`, `/api/compare`, `/api/activities`).
- Interactive Career Mentor endpoints (`/api/mentor/chat` and `/api/careers/:id/ask`).
- Gemma AI inference error interception (HTTP 401/402 handled gracefully with deterministic fallback).
- SQLite session & bookmark persistence.

---

## 6. Troubleshooting & Common Setup Errors

Established directly from repository code and configuration:

### 1. `Cannot find package 'node:sqlite'`
- **Symptom**: `Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'node:sqlite'` when running `npm run seed`, `npm run dev:api`, or `npm test`.
- **Cause**: Node.js version is below `v22.5.0` (`node:sqlite` / `DatabaseSync` is a built-in module introduced in Node.js 22.5.0).
- **Solution**: Upgrade to Node.js `v22.5.0` or later (e.g., Node 22 LTS or Node 26):
  ```bash
  nvm install 22 && nvm use 22
  # or on macOS: brew install node
  ```

### 2. `SqliteError: no such table: careers` or Empty Catalog (404 on Careers)
- **Symptom**: The frontend displays empty career lists, or tests fail with missing table errors.
- **Cause**: The SQLite database (`data/career_discovery.db`) has not been initialized or seeded.
- **Solution**: Run the database seeder:
  ```bash
  npm run seed
  ```

### 3. Frontend Displays `Failed to fetch` or 504 Gateway Timeout
- **Symptom**: Questionnaire or mentor queries fail with network errors; Vite terminal logs proxy connection refused to `http://localhost:4000`.
- **Cause**: The Vite frontend is running, but the backend Express API is not running on port 4000.
- **Solution**: Always start both services together with `npm run dev` from the repository root, or start `npm run dev:api` in a separate terminal.

### 4. `EADDRINUSE: address already in use :::4000`
- **Symptom**: Backend crashes on startup with `port 4000 already in use`.
- **Cause**: A previous server instance or another service is occupying port 4000.
- **Solution**: Free the port:
  ```bash
  lsof -ti:4000 | xargs kill -9
  ```
  Or set `PORT=4001` in `apps/api/.env` and update the proxy target in `apps/web/vite.config.ts`.

### 5. HTTP 401/402 in Backend Logs During Mentor Chat
- **Symptom**: Console logs `[GemmaService] Mentor error (401/402). Using deterministic fallback.`
- **Cause**: The Hugging Face token is invalid, expired, or free serverless inference quota has been exhausted.
- **Behavior**: The application **does not crash**; it gracefully transitions to `deterministic_engine_v1`. To re-enable live Gemma 4 inference, update `HF_TOKEN` in `apps/api/.env` with an active token.

---

## 7. Gemma 4 AI Integration Reference

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

## 8. Verified Indian Career Dataset

Contains 15+ verified career profiles spanning all major streams:
- **Science (PCM)**: Software Engineer & AI Architect, Data Scientist, Aerospace Systems Engineer, Sustainable Architect, Cybersecurity Analyst.
- **Science (PCB)**: Biomedical & Genetics Researcher, Sports Physiotherapist, Environmental Scientist.
- **Commerce**: Chartered Accountant (ICAI), Investment Banker & Equity Analyst.
- **Humanities & Law**: Corporate Lawyer & Legal Counsel (CLAT), Clinical & Child Psychologist, Civil Servant (IAS/IPS/IFS).
- **Design & Media**: UX / Product Designer (UCEED/NID), Brand Strategist & Growth Marketer.

---

## 9. Official Pointers for Students

- **National Career Service (NCS)**: [ncs.gov.in](https://www.ncs.gov.in)
- **NCERT School Guidance & Counselling**: [ncert.nic.in](https://ncert.nic.in)
- **National Testing Agency (NTA)**: [jeemain.nta.nic.in](https://jeemain.nta.nic.in) | [cuetug.ntaonline.in](https://cuetug.ntaonline.in) | [neet.nta.nic.in](https://neet.nta.nic.in)
- **Consortium of NLUs (CLAT)**: [consortiumofnlus.ac.in](https://consortiumofnlus.ac.in)
- **National Institute of Design (NID DAT)**: [admissions.nid.edu](https://admissions.nid.edu)
- **Institute of Chartered Accountants of India (ICAI)**: [icai.org](https://www.icai.org)
