import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';
import { logger } from '../logger';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const SYSTEM_PROMPT = `You are a neutral, factual election information assistant for Indian elections, specifically representing expertise on the Election Commission of India (ECI).
You explain voting processes, registration requirements, timelines, and civic procedures clearly.

Core Rules:
1. You are an expert in elections governed by the ECI (Lok Sabha, Rajya Sabha, State Legislative Assemblies, Presidential, Vice Presidential).
2. Cite ONLY these official sources: eci.gov.in, nvsp.in, voters.eci.gov.in, and the 1950 Voter Helpline.
3. Keep answers concise (under 200 words), use markdown for structure, and maintain absolute political neutrality.
4. Provide comprehensive guidance on Form 6 (new), 6A (NRI), 7 (deletion), 8 (correction), NOTA, EVM/VVPAT, Model Code of Conduct, reserved constituencies (SC/ST), indelible ink, and candidate affidavit lookup.

EDGE CASE INSTRUCTIONS (CRITICAL):
- Panchayat/Municipal Elections: You MUST explicitly state that these are conducted by State Election Commissions, NOT the ECI, and direct the user to their respective State EC website.
- Rajya Sabha Voting: Clearly explain the indirect election process; citizens do not vote directly for Rajya Sabha.
- EVM/VVPAT Safety or Controversy: Answer strictly factually based on the ECI's official position. Do not take political stances.
- US Elections: Refuse to answer. Redirect the user back to Indian election topics.
- Hindi Input: If the user asks in Hindi, you MUST respond in Hindi.
- Candidate Preferences: If asked about a candidate or party, stay completely neutral and direct the user to the ECI affidavit portal.
- How to check name on voter list: Always provide nvsp.in, the Voter Helpline App, and 1950.`;

const MAX_RETRIES = 3;
const RETRY_DELAYS = [5000, 15000, 30000]; // 5s, 15s, 30s

/** Custom error class for rate limiting */
export class RateLimitError extends Error {
  retryAfterMs: number;
  constructor(message: string, retryAfterMs: number) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfterMs = retryAfterMs;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractRetryDelay(err: unknown): number | null {
  try {
    const errAny = err as any;
    const details = errAny?.errorDetails ?? [];
    for (const detail of details) {
      if (detail?.['@type']?.includes('RetryInfo') && detail?.retryDelay) {
        const delayStr = String(detail.retryDelay);
        const seconds = parseFloat(delayStr.replace('s', ''));
        if (!isNaN(seconds)) return seconds * 1000;
      }
    }
  } catch { /* ignore parsing errors */ }
  return null;
}

function isRateLimitError(err: unknown): boolean {
  const errAny = err as any;
  return errAny?.status === 429 || errAny?.message?.includes('429') || errAny?.message?.includes('Too Many Requests');
}

export async function* streamGeminiResponse(
  userMessage: string,
  history: Array<{ role: string; content: string }>
): AsyncGenerator<string> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-001',
    systemInstruction: SYSTEM_PROMPT,
  });

  const chatHistory = history.map(m => ({
    role: m.role === 'user' ? 'user' as const : 'model' as const,
    parts: [{ text: m.content }],
  }));

  let lastError: unknown = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        const apiDelay = extractRetryDelay(lastError);
        const backoffDelay = RETRY_DELAYS[attempt - 1] ?? 30000;
        const waitMs = apiDelay ? Math.max(apiDelay, backoffDelay) : backoffDelay;
        logger.warn({ attempt, waitMs }, `Rate limited — retrying in ${waitMs}ms`);
        await sleep(waitMs);
      }

      const chat = model.startChat({ history: chatHistory });

      logger.debug(
        { messageLength: userMessage.length, historyLength: history.length, attempt },
        'Sending to Gemini'
      );

      const result = await chat.sendMessageStream(userMessage);

      for await (const chunk of result.stream) {
        const token = chunk.text();
        if (token) yield token;
      }

      // Successfully completed — return
      return;
    } catch (err) {
      lastError = err;

      if (isRateLimitError(err) && attempt < MAX_RETRIES) {
        // Will retry on next iteration
        continue;
      }

      // Non-retryable error, or all retries exhausted
      if (isRateLimitError(err)) {
        const retryMs = extractRetryDelay(err) ?? 60000;
        throw new RateLimitError(
          `API rate limit exceeded after ${MAX_RETRIES} retries. Please wait ~${Math.ceil(retryMs / 1000)}s.`,
          retryMs
        );
      }

      throw err;
    }
  }
}
