export function createErrorBoundary(container: HTMLElement, fallbackMessage: string) {
  return {
    wrap: async (fn: () => Promise<void>) => {
      try {
        await fn();
      } catch (err) {
        console.error('ErrorBoundary caught:', err);
        container.innerHTML = `
          <div class="error-state" role="alert">
            <div class="error-state__icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <p class="error-state__message">${fallbackMessage}</p>
            <button class="error-state__retry" onclick="location.reload()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Retry
            </button>
          </div>
        `;
      }
    }
  };
}
