import { Redis } from '@upstash/redis';
import { config } from '../config';
import { logger } from '../logger';

const redis = new Redis({
  url: config.upstashRedisUrl,
  token: config.upstashRedisToken,
});

export const cacheService = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get<T>(key);
      return data;
    } catch (err) {
      logger.warn({ key, err }, 'Cache GET failed — proceeding without cache');
      return null;
    }
  },

  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    try {
      await redis.set(key, JSON.stringify(value), { ex: ttlSeconds });
    } catch (err) {
      logger.warn({ key, err }, 'Cache SET failed — continuing without caching');
    }
  },

  async ping(): Promise<string> {
    const result = await redis.ping();
    return result;
  },
};
