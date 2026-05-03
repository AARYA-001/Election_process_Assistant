export function renderRegisterPage(): HTMLElement {
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <section class="section section--visible">
      <div class="container">
        <div class="section__header">
          <div class="section__badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            </svg>
            NVSP / ECI Portal
          </div>
          <h1 class="section__title">Voter Registration Guide</h1>
          <p class="section__subtitle">
            Step-by-step walkthrough for all 28 states and 8 union territories.
          </p>
        </div>
        <div id="registration-container"></div>
      </div>
    </section>
  `;

  setTimeout(async () => {
    const { initRegistration } = await import('../modules/registration');
    initRegistration();
  }, 0);

  return page;
}
