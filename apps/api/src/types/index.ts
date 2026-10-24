export type Dim = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export type ClusterId =
  | 'data-computing'
  | 'health-life-sciences'
  | 'design-creative-tech'
  | 'engineering-making'
  | 'business-finance'
  | 'law-public-service'
  | 'media-communication'
  | 'education-social-impact';

export type SubjectId =
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'computer-science'
  | 'economics'
  | 'accountancy'
  | 'business-studies'
  | 'history-social-science'
  | 'languages-literature'
  | 'art-design'
  | 'psychology';

export type SkillId =
  | 'coding'
  | 'data-analysis'
  | 'lab-skills'
  | 'design-thinking'
  | 'writing'
  | 'public-speaking'
  | 'communication'
  | 'leadership'
  | 'research-methods'
  | 'problem-solving'
  | 'creativity'
  | 'teamwork'
  | 'financial-literacy'
  | 'logical-reasoning';

export type EnvId =
  | 'lab'
  | 'outdoors-field'
  | 'studio'
  | 'office'
  | 'people-facing'
  | 'flexible-remote';

export interface ExamInfo {
  name: string;
  officialUrl: string;
  verified: boolean;
  frequency?: string;
  purpose?: string;
}

export interface Pathway {
  title: string;
  streamRequired: string; // e.g. "Science (PCM)", "Commerce with/without Math", "Any stream"
  steps: string[];
  exams?: ExamInfo[];
  note?: string;
}

export interface SalaryRange {
  currency: string;
  entry: string; // e.g. "₹6 - ₹10 LPA"
  mid: string;   // e.g. "₹18 - ₹35 LPA"
  note?: string;
}

export interface CareerSource {
  title: string;
  url: string;
  publisher: string;
  date?: string;
}

export interface BeginnerActivity {
  title: string;
  kind: 'trial' | 'read' | 'watch' | 'do';
  url?: string;
  duration?: string;
}

export interface Career {
  id: string;
  name: string;
  cluster: ClusterId;
  clusterName: string;
  summary: string;
  dayInLife: string[];
  riasec: Partial<Record<Dim, number>>; // Target RIASEC vector: e.g. { R: 0.6, I: 1.0, A: 0.3 }
  subjects: SubjectId[];
  skills: SkillId[];
  developableSkills: SkillId[];
  environments: EnvId[];
  pathways: Pathway[];
  salaryRange: SalaryRange;
  beginnerActivities: BeginnerActivity[];
  trialActivityId?: string;
  adjacent: string[]; // related career IDs
  sources: CareerSource[];
  lastVerified: string;
  verification: 'verified' | 'draft';
  uncertainties: string[];
}

export interface QuestionOption {
  value: number;
  label: string;
}

export interface QuestionItem {
  id: string;
  dimension: Dim;
  prompt: string;
}

export interface AssessmentAnswers {
  activityRatings: Record<string, number>; // item_id -> rating (1 to 5)
  subjects: SubjectId[];                   // up to 3
  growthSkills: SkillId[];                 // up to 3
  environments: EnvId[];                   // up to 2
  openness: number;                        // 1 to 5
}

export interface MatchReason {
  type: 'interest' | 'subject' | 'growth' | 'environment';
  label: string;
  detail: string;
}

export interface ScoredCareer {
  career: Career;
  score: number; // 0 to 1
  scorePercent: number; // 0 to 100
  band: 'Strong overlap' | 'Good overlap' | 'Worth a look';
  componentScores: {
    interest: number;
    subject: number;
    growth: number;
    env: number;
  };
  reasons: MatchReason[];
  isStretch?: boolean;
}

export interface RecommendationResponse {
  sessionId: string;
  mainRecommendations: ScoredCareer[];
  stretchRecommendations: ScoredCareer[];
  riasecScores: Record<Dim, number>; // Normalized user vector 0 to 1
  flags: {
    flatProfile?: boolean;
    skippedSections?: string[];
  };
}

export interface SavedCareerRecord {
  id: number;
  sessionId: string;
  careerId: string;
  career?: Career;
  savedAt: string;
  notes?: string;
}

export interface TryActivity {
  id: string;
  careerId: string;
  title: string;
  area: string;
  durationMinutes: number;
  scenario: string;
  instructions: string;
  type: 'screen_fixer' | 'canteen_detective' | 'plant_lab' | 'fest_stall' | 'legal_audit';
  interactiveData: Record<string, any>;
  reflectionQuestions: {
    id: string;
    prompt: string;
    options: { value: string; label: string; primaryDimensionShift?: { dim: Dim; shift: number } }[];
  }[];
}
