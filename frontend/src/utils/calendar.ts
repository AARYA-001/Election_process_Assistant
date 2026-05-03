interface CalendarEvent {
  title: string;
  description: string;
  startDate: string; // YYYYMMDD format
  endDate?: string;
  location?: string;
}

/**
 * Generates a Google Calendar URL for a given event.
 * Pure function — fully testable, no side effects.
 */
export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    dates: `${event.startDate}/${event.endDate ?? event.startDate}`,
  });

  if (event.location) {
    params.set('location', event.location);
  }

  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`;
}

/**
 * Predefined election events for the 2028 cycle.
 */
export const ELECTION_EVENTS: CalendarEvent[] = [
  {
    title: '📋 Voter Registration Deadline Check',
    description: 'Check your state voter registration deadline at vote.gov. Most states require registration 15-30 days before Election Day.',
    startDate: '20281007',
    endDate: '20281007',
  },
  {
    title: '🗳️ Early Voting Period Begins',
    description: 'Early voting begins in many states. Check your state election board for specific dates and locations. Visit vote.gov for more info.',
    startDate: '20281020',
    endDate: '20281106',
  },
  {
    title: '🇺🇸 General Election Day',
    description: 'Election Day! Polls are open. Find your polling location and bring required ID. Visit vote.gov for details.',
    startDate: '20281107',
    endDate: '20281107',
  },
  {
    title: '🏛️ Presidential Inauguration Day',
    description: 'Presidential Inauguration Day — the newly elected or re-elected President takes office.',
    startDate: '20290120',
    endDate: '20290120',
  },
];
