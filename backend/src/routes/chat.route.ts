import { Router, Request, Response } from 'express';
import { streamGeminiResponse, RateLimitError } from '../services/gemini.service';
import { validateChatRequest } from '../middleware/validate';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { logger } from '../logger';
import crypto from 'crypto';

export const chatRouter = Router();

chatRouter.post(
  '/',
  rateLimitMiddleware,
  validateChatRequest,
  async (req: Request, res: Response) => {
    const { message, history = [] } = req.body;

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const requestId = crypto.randomUUID();
    logger.info({ requestId, messageLength: message.length }, 'Chat request started');

    try {
      for await (const token of streamGeminiResponse(message, history)) {
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      logger.info({ requestId }, 'Chat request completed');
    } catch (err) {
      logger.error({ requestId, err }, 'Gemini streaming error');

      let errorMessage = 'Generation failed. Please try again.';

      if (err instanceof RateLimitError) {
        const waitSec = Math.ceil(err.retryAfterMs / 1000);
        errorMessage = `The AI service is temporarily busy. Please wait about ${waitSec} seconds and try again.`;
      } else if (err instanceof Error && err.message.includes('API key')) {
        errorMessage = 'API configuration error. Please contact the administrator.';
      }

      res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
    } finally {
      res.end();
    }
  }
);
