import type { ChatMessage } from '../types';

export async function streamChatMessage(
  message: string,
  history: ChatMessage[],
  onToken: (token: string) => void,
  onError: (error: string) => void,
  onDone: () => void,
): Promise<void> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: history.slice(-6).map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error((errorData as { error?: string }).error || `Server error: ${res.status}`);
    }

    if (!res.body) throw new Error('No response stream');

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const chunk = line.slice(6).trim();
        if (chunk === '[DONE]') {
          onDone();
          return;
        }

        try {
          const parsed = JSON.parse(chunk);
          if (parsed.error) {
            onError(parsed.error);
            return;
          }
          if (parsed.token) {
            onToken(parsed.token);
          }
        } catch {
          // Skip malformed chunks
        }
      }
    }

    onDone();
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Chat is temporarily unavailable.');
  }
}
