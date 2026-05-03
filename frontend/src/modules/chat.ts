import { appStore } from '../state/store';
import { streamChatMessage } from '../api/chat.api';
import { sanitizeHTML } from '../utils/sanitize';
import { marked } from 'marked';
import { createLoadingSpinner } from '../components/LoadingSpinner';

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

const SUGGESTED_QUESTIONS = [
  'What is Form 6?',
  'What is NOTA?',
  'How do I register to vote?',
  'What is the Model Code of Conduct?'
];

export function initChat(): void {
  const messagesContainer = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input') as HTMLTextAreaElement;
  const chatSend = document.getElementById('chat-send');
  const suggestionsContainer = document.getElementById('chat-suggestions');

  if (!messagesContainer || !chatInput || !chatSend) return;

  // Render suggested questions
  if (suggestionsContainer) {
    renderSuggestions(suggestionsContainer, chatInput);
  }

  // Send on button click
  chatSend.addEventListener('click', () => handleSend(chatInput, messagesContainer));

  // Send on Enter (Shift+Enter for newline)
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(chatInput, messagesContainer);
    }
  });

  // Auto-resize textarea
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
  });

  // Subscribe to state changes
  appStore.subscribe((state) => {
    renderMessages(messagesContainer, state.chat.messages);
    chatInput.disabled = state.chat.isLoading;
    chatSend.classList.toggle('disabled', state.chat.isLoading);
  });

  // Add welcome message
  addWelcomeMessage(messagesContainer);
}

function addWelcomeMessage(container: HTMLElement): void {
  const welcome = document.createElement('div');
  welcome.className = 'chat-message chat-message--assistant chat-message--welcome';
  welcome.innerHTML = `
    <div class="chat-message__avatar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    </div>
    <div class="chat-message__content">
      <p><strong>Welcome!</strong> I'm your Indian Election Assistant. 🗳️</p>
      <p>I can help you understand:</p>
      <ul>
        <li>How elections are conducted by the ECI</li>
        <li>Voter registration and EPIC status</li>
        <li>Which forms to use (Form 6, 7, 8)</li>
        <li>EVMs, VVPAT, and NOTA</li>
        <li>Lok Sabha and State Assembly elections</li>
      </ul>
      <p>Try one of the questions below, or ask me anything about the Indian election process!</p>
    </div>
  `;
  container.appendChild(welcome);
}

function renderSuggestions(container: HTMLElement, input: HTMLTextAreaElement): void {
  container.innerHTML = '';
  SUGGESTED_QUESTIONS.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'chat-suggestion';
    btn.textContent = q;
    btn.addEventListener('click', () => {
      input.value = q;
      input.dispatchEvent(new Event('input'));
      const sendBtn = document.getElementById('chat-send');
      sendBtn?.click();
    });
    container.appendChild(btn);
  });
}

async function handleSend(input: HTMLTextAreaElement, _container: HTMLElement): Promise<void> {
  const message = input.value.trim();
  if (!message || appStore.get().chat.isLoading) return;

  input.value = '';
  input.style.height = 'auto';

  // Hide suggestions after first message
  const suggestionsEl = document.getElementById('chat-suggestions');
  if (suggestionsEl) suggestionsEl.style.display = 'none';

  const userMsgId = crypto.randomUUID();
  const assistantMsgId = crypto.randomUUID();

  // Add user message
  const currentMessages = appStore.get().chat.messages;
  appStore.set({
    chat: {
      messages: [...currentMessages, {
        id: userMsgId,
        role: 'user',
        content: message,
        timestamp: Date.now(),
      }],
      isLoading: true,
      error: null,
    },
  });

  // Add empty assistant message with streaming flag
  const msgs = appStore.get().chat.messages;
  appStore.set({
    chat: {
      ...appStore.get().chat,
      messages: [...msgs, {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
        isStreaming: true,
      }],
    },
  });

  // Stream response
  await streamChatMessage(
    message,
    appStore.get().chat.messages.filter(m => m.id !== assistantMsgId),
    // onToken
    (token: string) => {
      const messages = appStore.get().chat.messages.map(m =>
        m.id === assistantMsgId ? { ...m, content: m.content + token } : m
      );
      appStore.set({ chat: { ...appStore.get().chat, messages } });
    },
    // onError
    (error: string) => {
      const messages = appStore.get().chat.messages.map(m =>
        m.id === assistantMsgId
          ? { ...m, content: `⚠️ ${error}`, isStreaming: false, isError: true, retryMessage: message }
          : m
      );
      appStore.set({ chat: { messages, isLoading: false, error } });
    },
    // onDone
    () => {
      const messages = appStore.get().chat.messages.map(m => {
        if (m.id === assistantMsgId) {
          const rendered = marked.parse(m.content) as string;
          return { ...m, content: sanitizeHTML(rendered), isStreaming: false };
        }
        return m;
      });
      appStore.set({ chat: { messages, isLoading: false, error: null } });
    },
  );
}

function renderMessages(container: HTMLElement, messages: typeof appStore extends { get: () => infer S } ? S extends { chat: { messages: infer M } } ? M : never : never): void {
  // Keep the welcome message, remove everything else
  const welcome = container.querySelector('.chat-message--welcome');
  container.innerHTML = '';
  if (welcome) container.appendChild(welcome);

  messages.forEach(msg => {
    const el = document.createElement('div');
    el.className = `chat-message chat-message--${msg.role}`;
    el.setAttribute('data-testid', `${msg.role}-message`);

    if (msg.role === 'assistant') {
      const retryHtml = msg.isError
        ? `<button class="chat-retry-btn" data-retry-msg="${encodeURIComponent(msg.retryMessage || '')}">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
             Retry
           </button>`
        : '';

      el.innerHTML = `
        <div class="chat-message__avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div class="chat-message__content">
          ${msg.isStreaming ? msg.content + '<span class="typing-cursor"></span>' : msg.content}
          ${retryHtml}
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="chat-message__content">${escapeHtml(msg.content)}</div>
        <div class="chat-message__avatar chat-message__avatar--user">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      `;
    }

    container.appendChild(el);
  });

  // Show loading spinner during streaming
  const isLoading = appStore.get().chat.isLoading;
  const lastMsg = messages[messages.length - 1];
  if (isLoading && lastMsg?.isStreaming && lastMsg.content === '') {
    const spinnerWrapper = document.createElement('div');
    spinnerWrapper.className = 'chat-loading';
    spinnerWrapper.setAttribute('data-testid', 'loading-indicator');
    spinnerWrapper.appendChild(createLoadingSpinner('sm'));
    container.appendChild(spinnerWrapper);
  }

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;

  // Attach retry handlers
  container.querySelectorAll('.chat-retry-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const retryMsg = decodeURIComponent((btn as HTMLElement).dataset.retryMsg || '');
      if (!retryMsg) return;

      // Remove the error assistant message (keep user message)
      const currentMessages = appStore.get().chat.messages.filter(m => !m.isError);
      appStore.set({ chat: { messages: currentMessages, isLoading: false, error: null } });

      // Re-send the message
      const chatInput = document.getElementById('chat-input') as HTMLTextAreaElement;
      if (chatInput) {
        chatInput.value = retryMsg;
        chatInput.dispatchEvent(new Event('input'));
        document.getElementById('chat-send')?.click();
      }
    });
  });
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
