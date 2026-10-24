# MASTER PLAN: CAREER DISCOVERY PLATFORM (CLASSES 9–12)
## Focus: Indian Education System (CBSE / ICSE / State Boards)

---

### 1. EXECUTIVE SUMMARY & PRODUCT OBJECTIVE

The **Career Discovery Platform** is an intelligent, transparent, and privacy-conscious web application designed specifically for Indian secondary school students (Classes 9 to 12, ages 14–18).

The platform addresses a critical gap in Indian secondary education: students often select high-stakes academic streams (PCM, PCB, Commerce with/without Math, Humanities) under immense societal pressure without structured exposure to diverse careers, verified entrance examinations, educational pathways, or practical micro-experiences of what professionals actually do.

#### Core Objectives:
1. **Explore Interests & Strengths**: Multi-dimensional assessment rooted in the Holland Occupational Themes (RIASEC) adapted for Indian secondary school subjects and real-world activities.
2. **Deterministic & Explainable Matching**: Recommendation engine that scores career similarity transparently without black-box bias. Provides clear, itemized reasons for every recommendation.
3. **Verified Indian Education Pathways**: Authentic guidance on stream selection (Classes 11–12), verified entrance examinations (JEE, NEET, CLAT, NID-DAT, UCEED, CUET, NDA, CA Foundation, IPMAT), college degrees, and top Indian institutions (IITs, AIIMS, NLUs, IIMs, NIDs, Central Universities).
4. **Signature Interactive Career Activities**: Hands-on micro-simulations allowing students to test-drive careers (e.g., debugging code, clinical triage reasoning, legal clause analysis, marketing campaign optimization, investment allocation).
5. **Gemma 4 AI Integration**: Natural-language fit explanations, interactive mentor Q&A ("Ask Gemma"), and reflection evaluations using Google's `google/gemma-4-31B-it:novita` hosted on Hugging Face Router. AI enriches verified records but never hallucinates educational facts.
6. **Graceful Fallback & Determinism**: Application remains 100% functional, responsive, and insightful even if AI inference is offline, unconfigured, or rate-limited.
7. **Privacy for Minors**: No compulsory login, no collection of sensitive personal data or Aadhaar/phone numbers. Clean session persistence.

---

### 2. ARCHITECTURE OVERVIEW

The application is structured as a robust, production-grade monorepo or unified full-stack workspace:

```
├── apps/
│   ├── api/                          # Node.js + Express + TypeScript Backend
│   │   ├── src/
│   │   │   ├── config/               # Environment & app config (HF_TOKEN, PORT, etc.)
│   │   │   ├── controllers/          # API route controllers
│   │   │   ├── db/                   # Database client (SQLite/better-sqlite3/sqlite3), migrations, seeders
│   │   │   ├── data/                 # Authoritative Career Dataset & Question bank
│   │   │   ├── engine/               # Deterministic Recommendation & Scoring Engine
│   │   │   ├── middleware/           # Error handling, request validation, CORS, rate-limits
│   │   │   ├── routes/               # Express REST routers (/api/careers, /api/assessments, etc.)
│   │   │   ├── services/             # Gemma AI service, Career service, Assessment service
│   │   │   └── types/                # Backend data models and API contracts
│   │   ├── tests/                    # Unit & integration tests for engine, API, AI fallback
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                          # React 18 + Vite + TypeScript Frontend
│       ├── src/
│       │   ├── assets/               # Icons, illustrations, brand assets
│       │   ├── components/           # Reusable UI components (Navbar, Footer, Card, Modal, Badge, etc.)
│       │   ├── features/
│       │   │   ├── assessment/       # Questionnaire wizard, progress bar, RIASEC radar
│       │   │   ├── careers/          # Career catalog, filters, search, career detail view
│       │   │   ├── roadmap/          # Visual pathway timeline (Class 9-10 -> 11-12 -> Exam -> College -> Career)
│       │   │   ├── simulation/       # Signature interactive career exploration activities
│       │   │   ├── comparison/       # Side-by-side career comparison matrix
│       │   │   └── gemma-chat/       # "Ask Gemma" career mentor drawer
│       │   ├── lib/
│       │   │   └── api.ts            # Typed API client for backend
│       │   ├── types/                # Frontend TypeScript types
│       │   ├── App.tsx               # Main application routing and state
│       │   ├── index.css             # Design system tokens, modern typography, glassmorphism
│       │   └── main.tsx
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── package.json                      # Workspace root scripts (dev, build, test)
├── .env.example                      # Sanitized environment template
├── .gitignore                        # Gitignore preventing .env and build leakage
└── README.md                         # Quickstart and architecture guide
```

---

### 3. DETERMINISTIC CAREER RECOMMENDATION ENGINE

The matching algorithm maps student answers to multi-dimensional profile vectors:

#### Dimensions:
1. **Holland RIASEC Profile**:
   - `Realistic` (Hands-on, building, mechanics, physical systems)
   - `Investigative` (Analytical, scientific, research, problem-solving)
   - `Artistic` (Creative, expressive, visual, conceptual, writing)
   - `Social` (Helping, teaching, counseling, healthcare, community)
   - `Enterprising` (Leadership, business, persuasion, entrepreneurship)
   - `Conventional` (Organized, structured, data, finance, systems)

