export function renderHomePage(): HTMLElement {
  const page = document.createElement('div');
  page.className = 'page-container';

  page.innerHTML = `
    <!-- Hero -->
    <section class="hero section section--visible" id="hero">
      <div class="hero__content">
        <div class="hero__badge">
          🇮🇳 Election Commission of India • AI-Powered Guide
        </div>
        <h1 class="hero__title">
          Understand the<br/>
          <span class="hero__title-highlight">Indian Election Process</span>
        </h1>
        <p class="hero__subtitle">
          Your interactive guide to Indian elections — from voter registration to results.
          Ask questions, explore ECI timelines, and get ready to vote.
        </p>
        <div class="hero__actions">
          <a href="/chat" class="btn btn--primary" data-link>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Ask the AI Assistant
          </a>
          <a href="/register" class="btn btn--secondary" data-link>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
            Register to Vote
          </a>
        </div>
      </div>
    </section>

    <!-- Quick-Action Cards -->
    <section class="section section--visible">
      <div class="container">
        <div class="quick-actions">
          <a href="/chat" class="quick-action-card" data-link>
            <span class="quick-action-card__icon">💬</span>
            <div>
              <div class="quick-action-card__title">Ask About Elections</div>
              <div class="quick-action-card__desc">Get instant answers about voting, forms, NOTA, EVM, and more.</div>
            </div>
          </a>
          <a href="/register" class="quick-action-card" data-link>
            <span class="quick-action-card__icon">📋</span>
            <div>
              <div class="quick-action-card__title">Voter Registration</div>
              <div class="quick-action-card__desc">Step-by-step guide for all 28 states and 8 union territories.</div>
            </div>
          </a>
          <a href="/voter-info" class="quick-action-card" data-link>
            <span class="quick-action-card__icon">🪪</span>
            <div>
              <div class="quick-action-card__title">Voter ID & EPIC</div>
              <div class="quick-action-card__desc">Check your name on the electoral roll and find your BLO.</div>
            </div>
          </a>
          <a href="/forms" class="quick-action-card" data-link>
            <span class="quick-action-card__icon">📝</span>
            <div>
              <div class="quick-action-card__title">Election Forms Guide</div>
              <div class="quick-action-card__desc">Form 6, 6A (NRI), 7, 8 — know which one you need.</div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section section--visible" id="faq">
      <div class="container">
        <div class="section__header">
          <div class="section__badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Common Questions
          </div>
          <h2 class="section__title">Frequently Asked Questions</h2>
          <p class="section__subtitle">Quick answers about the Indian electoral process.</p>
        </div>

        <div class="faq__list" id="faq-list">
          ${FAQ_ITEMS.map(item => `
            <div class="faq__item">
              <button class="faq__question" aria-expanded="false">
                ${item.q}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq__answer">
                <div class="faq__answer-content">${item.a}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // FAQ accordion
  setTimeout(() => {
    page.querySelectorAll('.faq__question').forEach(btn => {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        page.querySelectorAll('.faq__question').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          (b.nextElementSibling as HTMLElement)?.classList.remove('faq__answer--open');
        });
        if (!isExpanded) {
          btn.setAttribute('aria-expanded', 'true');
          (btn.nextElementSibling as HTMLElement)?.classList.add('faq__answer--open');
        }
      });
    });

    // Reveal sections on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    page.querySelectorAll('.section:not(.section--visible)').forEach(el => observer.observe(el));
  }, 0);

  return page;
}

const FAQ_ITEMS = [
  { q: 'Who is eligible to vote in Indian elections?', a: 'You must be an Indian citizen, at least 18 years old on the qualifying date (1st January of the year of revision), and a resident of the constituency. You must be registered on the electoral roll. Visit <a href="https://nvsp.in" target="_blank" rel="noopener">nvsp.in</a> to check your status.' },
  { q: 'What is Form 6 and when do I need it?', a: 'Form 6 is used for <strong>new voter registration</strong> or for transferring your registration to a new constituency. You can submit it online via <a href="https://voters.eci.gov.in" target="_blank" rel="noopener">voters.eci.gov.in</a> or at your local ERO office.' },
  { q: 'What is NOTA and how does it work?', a: 'NOTA (None Of The Above) is an option on the EVM that allows voters to reject all candidates. It was introduced by the Supreme Court in 2013. NOTA votes are counted but do not affect the election outcome — the candidate with the most votes still wins.' },
  { q: 'How do I check my name on the voter list?', a: 'Visit <a href="https://voters.eci.gov.in" target="_blank" rel="noopener">voters.eci.gov.in</a>, use the Voter Helpline App, or call <strong>1950</strong>. You can search by name or EPIC number.' },
  { q: 'What is an EVM and is it safe?', a: 'An Electronic Voting Machine (EVM) is a portable device used for voting in Indian elections. According to the ECI, EVMs are standalone machines with no network connectivity, making them tamper-proof. VVPAT (Voter Verified Paper Audit Trail) slips provide additional verification.' },
  { q: 'What documents do I need to vote?', a: 'Your EPIC (Voter ID card) is the primary document. Alternatively, you can use Aadhaar, passport, driving license, PAN card, or any of the 11 alternative photo IDs approved by the ECI.' },
  { q: 'How do Panchayat and Municipal elections work?', a: 'Panchayat and Municipal elections are conducted by <strong>State Election Commissions</strong>, not the ECI. Rules, timelines, and procedures vary by state. Contact your State EC for details.' },
  { q: 'Can NRIs vote in Indian elections?', a: 'Yes! NRIs can register using <strong>Form 6A</strong> on the NVSP portal. You must be physically present at the polling booth to vote — postal voting for NRIs is being considered but is not yet available for general elections.' },
  { q: 'What is the Model Code of Conduct (MCC)?', a: 'The MCC is a set of guidelines issued by the ECI that governs the conduct of political parties and candidates during elections. It comes into effect when elections are announced and remains until results are declared.' },
  { q: 'How do I find my polling booth?', a: 'Visit <a href="https://voters.eci.gov.in" target="_blank" rel="noopener">voters.eci.gov.in</a> and use the "Know Your Polling Booth" feature, or call <strong>1950</strong>. Your BLO (Booth Level Officer) can also help.' },
];
