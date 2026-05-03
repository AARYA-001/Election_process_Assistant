import dotenv from 'dotenv';
dotenv.config();

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}

export const config = {
  port: parseInt(process.env.PORT ?? '3000'),
  geminiApiKey: requireEnv('GEMINI_API_KEY'),
  googleCivicApiKey: requireEnv('GOOGLE_CIVIC_API_KEY'),
  upstashRedisUrl: requireEnv('UPSTASH_REDIS_REST_URL'),
  upstashRedisToken: requireEnv('UPSTASH_REDIS_REST_TOKEN'),
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173').split(','),
  sentryDsn: process.env.SENTRY_DSN,
  nodeEnv: process.env.NODE_ENV ?? 'development',
};