2. **Indian Academic Stream Affinities**:
   - `Science_PCM` (Physics, Chemistry, Mathematics, Computing)
   - `Science_PCB` (Physics, Chemistry, Biology, Life Sciences)
   - `Commerce_Math` (Accounting, Economics, Applied Mathematics, Finance)
   - `Commerce_NoMath` (Business Studies, Entrepreneurship, Management)
   - `Humanities_Arts` (History, Political Science, Psychology, Sociology, Literature)
   - `Design_Tech` (Design thinking, UX, Media, Architecture, Computer Applications)

3. **Scoring Formula**:
   $$\text{Match Score} = \left(w_{\text{riasec}} \cdot S_{\text{riasec}}\right) + \left(w_{\text{stream}} \cdot S_{\text{stream}}\right) + \left(w_{\text{activity}} \cdot S_{\text{activity}}\right)$$
   Where:
   - $S_{\text{riasec}}$: Normalized cosine similarity between user RIASEC vector and career target vector (0 to 1).
   - $S_{\text{stream}}$: Alignment between preferred subjects and requisite Class 11-12 subjects (0 to 1).
   - $S_{\text{activity}}$: Overlap between preferred work styles/activities and career characteristics.
   - Weights: $w_{\text{riasec}} = 0.50$, $w_{\text{stream}} = 0.35$, $w_{\text{activity}} = 0.15$.
   - Scores scaled to 0–100%.

4. **Diversity Guarantee**:
   The engine ranks top matches across distinct clusters (e.g., Engineering/Tech, Healthcare/Bio, Commerce/Finance, Humanities/Law/Public, Creative/Design) so students are exposed to varied options rather than 5 variations of the same role.

5. **Transparency & Limitations**:
   Each recommendation provides:
   - **Primary Fit Drivers**: Exact tags and subjects matched.
   - **Growth Areas**: Skills to develop.
   - **Disclaimer**: "This match reflects similarity with your current interests and stated subject preferences. It does NOT predict academic grades, college admissions, or financial success."

---

### 4. STRUCTURED CAREER DATASET (INDIAN CONTEXT)

Contains minimum 20 verified career profiles across all major Indian streams:

| ID | Title | Stream | Key Entrance Exams | Degrees | Starter Salary (INR) | Mid Salary (INR) |
|---|---|---|---|---|---|---|
| `software-engineer` | Software Engineer & AI Architect | Science (PCM) | JEE Main/Adv, BITSAT, State CETs | B.Tech / B.E. in CSE/IT | ₹6 – 12 LPA | ₹20 – 45 LPA |
| `data-scientist` | Data Scientist & Machine Learning Specialist | Science (PCM) / Statistics | JEE, ISI Admission Test, CUET | B.Stat / B.Tech / B.Sc Data Science | ₹7 – 14 LPA | ₹22 – 50 LPA |
| `aerospace-engineer` | Aerospace & Satellite Systems Engineer | Science (PCM) | JEE Advanced, IIST Test | B.Tech Aerospace / Avionics | ₹6 – 10 LPA | ₹18 – 35 LPA |
| `medical-doctor` | General Physician / Surgeon | Science (PCB) | NEET-UG | MBBS + MD/MS | ₹8 – 12 LPA | ₹24 – 60 LPA |
| `biotechnologist` | Biotechnologist & Genetic Researcher | Science (PCB) | NEET, CUET, GAT-B | B.Tech/B.Sc Biotechnology | ₹4.5 – 8 LPA | ₹15 – 30 LPA |
| `psychologist` | Clinical / Child Psychologist | Any (Humanities/PCB pref) | CUET, State University Tests | B.A./B.Sc Psychology + M.Phil | ₹4 – 7 LPA | ₹12 – 25 LPA |
| `chartered-accountant`| Chartered Accountant (CA) | Commerce (with/without Math) | CA Foundation, CA Intermediate | ICAI Certification + B.Com | ₹8 – 14 LPA | ₹20 – 45 LPA |
| `investment-banker` | Investment Banker & Financial Analyst | Commerce (with Math) / PCM | IPMAT, CUET, CAT (Postgrad) | BBA Finance / B.Com (Hons) / B.Tech + MBA | ₹10 – 18 LPA | ₹30 – 80 LPA |
| `corporate-lawyer` | Corporate Lawyer & Legal Advisor | Any Stream | CLAT, AILET, SLAT | 5-Year Integrated B.A. LL.B / BBA LL.B | ₹7 – 15 LPA | ₹25 – 60 LPA |
| `product-designer` | UI/UX & Digital Product Designer | Any Stream | UCEED, NID-DAT | B.Des / B.Arch / B.Tech | ₹6 – 11 LPA | ₹18 – 40 LPA |
| `defense-officer` | Armed Forces Officer (Army/Navy/Air Force) | Science PCM (Navy/AF), Any (Army) | NDA & NA Examination (UPSC) + SSB | 3-Year B.Sc/B.A/B.Tech (NDA Khadakwasla) | ₹8 – 14 LPA + Perks | ₹18 – 30 LPA + Perks |
| `civil-servant` | Civil Servant (IAS, IPS, IFS) | Any Stream | UPSC Civil Services (Prelims, Mains, Interview) | Any Bachelor's Degree | ₹8 – 12 LPA + Perks | ₹18 – 30 LPA + Perks |
| `environmental-scientist`| Environmental Scientist & Climate Analyst | Science (PCB / PCM) | CUET, JEE | B.Sc / B.Tech Environmental Science | ₹4.5 – 8 LPA | ₹14 – 28 LPA |
| `digital-marketer` | Brand Strategist & Growth Marketer | Any Stream | CUET, IPMAT, DU JAT | BBA / B.Com / B.A. Mass Comm | ₹4.5 – 8 LPA | ₹16 – 35 LPA |
| `architect` | Sustainable Architect & Urban Planner | Science (PCM) | NATA, JEE Main Paper 2 | B.Arch (5 Years) | ₹4.5 – 7.5 LPA | ₹15 – 32 LPA |
| `robotics-engineer` | Robotics & Mechatronics Engineer | Science (PCM) | JEE Main/Adv, BITSAT | B.Tech Robotics / Mechatronics / Mech | ₹6.5 – 12 LPA | ₹20 – 42 LPA |
| `commercial-pilot` | Commercial Airline Pilot | Science (PCM) | DGCA Ground Exams, Flying School CPL | Pilot Training + DGCA CPL License | ₹12 – 20 LPA | ₹35 – 70 LPA |
| `sports-physiotherapist`| Sports Physiotherapist | Science (PCB) | NEET / State CET / CUET | BPT (Bachelor of Physiotherapy, 4.5 Yrs) | ₹4 – 7 LPA | ₹12 – 26 LPA |
| `actuary` | Actuary & Risk Analyst | Commerce/Science (High Math) | ACET (Actuarial Common Entrance Test) | B.Sc Actuarial / Math / Stats + IAI Exams | ₹8 – 15 LPA | ₹25 – 60 LPA |
| `journalist` | Investigative Journalist & Media Producer | Humanities / Any | CUET, IIMC Entrance Test | B.A. Journalism / Mass Comm | ₹4 – 7 LPA | ₹12 – 28 LPA |

