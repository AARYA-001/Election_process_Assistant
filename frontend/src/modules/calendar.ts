import { buildGoogleCalendarUrl, ELECTION_EVENTS } from '../utils/calendar';
import { showToast } from '../components/Toast';

export function initCalendar(): void {
  const container = document.getElementById('calendar-container');
  if (!container) return;

  container.innerHTML = `
    <div class="calendar-events">
      ${ELECTION_EVENTS.map(event => {
        const calendarUrl = buildGoogleCalendarUrl(event);
        const eventDate = parseDate(event.startDate);

        return `
          <div class="calendar-event">
            <div class="calendar-event__date-badge">
              <span class="calendar-event__month">${eventDate.month}</span>
              <span class="calendar-event__day">${eventDate.day}</span>
              <span class="calendar-event__year">${eventDate.year}</span>
            </div>
            <div class="calendar-event__info">
              <h4 class="calendar-event__title">${event.title}</h4>
              <p class="calendar-event__description">${event.description}</p>
            </div>
            <a href="${calendarUrl}" target="_blank" rel="noopener noreferrer"
               class="calendar-event__add-btn"
               data-event-title="${event.title}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <line x1="12" y1="14" x2="12" y2="18"/>
                <line x1="10" y1="16" x2="14" y2="16"/>
              </svg>
              Add to Calendar
            </a>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Track clicks for feedback
  container.querySelectorAll('.calendar-event__add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = (btn as HTMLElement).dataset.eventTitle || 'Event';
      showToast({ message: `Opening Google Calendar for "${title}"`, type: 'success', duration: 3000 });
    });
  });
}

function parseDate(dateStr: string): { month: string; day: string; year: string } {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = dateStr.slice(0, 4);
  const monthIndex = parseInt(dateStr.slice(4, 6)) - 1;
  const day = dateStr.slice(6, 8);

  return {
    month: months[monthIndex],
    day,
    year,
  };
}
