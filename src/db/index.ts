import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

interface CloudflareEnv {
  DB: D1Database;
}

export function getDb(env: CloudflareEnv) {
  return drizzle(env.DB, { schema });
}

export * from './schema';