---

### 5. GEMMA 4 INTEGRATION SPECIFICATION

- **Model**: `google/gemma-4-31B-it:novita`
- **Inference Router**: Hugging Face Router endpoint `https://router.huggingface.co/v1`
- **API Client**: `openai` npm package configured with:
  ```ts
  import { OpenAI } from "openai";
  const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_TOKEN,
    timeout: 15000, // 15-second strict timeout
  });
  ```
- **Backend Service**: `apps/api/src/services/gemma.service.ts`
  - Isolates all API calls on the server.
  - Never leaks `HF_TOKEN` to the frontend.
  - Generates structured JSON responses using strict system instructions and runtime schema validation (Zod).
  - Deterministic fallback provider seamlessly generates rich explanations if HF Router times out, returns error, or token is absent.
- **Use Cases**:
  1. Personalized Career Match Explanation: connects specific answers to the career's Indian educational reality.
  2. "Ask Gemma" Career Mentor: student asks any question about daily work, stress, exams, or alternative routes.
  3. Interactive Simulation Evaluation: reviews student answers in micro-activities, offering constructive coaching.

---

### 6. SIGNATURE INTERACTIVE ACTIVITIES

Hands-on micro-activities where students try real career tasks:
1. **Software Engineering**: "Bug Hunt & Algorithmic Logic" — spot the flaw in a logic block and pick the optimized strategy.
2. **Clinical Healthcare**: "Emergency Triage Diagnostic" — review patient vitals and symptoms to decide the first line of investigation.
3. **Corporate Law**: "Contract Risk Audit" — review a clause in a mock service agreement and identify the hidden legal liability.
4. **Digital Marketing**: "Ad Campaign Optimizer" — allocate a ₹50,000 budget across search, reels, and influencer channels for a student startup.
5. **Chartered Accountancy**: "Balance Sheet Detective" — locate the discrepancy between assets and liabilities for a retail store.

Students receive instant feedback, score assessment, and an AI-assisted reflection summary.

---

### 7. VERIFICATION & ACCEPTANCE CRITERIA

1. ✅ Monorepo / full-stack builds cleanly with TypeScript typing.
2. ✅ Deterministic matching engine tested with known profile vectors.
3. ✅ Career detail view accurately displays Indian streams, exams, degrees, salaries, and roadmaps.
4. ✅ Gemma 4 inference tested with live Hugging Face Router endpoint and verified fallback.
5. ✅ SQLite persistence stores assessment runs, saved careers, and activity reflections.
6. ✅ Modern, responsive, high-aesthetic UI with zero broken links or dummy buttons.
