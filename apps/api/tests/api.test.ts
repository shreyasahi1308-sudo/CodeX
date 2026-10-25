import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Server } from 'http';
import { startServer } from '../src/server.js';
import { closeDatabase } from '../src/db/index.js';

describe('Career Discovery Platform - API Integration Tests', () => {
  let server: Server;
  const baseUrl = 'http://localhost:4000/api';

  beforeAll(async () => {
    try {
      const probe = await fetch(`${baseUrl}/health`).catch(() => null);
      if (!probe || !probe.ok) {
        server = startServer();
        await new Promise(r => setTimeout(r, 400));
      }
    } catch {
      server = startServer();
      await new Promise(r => setTimeout(r, 400));
    }
  });

  afterAll(async () => {
    if (server) {
      await new Promise<void>(resolve => server.close(() => resolve()));
      closeDatabase();
    }
  });

  it('GET /api/health returns healthy status with Gemma configuration info', async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('healthy');
    expect(data.database).toBe('connected');
    expect(data.aiProvider.model).toBe('google/gemma-4-31B-it:novita');
    expect(typeof data.aiProvider.tokenConfigured).toBe('boolean');
  });

  it('GET /api/careers returns verified careers dataset with filtering', async () => {
    const res = await fetch(`${baseUrl}/careers`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.count).toBeGreaterThanOrEqual(15);

    // Test search filter
    const searchRes = await fetch(`${baseUrl}/careers?q=design`);
    const searchData = await searchRes.json();
    expect(searchData.success).toBe(true);
    expect(searchData.data.some((c: any) => c.id === 'ux-designer')).toBe(true);
  });

  it('GET /api/careers/:id returns deep-dive career profile with verified pathways and exams', async () => {
    const res = await fetch(`${baseUrl}/careers/ux-designer`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.data.name).toBe('UX / Product Designer');
    expect(data.data.pathways.length).toBeGreaterThan(0);
    expect(data.data.pathways[0].exams.length).toBeGreaterThan(0);
    expect(data.data.salaryRange.entry).toBeDefined();
  });

  it('POST /api/assessments runs deterministic recommendation engine and saves session', async () => {
    const payload = {
      activityRatings: {
        r1: 2, r2: 2, r3: 2,
        i1: 5, i2: 5, i3: 4,
        a1: 5, a2: 3, a3: 3,
        s1: 4, s2: 3, s3: 3,
        e1: 2, e2: 2, e3: 2,
        c1: 2, c2: 3, c3: 2,
      },
      subjects: ['computer-science', 'art-design'],
      growthSkills: ['design-thinking', 'coding'],
      environments: ['studio'],
      openness: 4,
    };

    const res = await fetch(`${baseUrl}/assessments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.data.sessionId).toBeDefined();
    expect(data.data.mainRecommendations.length).toBeGreaterThan(0);
    expect(data.data.mainRecommendations[0].career.id).toBe('ux-designer');

    // Retrieve by saved session ID
    const getRes = await fetch(`${baseUrl}/assessments/${data.data.sessionId}`);
    expect(getRes.status).toBe(200);
    const sessionData = await getRes.json();
    expect(sessionData.success).toBe(true);
    expect(sessionData.data.response.mainRecommendations[0].career.id).toBe('ux-designer');
  });

  it('POST /api/careers/:id/explain generates explanation with verified context and fallback resilience', async () => {
    const res = await fetch(`${baseUrl}/careers/ux-designer/explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: {
          activityRatings: { a1: 5, i1: 5 },
          subjects: ['computer-science', 'art-design'],
          growthSkills: ['design-thinking'],
          environments: ['studio'],
          openness: 4,
        },
        scorePercent: 88,
      }),
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.data.summary).toBeDefined();
    expect(data.data.interest_connections.length).toBeGreaterThan(0);
    expect(data.data.indian_pathway_guidance).toBeDefined();
    expect(data.meta.model).toBeDefined();
  });

  it('POST /api/compare compares multiple careers side-by-side', async () => {
    const res = await fetch(`${baseUrl}/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        careerIds: ['ux-designer', 'data-scientist', 'software-engineer'],
      }),
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.data.careers.length).toBe(3);
    expect(data.data.careers[0].streamRequired).toBeDefined();
  });

  it('GET and POST /api/activities manages signature micro-challenges and reflections', async () => {
    const listRes = await fetch(`${baseUrl}/activities`);
    expect(listRes.status).toBe(200);
    const listData = await listRes.json();
    expect(listData.count).toBeGreaterThanOrEqual(5);

    // Submit activity reflection
    const subRes = await fetch(`${baseUrl}/activities/ux-screen-fixer/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'test_session_123',
        userAction: { solved: true, flawsIdentified: ['flaw-1', 'flaw-2', 'flaw-4'] },
        reflectionAnswers: { 'ref-1': 'rearranging', 'ref-2': 'test_users' },
      }),
    });

    expect(subRes.status).toBe(200);
    const subData = await subRes.json();
    expect(subData.success).toBe(true);
    expect(subData.data.evaluation.praise).toBeDefined();
    expect(subData.data.dimensionShift.A).toBe(0.1); // rearranging shifted A by +0.1
  });

  it('POST, GET, and DELETE /api/saved persists bookmarked careers', async () => {
    const sessionId = 'test_save_session_456';

    // Save
    const saveRes = await fetch(`${baseUrl}/saved`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        careerId: 'ux-designer',
        notes: 'Love the creative side of technology',
      }),
    });
    expect(saveRes.status).toBe(200);

    // Get
    const getRes = await fetch(`${baseUrl}/saved/${sessionId}`);
    expect(getRes.status).toBe(200);
    const getData = await getRes.json();
    expect(getData.count).toBe(1);
    expect(getData.data[0].careerId).toBe('ux-designer');
    expect(getData.data[0].notes).toBe('Love the creative side of technology');

    // Remove
    const delRes = await fetch(`${baseUrl}/saved/${sessionId}/ux-designer`, {
      method: 'DELETE',
    });
    expect(delRes.status).toBe(200);

    // Verify removed
    const getRes2 = await fetch(`${baseUrl}/saved/${sessionId}`);
    const getData2 = await getRes2.json();
    expect(getData2.count).toBe(0);
  });

  it('POST /api/careers/:id/ask and POST /api/mentor/chat return mentor answers with context', async () => {
    // 1. Career-specific ask
    const careerRes = await fetch(`${baseUrl}/careers/ux-designer/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'What stream is required in Class 11?',
        history: [],
      }),
    });
    expect(careerRes.status).toBe(200);
    const careerData = await careerRes.json();
    expect(careerData.success).toBe(true);
    expect(careerData.reply).toBeDefined();
    expect(careerData.reply.length).toBeGreaterThan(20);
    expect(careerData.meta).toBeDefined();

    // 2. General mentor chat (e.g. from Interactive Career Mentor card)
    const generalRes = await fetch(`${baseUrl}/mentor/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'How do I decide between Science, Commerce, and Humanities?',
        history: [],
      }),
    });
    expect(generalRes.status).toBe(200);
    const generalData = await generalRes.json();
    expect(generalData.success).toBe(true);
    expect(generalData.reply).toContain('Science');
    expect(generalData.meta.model).toBeDefined();

    // 3. Validation: empty question rejected
    const emptyRes = await fetch(`${baseUrl}/mentor/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: '   ' }),
    });
    expect(emptyRes.status).toBe(400);
  });
});
