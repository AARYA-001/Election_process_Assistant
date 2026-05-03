export function renderFormsPage(): HTMLElement {
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <section class="section section--visible">
      <div class="container">
        <div class="section__header">
          <div class="section__badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            ECI Official Forms
          </div>
          <h1 class="section__title">Election Forms Guide</h1>
          <p class="section__subtitle">
            Know which form to use for registration, correction, deletion, or NRI voting.
          </p>
        </div>

        <div class="info-cards">
          <div class="info-card">
            <div class="info-card__icon">📄</div>
            <h3 class="info-card__title">Form 6 — New Registration</h3>
            <p class="info-card__text">
              Use Form 6 to register as a new voter or to transfer your registration to a
              different constituency. Required documents: age proof, address proof, and a
              passport-size photo. Submit online at the Voter Portal or at your ERO office.
            </p>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" class="info-card__link">
              Apply online →
            </a>
          </div>

          <div class="info-card">
            <div class="info-card__icon">✈️</div>
            <h3 class="info-card__title">Form 6A — NRI Registration</h3>
            <p class="info-card__text">
              NRIs (Non-Resident Indians) can register using Form 6A. You will be enrolled
              in the constituency of your last known address in India. Note: NRIs must be
              physically present to vote — proxy/postal voting is not yet available for general elections.
            </p>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" class="info-card__link">
              Apply online →
            </a>
          </div>

          <div class="info-card">
            <div class="info-card__icon">🗑️</div>
            <h3 class="info-card__title">Form 7 — Objection / Deletion</h3>
            <p class="info-card__text">
              Form 7 is used to object to the inclusion of a name in the electoral roll or
              to request deletion. This is typically used when a voter has shifted permanently,
              passed away, or is no longer eligible.
            </p>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" class="info-card__link">
              Submit Form 7 →
            </a>
          </div>

          <div class="info-card">
            <div class="info-card__icon">✏️</div>
            <h3 class="info-card__title">Form 8 — Correction of Entries</h3>
            <p class="info-card__text">
              Use Form 8 to correct errors in your existing voter registration — such as
              name spelling, age, gender, address, or photo. Available in sub-variants:
              Form 8A (transposition within AC) and Form 8B (address change within AC).
            </p>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" class="info-card__link">
              Submit corrections →
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  return page;
}
