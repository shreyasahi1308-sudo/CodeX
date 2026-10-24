-- Career Discovery Platform Database Schema (SQLite)

CREATE TABLE IF NOT EXISTS careers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  cluster TEXT NOT NULL,
  cluster_name TEXT NOT NULL,
  summary TEXT NOT NULL,
  day_in_life_json TEXT NOT NULL,
  riasec_json TEXT NOT NULL,
  subjects_json TEXT NOT NULL,
  skills_json TEXT NOT NULL,
  developable_skills_json TEXT NOT NULL,
  environments_json TEXT NOT NULL,
  pathways_json TEXT NOT NULL,
  salary_range_json TEXT NOT NULL,
  beginner_activities_json TEXT NOT NULL,
  trial_activity_id TEXT,
  adjacent_json TEXT NOT NULL,
  sources_json TEXT NOT NULL,
  last_verified TEXT NOT NULL,
  verification TEXT NOT NULL,
  uncertainties_json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_careers_cluster ON careers(cluster);

CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  career_id TEXT NOT NULL,
  title TEXT NOT NULL,
  area TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  scenario TEXT NOT NULL,
  instructions TEXT NOT NULL,
  type TEXT NOT NULL,
  interactive_data_json TEXT NOT NULL,
  reflection_questions_json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assessment_sessions (
  id TEXT PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  answers_json TEXT NOT NULL,
  riasec_scores_json TEXT NOT NULL,
  recommendations_json TEXT NOT NULL,
  flags_json TEXT
);

CREATE TABLE IF NOT EXISTS saved_careers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  career_id TEXT NOT NULL,
  notes TEXT,
  saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(session_id, career_id),
  FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_saved_careers_session ON saved_careers(session_id);

CREATE TABLE IF NOT EXISTS activity_reflections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  activity_id TEXT NOT NULL,
  user_action_json TEXT NOT NULL,
  reflection_answers_json TEXT NOT NULL,
  feedback_json TEXT NOT NULL,
  dimension_shift_json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reflections_session ON activity_reflections(session_id);
