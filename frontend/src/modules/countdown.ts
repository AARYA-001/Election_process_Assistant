// Next presidential election: November 7, 2028
const ELECTION_DATE = new Date('2028-11-07T00:00:00');

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getCountdown(): CountdownValues {
  const now = new Date().getTime();
  const total = ELECTION_DATE.getTime() - now;

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((total % (1000 * 60)) / 1000),
    total,
  };
}

export function initCountdown(): void {
  const container = document.getElementById('countdown-container');
  if (!container) return;

  // Build the countdown UI
  container.innerHTML = `
    <div class="countdown">
      <div class="countdown__label">Next Presidential Election</div>
      <div class="countdown__date">November 7, 2028</div>
      <div class="countdown__grid">
        <div class="countdown__unit" id="cd-days">
          <div class="countdown__value">---</div>
          <div class="countdown__name">Days</div>
        </div>
        <div class="countdown__separator">:</div>
        <div class="countdown__unit" id="cd-hours">
          <div class="countdown__value">--</div>
          <div class="countdown__name">Hours</div>
        </div>
        <div class="countdown__separator">:</div>
        <div class="countdown__unit" id="cd-minutes">
          <div class="countdown__value">--</div>
          <div class="countdown__name">Minutes</div>
        </div>
        <div class="countdown__separator">:</div>
        <div class="countdown__unit" id="cd-seconds">
          <div class="countdown__value">--</div>
          <div class="countdown__name">Seconds</div>
        </div>
      </div>
    </div>
  `;

  // Update every second
  function update() {
    const cd = getCountdown();

    const setVal = (id: string, val: number, pad: number = 2) => {
      const el = document.querySelector(`#${id} .countdown__value`);
      if (el) {
        const newVal = String(val).padStart(pad, '0');
        if (el.textContent !== newVal) {
          el.textContent = newVal;
          el.classList.remove('countdown__value--flip');
          void (el as HTMLElement).offsetWidth; // Force reflow
          el.classList.add('countdown__value--flip');
        }
      }
    };

    setVal('cd-days', cd.days, 3);
    setVal('cd-hours', cd.hours);
    setVal('cd-minutes', cd.minutes);
    setVal('cd-seconds', cd.seconds);
  }

  update();
  setInterval(update, 1000);
}
