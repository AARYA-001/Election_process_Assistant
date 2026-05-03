export function renderVoterInfoPage(): HTMLElement {
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <section class="section section--visible">
      <div class="container">
        <div class="section__header">
          <div class="section__badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            Voter Resources
          </div>
          <h1 class="section__title">Voter Information</h1>
          <p class="section__subtitle">
            Essential resources for every Indian voter — from EPIC lookup to finding your BLO.
          </p>
        </div>

        <div class="info-cards">
          <div class="info-card">
            <div class="info-card__icon">🪪</div>
            <h3 class="info-card__title">EPIC / Voter ID Card</h3>
            <p class="info-card__text">
              The Electors Photo Identity Card (EPIC) is your primary voter ID.
              You can check your EPIC status, download your e-EPIC, or apply for a new one online.
            </p>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" class="info-card__link">
              Check at voters.eci.gov.in →
            </a>
          </div>

          <div class="info-card">
            <div class="info-card__icon">📞</div>
            <h3 class="info-card__title">Voter Helpline — 1950</h3>
            <p class="info-card__text">
              Call <strong>1950</strong> (toll-free) for any election-related queries.
              Available in multiple languages across all states. You can also use the 
              <strong>Voter Helpline App</strong> on Android/iOS.
            </p>
            <a href="tel:1950" class="info-card__link">Call 1950 →</a>
          </div>

          <div class="info-card">
            <div class="info-card__icon">🏠</div>
            <h3 class="info-card__title">NVSP Portal</h3>
            <p class="info-card__text">
              The National Voter Services Portal lets you register, check your name 
              on the electoral roll, find your polling booth, and track your application status.
            </p>
            <a href="https://nvsp.in" target="_blank" rel="noopener" class="info-card__link">
              Visit nvsp.in →
            </a>
          </div>

          <div class="info-card">
            <div class="info-card__icon">👤</div>
            <h3 class="info-card__title">Booth Level Officer (BLO)</h3>
            <p class="info-card__text">
              Your BLO is the field-level officer assigned to your polling booth area.
              They help with registration, voter list corrections, and EPIC distribution.
              Contact your local ERO office to find your BLO.
            </p>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" class="info-card__link">
              Find your BLO →
            </a>
          </div>

          <div class="info-card">
            <div class="info-card__icon">🗳️</div>
            <h3 class="info-card__title">Know Your Polling Booth</h3>
            <p class="info-card__text">
              Find your assigned polling station using your EPIC number or name search.
              Your polling booth is determined by your constituency and part number on the electoral roll.
            </p>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" class="info-card__link">
              Find your booth →
            </a>
          </div>

          <div class="info-card">
            <div class="info-card__icon">📊</div>
            <h3 class="info-card__title">Candidate Affidavits</h3>
            <p class="info-card__text">
              All candidates must file affidavits disclosing criminal cases, assets, liabilities,
              and educational qualifications. These are publicly available on the ECI website.
            </p>
            <a href="https://affidavit.eci.gov.in" target="_blank" rel="noopener" class="info-card__link">
              View affidavits →
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  return page;
}
