import type { TimelineStep } from '../types';

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 'electoral-roll',
    number: 1,
    title: 'Electoral Roll Preparation',
    subtitle: 'The Foundation of Every Election',
    date: 'Continuous — Annual revision by ECI',
    description: 'The ECI maintains and revises the electoral rolls for all constituencies. Citizens register via Form 6 through NVSP or their local ERO.',
    details: [
      'Electoral rolls are revised annually with a qualifying date of 1st January',
      'Special Summary Revision is conducted before major elections',
      'Citizens can register online at voters.eci.gov.in or through the Voter Helpline App',
      'BLOs conduct door-to-door verification in each booth area',
      'Draft rolls are published for public claims and objections before finalization',
    ],
    icon: '📋',
    color: '#1B3A6B',
  },
  {
    id: 'announcement',
    number: 2,
    title: 'Election Announcement & MCC',
    subtitle: 'Model Code of Conduct Activated',
    date: 'Announced by the ECI — typically 45–60 days before polling',
    description: 'The ECI announces the election schedule and the Model Code of Conduct (MCC) comes into immediate effect, restricting government and party activities.',
    details: [
      'MCC binds all political parties, candidates, and the government',
      'No new policy announcements or inaugurations by the ruling party after MCC',
      'Election observers are appointed by the ECI for each constituency',
      'Security arrangements begin with Central Armed Police Forces deployment',
      'Transfer of officials likely to influence elections is initiated',
    ],
    icon: '📢',
    color: '#FF6B00',
  },
  {
    id: 'nominations',
    number: 3,
    title: 'Nomination & Scrutiny',
    subtitle: 'Candidate Filing Process',
    date: 'Within the nomination window set by ECI',
    description: 'Candidates file nomination papers with the Returning Officer. Papers are scrutinized, and candidates can withdraw before the final list is published.',
    details: [
      'Candidates file nominations with a security deposit (₹25,000 for general, ₹12,500 for SC/ST)',
      'Affidavits disclosing criminal cases, assets, and educational qualifications are mandatory',
      'Returning Officer scrutinizes nominations for eligibility compliance',
      'Last date for withdrawal of candidature is set by ECI',
      'Final list of contesting candidates is published with allotted symbols',
    ],
    icon: '📝',
    color: '#138808',
  },
  {
    id: 'campaigning',
    number: 4,
    title: 'Campaign Period',
    subtitle: 'Reaching the Electorate',
    date: 'From nomination to 48 hours before polling',
    description: 'Parties and candidates campaign through rallies, media, and door-to-door visits. All campaigning must stop 48 hours before polling (silence period).',
    details: [
      'Campaign expenditure is capped by the ECI (varies by state and election type)',
      'Candidates must maintain expenditure accounts and submit them after elections',
      'Paid news and surrogate advertising are monitored by Media Certification committees',
      'Campaigning stops 48 hours before polling day (silence period)',
      'Exit polls are banned from the start of polling until the last phase concludes',
    ],
    icon: '🎪',
    color: '#1B3A6B',
  },
  {
    id: 'polling',
    number: 5,
    title: 'Polling Day',
    subtitle: 'The People Vote',
    date: 'As scheduled by ECI — may span multiple phases',
    description: 'Voters cast their ballot on EVMs at designated polling stations. VVPAT machines provide paper audit trails for verification.',
    details: [
      'Polling typically runs from 7 AM to 6 PM (varies by region and security considerations)',
      'EVMs are used across all polling stations with VVPAT for verification',
      'Indelible ink is applied to the left index finger to prevent repeat voting',
      'NOTA (None Of The Above) option is available on every EVM',
      'Booth agents of candidates monitor the process; presiding officers manage each booth',
    ],
    icon: '🗳️',
    color: '#FF6B00',
  },
  {
    id: 'counting',
    number: 6,
    title: 'Counting & Results',
    subtitle: 'Transparent Tabulation',
    date: 'Typically 3–4 days after the final phase of polling',
    description: 'EVM votes are counted at designated counting centres under the supervision of the Returning Officer, with mandatory VVPAT slip verification.',
    details: [
      'Counting begins with postal ballots, followed by EVM rounds',
      'Each round counts votes from a set of EVMs; results are announced round-wise',
      'Mandatory VVPAT slip verification is done for 5 randomly selected booths per Assembly segment',
      'Candidates or their agents can request a recount if the margin is narrow',
      'The Returning Officer declares the winner and issues the certificate of election',
    ],
    icon: '📊',
    color: '#138808',
  },
  {
    id: 'formation',
    number: 7,
    title: 'Government Formation',
    subtitle: 'Mandate of the People',
    date: 'Within days of results declaration',
    description: 'The party or coalition with a majority is invited by the President/Governor to form the government. The leader takes oath as PM/CM.',
    details: [
      'A party/coalition needs a simple majority (272 seats in Lok Sabha) to form the government',
      'The President invites the leader of the majority party/coalition to form the government',
      'In case of a hung parliament, the largest party may be asked to prove majority on the floor',
      'The Prime Minister and Council of Ministers take oath of office',
      'The MCC is lifted once the new government is sworn in',
    ],
    icon: '🏛️',
    color: '#1B3A6B',
  },
];

export function initTimeline(): void {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = '';

  const timeline = document.createElement('div');
  timeline.className = 'timeline';

  TIMELINE_STEPS.forEach((step, index) => {
    const stepEl = createTimelineStep(step, index);
    timeline.appendChild(stepEl);
  });

  container.appendChild(timeline);

  // Animate steps on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('timeline-step--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  timeline.querySelectorAll('.timeline-step').forEach(el => observer.observe(el));
}

function createTimelineStep(step: TimelineStep, index: number): HTMLElement {
  const el = document.createElement('div');
  el.className = `timeline-step timeline-step--${index % 2 === 0 ? 'left' : 'right'}`;
  el.style.setProperty('--step-color', step.color);

  el.innerHTML = `
    <div class="timeline-step__connector">
      <div class="timeline-step__dot" style="background: ${step.color}">
        <span class="timeline-step__number">${step.number}</span>
      </div>
    </div>
    <div class="timeline-step__card" data-step-id="${step.id}">
      <div class="timeline-step__header">
        <span class="timeline-step__icon">${step.icon}</span>
        <div>
          <h3 class="timeline-step__title">${step.title}</h3>
          <p class="timeline-step__subtitle">${step.subtitle}</p>
        </div>
      </div>
      <p class="timeline-step__date">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        ${step.date}
      </p>
      <p class="timeline-step__description">${step.description}</p>
      <div class="timeline-step__details" id="details-${step.id}">
        <ul>
          ${step.details.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
      <button class="timeline-step__toggle" data-target="details-${step.id}" aria-expanded="false">
        <span class="toggle-text">Learn More</span>
        <svg class="toggle-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
    </div>
  `;

  const toggleBtn = el.querySelector('.timeline-step__toggle') as HTMLButtonElement;
  const detailsEl = el.querySelector('.timeline-step__details') as HTMLElement;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    detailsEl.classList.toggle('timeline-step__details--open');
    const textEl = toggleBtn.querySelector('.toggle-text');
    if (textEl) textEl.textContent = isExpanded ? 'Learn More' : 'Show Less';
  });

  return el;
}
