import pino from 'pino';

const isProduction = (process.env.NODE_ENV ?? 'development') === 'production';

export const logger = pino({
  level: isProduction ? 'warn' : 'debug',
  transport: !isProduction
    ? { target: 'pino-pretty' }
    : undefined,
  base: { service: 'election-assistant-api' },
});
