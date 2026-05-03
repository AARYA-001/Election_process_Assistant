export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  isError?: boolean;
  retryMessage?: string;
}

export interface PollingLocation {
  name: string;
  address: string;
  hours: string;
  distance?: number;
  lat?: number;
  lng?: number;
}

export interface ElectionEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'registration' | 'primary' | 'general' | 'deadline' | 'convention' | 'inauguration';
  details: string[];
}

export interface TimelineStep {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  details: string[];
  icon: string;
  color: string;
}

export interface AppState {
  chat: {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
  };
  locator: {
    results: PollingLocation[];
    isLoading: boolean;
    error: string | null;
  };
  activeSection: string;
}
