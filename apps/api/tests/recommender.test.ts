import { describe, it, expect } from 'vitest';
import { recommendCareers, calculateRiasecVector } from '../src/engine/recommender.js';
import { careersData } from '../src/data/careers.js';
import { AssessmentAnswers } from '../src/types/index.js';

describe('Deterministic Recommendation Engine', () => {
  it('correctly calculates RIASEC vector from activity ratings', () => {
    // 3 Artistic items rated 5, others rated 1
    const ratings: Record<string, number> = {
      a1: 5, a2: 5, a3: 5,
      r1: 1, r2: 1, r3: 1,
      i1: 1, i2: 1, i3: 1,
      s1: 1, s2: 1, s3: 1,
      e1: 1, e2: 1, e3: 1,
      c1: 1, c2: 1, c3: 1,
    };

    const vector = calculateRiasecVector(ratings);
    expect(vector.A).toBe(1.0); // (5-1)/4 = 1.0
    expect(vector.R).toBe(0.0); // (1-1)/4 = 0.0
    expect(vector.I).toBe(0.0);
  });

  it('matches Student "Asha" profile with UX Designer as top recommendation', () => {
    // Asha: high Investigative (4.67) and Artistic (3.67), moderate Social (3.33)
    const ashaAnswers: AssessmentAnswers = {
      activityRatings: {
        r1: 2, r2: 2, r3: 2, // R mean 2.0 -> 0.25
        i1: 5, i2: 5, i3: 4, // I mean 4.67 -> ~0.917
        a1: 5, a2: 3, a3: 3, // A mean 3.67 -> ~0.667
        s1: 4, s2: 3, s3: 3, // S mean 3.33 -> ~0.583
        e1: 2, e2: 2, e3: 2, // E mean 2.0 -> 0.25
        c1: 2, c2: 3, c3: 2, // C mean 2.33 -> ~0.333
      },
      subjects: ['biology', 'computer-science', 'art-design'],
      growthSkills: ['coding', 'lab-skills', 'communication'],
      environments: ['studio', 'office'],
      openness: 4,
    };

    const result = recommendCareers(ashaAnswers, careersData);

    expect(result.mainRecommendations.length).toBeGreaterThan(0);
    expect(result.mainRecommendations.length).toBeLessThanOrEqual(6);

    // UX Designer should be among top recommendations
    const topCareerIds = result.mainRecommendations.map(r => r.career.id);
    expect(topCareerIds).toContain('ux-designer');
    expect(topCareerIds[0]).toBe('ux-designer');

    // UX Designer should have Strong overlap or Good overlap band
    const uxMatch = result.mainRecommendations.find(r => r.career.id === 'ux-designer');
    expect(uxMatch?.band).toBe('Strong overlap');
    expect(uxMatch?.reasons.length).toBeGreaterThan(0);
  });

  it('handles completely skipped sections gracefully without crashing', () => {
    const minimalAnswers: AssessmentAnswers = {
      activityRatings: {
        i1: 5, i2: 5, i3: 5, // Pure investigative
      },
      subjects: [],
      growthSkills: [],
      environments: [],
      openness: 3,
    };

    const result = recommendCareers(minimalAnswers, careersData);

    expect(result.mainRecommendations.length).toBeGreaterThan(0);
    expect(result.flags.skippedSections).toContain('Subjects');
    expect(result.flags.skippedSections).toContain('Skills to grow');
    expect(result.flags.skippedSections).toContain('Work environments');

    // Science/Research careers should score highest on pure investigative
    const top = result.mainRecommendations[0];
    expect(top.career.riasec.I).toBeGreaterThanOrEqual(0.6);
  });

  it('detects a flat profile when student straight-lines all ratings', () => {
    const flatAnswers: AssessmentAnswers = {
      activityRatings: {
        r1: 3, r2: 3, r3: 3,
        i1: 3, i2: 3, i3: 3,
        a1: 3, a2: 3, a3: 3,
        s1: 3, s2: 3, s3: 3,
        e1: 3, e2: 3, e3: 3,
        c1: 3, c2: 3, c3: 3,
      },
      subjects: ['mathematics'],
      growthSkills: ['problem-solving'],
      environments: ['office'],
      openness: 3,
    };

    const result = recommendCareers(flatAnswers, careersData);
    expect(result.flags.flatProfile).toBe(true);
  });

  it('enforces cluster diversity cap (max 2 per cluster in main recommendations)', () => {
    // Student interested in computing
    const techAnswers: AssessmentAnswers = {
      activityRatings: {
        i1: 5, i2: 5, i3: 5,
        c1: 5, c2: 5, c3: 5,
        r1: 4, r2: 4, r3: 4,
      },
      subjects: ['computer-science', 'mathematics'],
      growthSkills: ['coding', 'problem-solving'],
      environments: ['office'],
      openness: 5,
    };

    const result = recommendCareers(techAnswers, careersData);
    const clusterCounts = new Map<string, number>();

    for (const rec of result.mainRecommendations) {
      const c = rec.career.cluster;
      clusterCounts.set(c, (clusterCounts.get(c) || 0) + 1);
    }

    for (const count of clusterCounts.values()) {
      expect(count).toBeLessThanOrEqual(2);
    }
  });
});
