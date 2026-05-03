import { Request, Response, NextFunction } from 'express';

const MAX_MESSAGE_LENGTH = 500;
const BLOCKED_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /you\s+are\s+now\s+/i,
  /system\s+prompt/i,
  /jailbreak/i,
  /disregard\s+your/i,
  /pretend\s+you\s+are/i,
  /act\s+as\s+if/i,
  /override\s+(your|the)\s+/i,
];

export function validateChatRequest(req: Request, res: Response, next: NextFunction) {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message field is required and must be a string' });
  }

  if (message.trim().length === 0) {
    return res.status(400).json({ error: 'message cannot be empty' });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: `message exceeds ${MAX_MESSAGE_LENGTH} character limit` });
  }

  // Prompt injection guard
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(message)) {
      return res.status(400).json({ error: 'Invalid message content' });
    }
  }

  next();
}
