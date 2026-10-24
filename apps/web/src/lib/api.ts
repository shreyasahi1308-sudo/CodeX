export interface Dim {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface CareerSource {
  title: string;
  url: string;
  publisher: string;
}

export interface ExamInfo {
  name: string;
  officialUrl: string;
  verified: boolean;
  frequency?: string;
}

export interface Pathway {
  title: string;
  streamRequired: string;
  steps: string[];
  exams?: ExamInfo[];
  note?: string;
}

export interface SalaryRange {
  currency: string;
  entry: string;
  mid: string;
  note?: string;
}

export interface BeginnerActivity {
  title: string;
  kind: 'trial' | 'read' | 'watch' | 'do';
  duration?: string;
}

export interface Career {
  id: string;
  name: string;
  cluster: string;
  clusterName: string;
  summary: string;
  dayInLife: string[];
  riasec: Partial<Record<string, number>>;
  subjects: string[];
  skills: string[];
  developableSkills: string[];
  environments: string[];
  pathways: Pathway[];
  salaryRange: SalaryRange;
  beginnerActivities: BeginnerActivity[];
  trialActivityId?: string;
  adjacent: string[];
  sources: CareerSource[];
  lastVerified: string;
  verification: 'verified' | 'draft';
  uncertainties: string[];
}

export interface MatchReason {
  type: 'interest' | 'subject' | 'growth' | 'environment';
  label: string;
  detail: string;
}

export interface ScoredCareer {
  career: Career;
  score: number;
  scorePercent: number;
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
  riasecScores: Record<string, number>;
  flags: {
    flatProfile?: boolean;
    skippedSections?: string[];
  };
}

export interface TryActivity {
  id: string;
  careerId: string;
  title: string;
  area: string;
  durationMinutes: number;
  scenario: string;
  instructions: string;
  type: string;
  interactiveData: Record<string, any>;
  reflectionQuestions: {
    id: string;
    prompt: string;
    options: { value: string; label: string; primaryDimensionShift?: { dim: string; shift: number } }[];
  }[];
}

export interface AIExplanation {
  summary: string;
  interest_connections: string[];
  skills_to_explore: string[];
  questions_to_consider: string[];
  indian_pathway_guidance: string;
  limitations: string;
}

export interface AIMeta {
  aiGenerated: boolean;
  model: string;
  timestamp: string;
  statusNote?: string;
}

const API_BASE = '/api';

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  async getQuestions() {
    const res = await fetch(`${API_BASE}/questions`);
    const data = await res.json();
    return data.data;
  },

  async getCareers(query?: string, cluster?: string): Promise<Career[]> {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (cluster) params.append('cluster', cluster);
    const res = await fetch(`${API_BASE}/careers?${params.toString()}`);
    const data = await res.json();
    return data.data;
  },

  async getCareerById(id: string): Promise<Career> {
    const res = await fetch(`${API_BASE}/careers/${id}`);
    const data = await res.json();
    return data.data;
  },

  async submitAssessment(answers: any): Promise<RecommendationResponse> {
    const res = await fetch(`${API_BASE}/assessments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });
    const data = await res.json();
    return data.data;
  },

  async getAssessment(sessionId: string): Promise<{ answers: any; response: RecommendationResponse }> {
    const res = await fetch(`${API_BASE}/assessments/${sessionId}`);
    const data = await res.json();
    return data.data;
  },

  async explainCareer(careerId: string, answers: any, scorePercent: number): Promise<{ data: AIExplanation; meta: AIMeta }> {
    const res = await fetch(`${API_BASE}/careers/${careerId}/explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, scorePercent }),
    });
    const data = await res.json();
    return { data: data.data, meta: data.meta };
  },

  async askMentor(careerId: string, question: string, history: any[] = []): Promise<{ reply: string; meta: AIMeta }> {
    const res = await fetch(`${API_BASE}/careers/${careerId}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history }),
    });
    const data = await res.json();
    return { reply: data.reply, meta: data.meta };
  },

  async compareCareers(careerIds: string[]) {
    const res = await fetch(`${API_BASE}/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ careerIds }),
    });
    const data = await res.json();
    return data.data;
  },

  async getActivities(): Promise<TryActivity[]> {
    const res = await fetch(`${API_BASE}/activities`);
    const data = await res.json();
    return data.data;
  },

  async getActivityById(id: string): Promise<TryActivity> {
    const res = await fetch(`${API_BASE}/activities/${id}`);
    const data = await res.json();
    return data.data;
  },

  async submitActivityReflection(activityId: string, payload: any) {
    const res = await fetch(`${API_BASE}/activities/${activityId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data.data;
  },

  async getSavedCareers(sessionId: string) {
    const res = await fetch(`${API_BASE}/saved/${sessionId}`);
    const data = await res.json();
    return data.data;
  },

  async saveCareer(sessionId: string, careerId: string, notes?: string) {
    const res = await fetch(`${API_BASE}/saved`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, careerId, notes }),
    });
    return res.json();
  },

  async removeSavedCareer(sessionId: string, careerId: string) {
    const res = await fetch(`${API_BASE}/saved/${sessionId}/${careerId}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
