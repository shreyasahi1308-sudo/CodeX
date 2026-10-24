import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { config } from '../config/index.js';
import { Career, TryActivity, AssessmentAnswers, RecommendationResponse, SavedCareerRecord } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) {
    return dbInstance;
  }

  // Ensure directory exists
  const fullDbPath = path.resolve(process.cwd(), config.databasePath);
  const dbDir = path.dirname(fullDbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  console.log(`[Database] Connecting to SQLite at ${fullDbPath}`);
  dbInstance = new DatabaseSync(fullDbPath);
  dbInstance.exec('PRAGMA foreign_keys = ON;');
  dbInstance.exec('PRAGMA journal_mode = WAL;');

  // Run schema
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    dbInstance.exec(schemaSql);
  }

  return dbInstance;
}

export function closeDatabase(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
    console.log('[Database] SQLite connection closed.');
  }
}

// Data Access Helpers
export const careerRepo = {
  getAll(): Career[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM careers ORDER BY name ASC');
    const rows = stmt.all() as any[];
    return rows.map(deserializeCareer);
  },

  getById(id: string): Career | null {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM careers WHERE id = ?');
    const row = stmt.get(id) as any;
    return row ? deserializeCareer(row) : null;
  },

  getByCluster(cluster: string): Career[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM careers WHERE cluster = ? ORDER BY name ASC');
    const rows = stmt.all(cluster) as any[];
    return rows.map(deserializeCareer);
  },

  search(query: string): Career[] {
    const db = getDatabase();
    const pattern = `%${query.toLowerCase()}%`;
    const stmt = db.prepare(`
      SELECT * FROM careers 
      WHERE LOWER(name) LIKE ? OR LOWER(summary) LIKE ? OR LOWER(cluster_name) LIKE ?
      ORDER BY name ASC
    `);
    const rows = stmt.all(pattern, pattern, pattern) as any[];
    return rows.map(deserializeCareer);
  },

  upsert(career: Career): void {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO careers (
        id, name, cluster, cluster_name, summary, day_in_life_json, riasec_json,
        subjects_json, skills_json, developable_skills_json, environments_json,
        pathways_json, salary_range_json, beginner_activities_json, trial_activity_id,
        adjacent_json, sources_json, last_verified, verification, uncertainties_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        cluster = excluded.cluster,
        cluster_name = excluded.cluster_name,
        summary = excluded.summary,
        day_in_life_json = excluded.day_in_life_json,
        riasec_json = excluded.riasec_json,
        subjects_json = excluded.subjects_json,
        skills_json = excluded.skills_json,
        developable_skills_json = excluded.developable_skills_json,
        environments_json = excluded.environments_json,
        pathways_json = excluded.pathways_json,
        salary_range_json = excluded.salary_range_json,
        beginner_activities_json = excluded.beginner_activities_json,
        trial_activity_id = excluded.trial_activity_id,
        adjacent_json = excluded.adjacent_json,
        sources_json = excluded.sources_json,
        last_verified = excluded.last_verified,
        verification = excluded.verification,
        uncertainties_json = excluded.uncertainties_json
    `);

    stmt.run(
      career.id,
      career.name,
      career.cluster,
      career.clusterName,
      career.summary,
      JSON.stringify(career.dayInLife),
      JSON.stringify(career.riasec),
      JSON.stringify(career.subjects),
      JSON.stringify(career.skills),
      JSON.stringify(career.developableSkills),
      JSON.stringify(career.environments),
      JSON.stringify(career.pathways),
      JSON.stringify(career.salaryRange),
      JSON.stringify(career.beginnerActivities),
      career.trialActivityId || null,
      JSON.stringify(career.adjacent),
      JSON.stringify(career.sources),
      career.lastVerified,
      career.verification,
      JSON.stringify(career.uncertainties)
    );
  }
};

export const activityRepo = {
  getAll(): TryActivity[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM activities ORDER BY title ASC');
    const rows = stmt.all() as any[];
    return rows.map(deserializeActivity);
  },

  getById(id: string): TryActivity | null {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM activities WHERE id = ?');
    const row = stmt.get(id) as any;
    return row ? deserializeActivity(row) : null;
  },

  getByCareerId(careerId: string): TryActivity | null {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM activities WHERE career_id = ?');
    const row = stmt.get(careerId) as any;
    return row ? deserializeActivity(row) : null;
  },

  upsert(activity: TryActivity): void {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO activities (
        id, career_id, title, area, duration_minutes, scenario,
        instructions, type, interactive_data_json, reflection_questions_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        career_id = excluded.career_id,
        title = excluded.title,
        area = excluded.area,
        duration_minutes = excluded.duration_minutes,
        scenario = excluded.scenario,
        instructions = excluded.instructions,
        type = excluded.type,
        interactive_data_json = excluded.interactive_data_json,
        reflection_questions_json = excluded.reflection_questions_json
    `);

    stmt.run(
      activity.id,
      activity.careerId,
      activity.title,
      activity.area,
      activity.durationMinutes,
      activity.scenario,
      activity.instructions,
      activity.type,
      JSON.stringify(activity.interactiveData),
      JSON.stringify(activity.reflectionQuestions)
    );
  }
};

