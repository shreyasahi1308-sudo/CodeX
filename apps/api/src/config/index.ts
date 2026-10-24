import dotenv from 'dotenv';
import path from 'path';

// Load .env from apps/api/.env or current working directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config();

export interface Config {
  port: number;
  nodeEnv: string;
  hfToken?: string;
  databasePath: string;
  clientOrigin: string;
}

export const config: Config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  hfToken: process.env.HF_TOKEN?.trim() || undefined,
  databasePath: process.env.DATABASE_PATH || './data/career_discovery.db',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
};

// Safe audit logging (never logs tokens)
export function logConfig(): void {
  console.log(`[Config] Running in ${config.nodeEnv} mode`);
  console.log(`[Config] API Port: ${config.port}`);
  console.log(`[Config] SQLite Database: ${config.databasePath}`);
  console.log(`[Config] Hugging Face Token: ${config.hfToken ? 'CONFIGURED (Active)' : 'NOT CONFIGURED (Using Deterministic Fallback)'}`);
}
