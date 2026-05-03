import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';
import crypto from 'crypto';

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const requestId = crypto.randomUUID();

  logger.error({
    requestId,
    method: req.method,
    path: req.path,
    error: err.message,
    stack: err.stack,
  }, 'Unhandled error');

  // Never expose stack traces to clients
  res.status(500).json({
    error: 'An unexpected error occurred.',
    requestId,
  });
}
