import express from 'express';
import { config } from './config';
import { logger } from './logger';
import { applySecurityHeaders } from './middleware/security';
import { corsMiddleware } from './middleware/cors';
import { globalErrorHandler } from './middleware/errorHandler';
import { chatRouter } from './routes/chat.route';

import { healthRouter } from './routes/health.route';
import { civicRouter } from './routes/civic.route';
const app = express();

// ─── Security ───────────────────────────────────────────────
applySecurityHeaders(app);
app.use(corsMiddleware);

// ─── Body parsing ───────────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // Hard cap on payload size

// ─── Routes ─────────────────────────────────────────────────
app.use('/api/chat', chatRouter);
app.use('/api/civic', civicRouter);

app.use('/healthz', healthRouter);

// ─── Global error handler (must be LAST) ────────────────────
app.use(globalErrorHandler);

// ─── Start server ───────────────────────────────────────────
const server = app.listen(config.port, () => {
  logger.info({
    port: config.port,
    env: config.nodeEnv,
  }, '🗳️  Election Assistant API is running');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received — shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled rejection — shutting down');
  process.exit(1);
});

export default app;
