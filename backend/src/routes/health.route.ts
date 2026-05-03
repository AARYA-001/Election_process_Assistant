import { Router } from 'express';
import { cacheService } from '../services/cache.service';

export const healthRouter = Router();

healthRouter.get('/', async (_, res) => {
  const checks: Record<string, 'ok' | 'fail'> = {};

  // Check Redis connectivity
  try {
    await cacheService.ping();
    checks.redis = 'ok';
  } catch {
    checks.redis = 'fail';
  }

  const allOk = Object.values(checks).every(v => v === 'ok');
  res.status(allOk ? 200 : 503).json({
    status: allOk ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
