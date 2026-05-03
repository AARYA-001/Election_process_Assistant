import { Request, Response, NextFunction } from 'express';
import { Redis } from '@upstash/redis';
import { config } from '../config';
import { logger } from '../logger';

const redis = new Redis({
  url: config.upstashRedisUrl,
  token: config.upstashRedisToken,
});

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 20;

export async function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  const key = `rl:${req.ip}:${req.path}`;

  try {
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }

    res.setHeader('X-RateLimit-Limit', MAX_REQUESTS.toString());
    res.setHeader('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS - current).toString());

    if (current > MAX_REQUESTS) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a minute.',
        retryAfter: WINDOW_SECONDS,
      });
    }
  } catch (err) {
    // If Redis is down, allow request but log
    logger.warn({ err }, 'Rate limiter Redis error — allowing request');
  }

  next();
}
