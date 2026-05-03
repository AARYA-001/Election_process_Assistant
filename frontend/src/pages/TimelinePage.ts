export function renderTimelinePage(): HTMLElement {
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <section class="section section--visible" data-module="timeline">
      <div class="container">
        <div class="section__header">
          <div class="section__badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            ECI Election Lifecycle
          </div>
          <h1 class="section__title">The Indian Election Process</h1>
          <p class="section__subtitle">
            Follow the complete lifecycle of an Indian general election — from registration to results.
          </p>
        </div>
        <div id="timeline-container"></div>
      </div>
    </section>
  `;

  setTimeout(async () => {
    const { initTimeline } = await import('../modules/timeline');
    initTimeline();
  }, 0);

  return page;
}
