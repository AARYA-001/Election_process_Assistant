interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  fields?: RegistrationField[];
  info?: string[];
}

interface RegistrationField {
  type: 'select' | 'text' | 'info';
  label: string;
  options?: string[];
  value?: string;
}

const STATES_AND_UTS = [
  'Select your state/UT...',
  // 28 States
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  // 8 Union Territories
  'Andaman & Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi (NCT)', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

const REGISTRATION_STEPS: RegistrationStep[] = [
  {
    id: 'eligibility',
    title: 'Check Your Eligibility',
    description: 'Verify that you meet the basic requirements to register as a voter in India.',
    info: [
      '✅ You must be an <strong>Indian citizen</strong>',
      '✅ You must be at least <strong>18 years old</strong> on the qualifying date (1st January of the revision year)',
      '✅ You must be an <strong>ordinary resident</strong> of the constituency where you wish to register',
      '✅ You must not be disqualified under Section 16 of the R.P. Act, 1950 (unsound mind, corrupt practices, etc.)',
    ],
  },
  {
    id: 'state',
    title: 'Select Your State / UT',
    description: 'Choose your state or union territory. You will be registered in the constituency of your current residence.',
    fields: [
      {
        type: 'select',
        label: 'State / Union Territory',
        options: STATES_AND_UTS,
      },
    ],
  },
  {
    id: 'method',
    title: 'Choose Registration Method',
    description: 'Select how you would like to submit your registration. All methods use Form 6.',
    info: [
      '🌐 <strong>Online via Voter Portal</strong> — Register at <a href="https://voters.eci.gov.in" target="_blank">voters.eci.gov.in</a> or through the Voter Helpline App.',
      '🏢 <strong>In Person at ERO Office</strong> — Visit your local Electoral Registration Officer with filled Form 6 and documents.',
      '✈️ <strong>NRI? Use Form 6A</strong> — Non-Resident Indians can register online. You must be physically present to vote.',
      '📋 <strong>Form Disambiguation</strong> — Form 6 = new/transfer, Form 7 = deletion, Form 8 = correction. <a href="/forms" data-link>Learn more about forms →</a>',
    ],
  },
  {
    id: 'documents',
    title: 'Gather Required Documents',
    description: 'Prepare the following documents before starting your application.',
    info: [
      '🪪 <strong>Age proof</strong> — Birth certificate, school leaving certificate, Aadhaar, or passport',
      '📮 <strong>Address proof</strong> — Aadhaar, ration card, utility bill, bank passbook, or rent agreement',
      '📷 <strong>Passport-size photograph</strong> — Recent colour photo with white background',
      '🔢 <strong>For online submission</strong> — Mobile number linked to Aadhaar for OTP verification',
    ],
  },
  {
    id: 'complete',
    title: 'Submit & Track',
    description: 'Complete your application and track its status.',
    info: [
      '📝 Fill out <strong>Form 6</strong> with all required details and upload documents',
      '📱 After submission, you will receive a <strong>Reference ID</strong> — save it to track your application',
      '🏠 The BLO (Booth Level Officer) may visit for physical verification',
      '✅ Once approved, your name will appear on the electoral roll and you will receive your EPIC',
      '🔍 Check status anytime at <a href="https://voters.eci.gov.in" target="_blank">voters.eci.gov.in</a> or call <strong>1950</strong>',
    ],
  },
];

export function initRegistration(): void {
  const container = document.getElementById('registration-container');
  if (!container) return;

  let currentStep = 0;

  function render() {
    const step = REGISTRATION_STEPS[currentStep];
    const progress = ((currentStep + 1) / REGISTRATION_STEPS.length) * 100;

    if (!container) return;
    container.innerHTML = `
      <div class="registration-wizard">
        <div class="registration-wizard__progress">
          <div class="registration-wizard__progress-bar" style="width: ${progress}%"></div>
          <span class="registration-wizard__progress-text">Step ${currentStep + 1} of ${REGISTRATION_STEPS.length}</span>
        </div>

        <div class="registration-wizard__step" data-step="${step.id}">
          <h3 class="registration-wizard__title">${step.title}</h3>
          <p class="registration-wizard__description">${step.description}</p>

          ${step.fields ? renderFields(step.fields) : ''}
          ${step.info ? renderInfo(step.info) : ''}
        </div>

        <div class="registration-wizard__nav">
          <button class="registration-wizard__btn registration-wizard__btn--prev" ${currentStep === 0 ? 'disabled' : ''}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Previous
          </button>
          ${currentStep < REGISTRATION_STEPS.length - 1 ? `
            <button class="registration-wizard__btn registration-wizard__btn--next">
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          ` : `
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer"
               class="registration-wizard__btn registration-wizard__btn--register">
              Register at voters.eci.gov.in
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          `}
        </div>
      </div>
    `;

    // Bind navigation
    if (container) {
      container.querySelector('.registration-wizard__btn--prev')?.addEventListener('click', () => {
        if (currentStep > 0) { currentStep--; render(); }
      });
      container.querySelector('.registration-wizard__btn--next')?.addEventListener('click', () => {
        if (currentStep < REGISTRATION_STEPS.length - 1) { currentStep++; render(); }
      });
    }
  }

  render();
}

function renderFields(fields: RegistrationField[]): string {
  return `<div class="registration-wizard__fields">
    ${fields.map(f => {
      if (f.type === 'select') {
        return `
          <div class="registration-wizard__field">
            <label class="registration-wizard__label">${f.label}</label>
            <select class="registration-wizard__select">
              ${f.options?.map(o => `<option value="${o}">${o}</option>`).join('')}
            </select>
          </div>
        `;
      }
      return '';
    }).join('')}
  </div>`;
}

function renderInfo(items: string[]): string {
  return `<div class="registration-wizard__info">
    ${items.map(item => `<div class="registration-wizard__info-item">${item}</div>`).join('')}
  </div>`;
}