export const sessionRepo = {
  save(sessionId: string, answers: AssessmentAnswers, response: RecommendationResponse): void {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO assessment_sessions (
        id, answers_json, riasec_scores_json, recommendations_json, flags_json
      ) VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        answers_json = excluded.answers_json,
        riasec_scores_json = excluded.riasec_scores_json,
        recommendations_json = excluded.recommendations_json,
        flags_json = excluded.flags_json
    `);

    stmt.run(
      sessionId,
      JSON.stringify(answers),
      JSON.stringify(response.riasecScores),
      JSON.stringify({
        main: response.mainRecommendations,
        stretch: response.stretchRecommendations,
      }),
      JSON.stringify(response.flags)
    );
  },

  getById(sessionId: string): { answers: AssessmentAnswers; response: RecommendationResponse } | null {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM assessment_sessions WHERE id = ?');
    const row = stmt.get(sessionId) as any;
    if (!row) return null;

    const recs = JSON.parse(row.recommendations_json);
    return {
      answers: JSON.parse(row.answers_json),
      response: {
        sessionId: row.id,
        mainRecommendations: recs.main,
        stretchRecommendations: recs.stretch,
        riasecScores: JSON.parse(row.riasec_scores_json),
        flags: row.flags_json ? JSON.parse(row.flags_json) : {},
      },
    };
  }
};

export const savedCareerRepo = {
  save(sessionId: string, careerId: string, notes?: string): void {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO saved_careers (session_id, career_id, notes)
      VALUES (?, ?, ?)
      ON CONFLICT(session_id, career_id) DO UPDATE SET
        notes = excluded.notes,
        saved_at = CURRENT_TIMESTAMP
    `);
    stmt.run(sessionId, careerId, notes || null);
  },

  remove(sessionId: string, careerId: string): void {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM saved_careers WHERE session_id = ? AND career_id = ?');
    stmt.run(sessionId, careerId);
  },

  getBySession(sessionId: string): SavedCareerRecord[] {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT sc.*, c.name, c.cluster, c.summary
      FROM saved_careers sc
      JOIN careers c ON sc.career_id = c.id
      WHERE sc.session_id = ?
      ORDER BY sc.saved_at DESC
    `);
    const rows = stmt.all(sessionId) as any[];
    return rows.map(r => ({
      id: r.id,
      sessionId: r.session_id,
      careerId: r.career_id,
      career: careerRepo.getById(r.career_id) || undefined,
      savedAt: r.saved_at,
      notes: r.notes || undefined,
    }));
  }
};

export const reflectionRepo = {
  save(
    sessionId: string,
    activityId: string,
    userAction: any,
    reflectionAnswers: any,
    feedback: any,
    dimensionShift: any
  ): void {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO activity_reflections (
        session_id, activity_id, user_action_json, reflection_answers_json,
        feedback_json, dimension_shift_json
      ) VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      sessionId,
      activityId,
      JSON.stringify(userAction),
      JSON.stringify(reflectionAnswers),
      JSON.stringify(feedback),
      JSON.stringify(dimensionShift)
    );
  },

  getBySession(sessionId: string): any[] {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT ar.*, a.title as activity_title, a.area
      FROM activity_reflections ar
      JOIN activities a ON ar.activity_id = a.id
      WHERE ar.session_id = ?
      ORDER BY ar.created_at DESC
    `);
    const rows = stmt.all(sessionId) as any[];
    return rows.map(r => ({
      id: r.id,
      sessionId: r.session_id,
      activityId: r.activity_id,
      activityTitle: r.activity_title,
      area: r.area,
      userAction: JSON.parse(r.user_action_json),
      reflectionAnswers: JSON.parse(r.reflection_answers_json),
      feedback: JSON.parse(r.feedback_json),
      dimensionShift: JSON.parse(r.dimension_shift_json),
      createdAt: r.created_at,
    }));
  }
};

function deserializeCareer(row: any): Career {
  return {
    id: row.id,
    name: row.name,
    cluster: row.cluster,
    clusterName: row.cluster_name,
    summary: row.summary,
    dayInLife: JSON.parse(row.day_in_life_json),
    riasec: JSON.parse(row.riasec_json),
    subjects: JSON.parse(row.subjects_json),
    skills: JSON.parse(row.skills_json),
    developableSkills: JSON.parse(row.developable_skills_json),
    environments: JSON.parse(row.environments_json),
    pathways: JSON.parse(row.pathways_json),
    salaryRange: JSON.parse(row.salary_range_json),
    beginnerActivities: JSON.parse(row.beginner_activities_json),
    trialActivityId: row.trial_activity_id || undefined,
    adjacent: JSON.parse(row.adjacent_json),
    sources: JSON.parse(row.sources_json),
    lastVerified: row.last_verified,
    verification: row.verification,
    uncertainties: JSON.parse(row.uncertainties_json),
  };
}

function deserializeActivity(row: any): TryActivity {
  return {
    id: row.id,
    careerId: row.career_id,
    title: row.title,
    area: row.area,
    durationMinutes: row.duration_minutes,
    scenario: row.scenario,
    instructions: row.instructions,
    type: row.type,
    interactiveData: JSON.parse(row.interactive_data_json),
    reflectionQuestions: JSON.parse(row.reflection_questions_json),
  };
}
