export function renderChatPage(): HTMLElement {
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <section class="section section--visible">
      <div class="container" style="max-width: 800px;">
        <div class="section__header" style="margin-bottom: var(--space-xl);">
          <div class="section__badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            AI Assistant
          </div>
          <h1 class="section__title">Ask About Elections</h1>
        </div>

        <div class="chat-container" style="height: calc(100vh - 280px); min-height: 400px; display: flex; flex-direction: column; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); overflow: hidden;">
          
          <div class="chat-messages" id="chat-messages" style="flex: 1; overflow-y: auto; padding: var(--space-lg); display: flex; flex-direction: column; gap: var(--space-md);">
            <!-- Messages will be injected here by chat.ts -->
          </div>
          
          <div class="chat-suggestions" id="chat-suggestions" style="padding: 0 var(--space-lg) var(--space-md); display: flex; gap: var(--space-sm); overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;">
            <!-- Suggestions injected by chat.ts -->
          </div>

          <div class="chat-input-area" style="padding: var(--space-md) var(--space-lg); border-top: 1px solid var(--color-border); background: var(--color-bg); display: flex; gap: var(--space-sm); align-items: flex-end;">
            <textarea id="chat-input" class="chat-input" placeholder="Ask about the Indian election process..." rows="1" style="flex: 1; resize: none; padding: var(--space-sm) var(--space-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: inherit; font-size: var(--fs-body); background: var(--color-surface); max-height: 120px; outline: none; transition: border-color var(--transition-fast);"></textarea>
            <button id="chat-send" class="btn btn--primary" style="padding: var(--space-sm); height: 44px; width: 44px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); flex-shrink: 0;" title="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  `;

  // Inline styles for hidden scrollbar on suggestions
  const style = document.createElement('style');
  style.textContent = `
    #chat-suggestions::-webkit-scrollbar {
      display: none;
    }
    #chat-input:focus {
      border-color: var(--color-primary);
    }
  `;
  page.appendChild(style);

  setTimeout(async () => {
    const { initChat } = await import('../modules/chat');
    initChat();
  }, 0);

  return page;
}
