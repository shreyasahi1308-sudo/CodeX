import {
  Career,
  Dim,
  AssessmentAnswers,
  ScoredCareer,
  RecommendationResponse,
  MatchReason,
  ClusterId,
} from '../types/index.js';
import { questionnaireItems } from '../data/questions.js';

export interface RecommenderWeights {
  interest: number;
  subject: number;
  growth: number;
  env: number;
}

export const DEFAULT_WEIGHTS: RecommenderWeights = {
  interest: 0.55,
  subject: 0.20,
  growth: 0.15,
  env: 0.10,
};

export const DIMENSION_NAMES: Record<Dim, string> = {
  R: 'Practical & Hands-on (Realistic)',
  I: 'Analytical & Scientific (Investigative)',
  A: 'Creative & Conceptual (Artistic)',
  S: 'Helping & Community (Social)',
  E: 'Leading & Persuading (Enterprising)',
  C: 'Organizing & Systems (Conventional)',
};

/**
 * Computes normalized RIASEC vector (0.0 to 1.0) from student activity ratings (1 to 5)
 */
export function calculateRiasecVector(ratings: Record<string, number>): Record<Dim, number> {
  const sums: Record<Dim, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const counts: Record<Dim, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  for (const item of questionnaireItems) {
    const val = ratings[item.id];
    if (typeof val === 'number' && val >= 1 && val <= 5) {
      sums[item.dimension] += val;
      counts[item.dimension] += 1;
    }
  }

  const result: Record<Dim, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const dims: Dim[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  for (const d of dims) {
    if (counts[d] > 0) {
      const mean = sums[d] / counts[d];
      // Normalize 1..5 scale to 0..1
      result[d] = Math.max(0, Math.min(1, (mean - 1) / 4));
    } else {
      result[d] = 0.5; // neutral fallback if unanswered
    }
  }

  return result;
}

/**
 * Computes transparent overlap ratio: |A ∩ B| / min(|A|, |B|)
 */
export function setOverlapRatio<T>(userSet: T[], targetSet: T[]): number {
  if (!userSet || userSet.length === 0 || !targetSet || targetSet.length === 0) {
    return 0;
  }
  const intersection = userSet.filter(item => targetSet.includes(item));
  const denominator = Math.min(userSet.length, targetSet.length);
  return denominator > 0 ? intersection.length / denominator : 0;
}

/**
 * Generates transparent human-readable reasons for a recommendation
 */
export function buildMatchReasons(
  career: Career,
  riasecUser: Record<Dim, number>,
  answers: AssessmentAnswers
): MatchReason[] {
  const reasons: MatchReason[] = [];

  // Top 2 RIASEC alignments
  const dims: Dim[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const dimensionAlignments = dims
    .map(d => {
      const careerWeight = career.riasec[d] || 0;
      const userRating = riasecUser[d] || 0;
      return { dim: d, alignment: careerWeight * userRating, userRating, careerWeight };
    })
    .filter(item => item.careerWeight > 0)
    .sort((a, b) => b.alignment - a.alignment);

  if (dimensionAlignments.length > 0 && dimensionAlignments[0].alignment > 0.25) {
    const top = dimensionAlignments[0];
    const ratingOutOfFive = Math.round(top.userRating * 4 + 1);
    reasons.push({
      type: 'interest',
      label: `${DIMENSION_NAMES[top.dim].split(' ')[0]} Focus`,
      detail: `Aligns with your high preference for ${DIMENSION_NAMES[top.dim].toLowerCase()} (rated ${ratingOutOfFive}/5).`,
    });
  }

  if (dimensionAlignments.length > 1 && dimensionAlignments[1].alignment > 0.25) {
    const second = dimensionAlignments[1];
    const ratingOutOfFive = Math.round(second.userRating * 4 + 1);
    reasons.push({
      type: 'interest',
      label: `Secondary: ${DIMENSION_NAMES[second.dim].split(' ')[0]}`,
      detail: `Reinforced by your interest in ${DIMENSION_NAMES[second.dim].toLowerCase()} (rated ${ratingOutOfFive}/5).`,
    });
  }

  // Subject overlaps
  const matchedSubjects = (answers.subjects || []).filter(s => career.subjects.includes(s));
  if (matchedSubjects.length > 0) {
    const names = matchedSubjects.map(s => s.replace(/-/g, ' ')).join(', ');
    reasons.push({
      type: 'subject',
      label: 'Subject Match',
      detail: `Connects directly to your favorite subjects: ${names}.`,
    });
  }

  // Growth skill overlaps
  const matchedSkills = (answers.growthSkills || []).filter(s => career.developableSkills.includes(s));
  if (matchedSkills.length > 0) {
    const names = matchedSkills.map(s => s.replace(/-/g, ' ')).join(', ');
    reasons.push({
      type: 'growth',
      label: 'Skill Synergy',
      detail: `Cultivates key skills you want to develop: ${names}.`,
    });
  }

  // Environment overlap
  const matchedEnvs = (answers.environments || []).filter(e => career.environments.includes(e));
  if (matchedEnvs.length > 0) {
    const names = matchedEnvs.map(e => e.replace(/-/g, ' ')).join(', ');
    reasons.push({
      type: 'environment',
      label: 'Work Environment',
      detail: `Matches your preferred work setting: ${names}.`,
    });
  }

  return reasons;
}

/**
 * Deterministic recommendation engine
 */
export function recommendCareers(
  answers: AssessmentAnswers,
  careers: Career[],
  options: {
    weights?: RecommenderWeights;
    dismissedIds?: Set<string>;
    sessionId?: string;
  } = {}
): RecommendationResponse {
  const weights = options.weights || DEFAULT_WEIGHTS;
  const dismissed = options.dismissedIds || new Set<string>();
  const sessionId = options.sessionId || `session_${Date.now()}`;

  // 1. Calculate user RIASEC vector
  const userRiasec = calculateRiasecVector(answers.activityRatings || {});

  // Check flat profile: max - min < 0.2
  const values = Object.values(userRiasec);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const isFlatProfile = maxVal - minVal < 0.2;

  // Track skipped sections
  const skippedSections: string[] = [];
  if (!answers.subjects || answers.subjects.length === 0) skippedSections.push('Subjects');
  if (!answers.growthSkills || answers.growthSkills.length === 0) skippedSections.push('Skills to grow');
  if (!answers.environments || answers.environments.length === 0) skippedSections.push('Work environments');

  // 2. Score each career
  const scoredCareers: ScoredCareer[] = careers
    .filter(c => !dismissed.has(c.id))
    .map(c => {
      // (a) RIASEC interest score: weighted average of student ratings on career dimensions
      let weightedSum = 0;
      let careerDimSum = 0;
      const dims: Dim[] = ['R', 'I', 'A', 'S', 'E', 'C'];

      for (const d of dims) {
        const cWeight = c.riasec[d] || 0;
        if (cWeight > 0) {
          weightedSum += cWeight * (userRiasec[d] || 0);
          careerDimSum += cWeight;
        }
      }
      const interestScore = careerDimSum > 0 ? weightedSum / careerDimSum : 0.5;

      // (b) Overlap component scores
      const subjectScore = setOverlapRatio(answers.subjects, c.subjects);
      const growthScore = setOverlapRatio(answers.growthSkills, c.developableSkills);
      const envScore = setOverlapRatio(answers.environments, c.environments);

      // (c) Renormalized weighted sum
      let totalWeight = weights.interest;
      let sum = weights.interest * interestScore;

      if (answers.subjects && answers.subjects.length > 0) {
        totalWeight += weights.subject;
        sum += weights.subject * subjectScore;
      }
      if (answers.growthSkills && answers.growthSkills.length > 0) {
        totalWeight += weights.growth;
        sum += weights.growth * growthScore;
      }
      if (answers.environments && answers.environments.length > 0) {
        totalWeight += weights.env;
        sum += weights.env * envScore;
      }

      const rawScore = totalWeight > 0 ? sum / totalWeight : interestScore;
      const score = Math.round(rawScore * 1000) / 1000;
      const scorePercent = Math.round(score * 100);

      // Band assignment
      let band: 'Strong overlap' | 'Good overlap' | 'Worth a look' = 'Worth a look';
      if (score >= 0.70) {
        band = 'Strong overlap';
      } else if (score >= 0.50) {
        band = 'Good overlap';
      }

      const reasons = buildMatchReasons(c, userRiasec, answers);

      return {
        career: c,
        score,
        scorePercent,
        band,
        componentScores: {
          interest: Math.round(interestScore * 1000) / 1000,
          subject: Math.round(subjectScore * 1000) / 1000,
          growth: Math.round(growthScore * 1000) / 1000,
          env: Math.round(envScore * 1000) / 1000,
        },
        reasons,
      };
    });

  // 3. Deterministic Sorting: by score descending, then by interest score, then alphabetical ID
  scoredCareers.sort((a, b) => {
    if (Math.abs(b.score - a.score) > 0.001) {
      return b.score - a.score;
    }
    if (Math.abs(b.componentScores.interest - a.componentScores.interest) > 0.001) {
      return b.componentScores.interest - a.componentScores.interest;
    }
    return a.career.id.localeCompare(b.career.id);
  });

  // 4. Cluster Diversity Cap (Pick top 6 with at most 2 per cluster)
  const clusterCounts = new Map<ClusterId, number>();
  const mainRecommendations: ScoredCareer[] = [];
  const unselected: ScoredCareer[] = [];

  for (const item of scoredCareers) {
    const cluster = item.career.cluster;
    const count = clusterCounts.get(cluster) || 0;
    if (mainRecommendations.length < 6 && count < 2) {
      mainRecommendations.push(item);
      clusterCounts.set(cluster, count + 1);
    } else {
      unselected.push(item);
    }
  }

  // 5. Stretch Recommendations (Unexplored clusters with good interest fit)
  const mainClusters = new Set(mainRecommendations.map(r => r.career.cluster));
  const openness = answers.openness || 3;
  const stretchSlots = openness >= 4 ? 2 : 1;

  const stretchRecommendations: ScoredCareer[] = [];
  for (const item of unselected) {
    if (stretchRecommendations.length >= stretchSlots) break;
    if (!mainClusters.has(item.career.cluster) && item.componentScores.interest >= 0.40) {
      stretchRecommendations.push({
        ...item,
        isStretch: true,
      });
      mainClusters.add(item.career.cluster);
    }
  }

  return {
    sessionId,
    mainRecommendations,
    stretchRecommendations,
    riasecScores: userRiasec,
    flags: {
      flatProfile: isFlatProfile,
      skippedSections: skippedSections.length > 0 ? skippedSections : undefined,
    },
  };
}
