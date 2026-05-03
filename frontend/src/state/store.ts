import type { AppState } from '../types';

type Listener<T> = (state: T) => void;

class Store<T extends object> {
  private state: T;
  private listeners: Set<Listener<T>> = new Set();

  constructor(initial: T) {
    this.state = structuredClone(initial);
  }

  get(): T {
    return this.state;
  }

  set(partial: Partial<T>): void {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach(fn => fn(this.state));
  }

  subscribe(fn: Listener<T>): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

export const appStore = new Store<AppState>({
  chat: { messages: [], isLoading: false, error: null },
  locator: { results: [], isLoading: false, error: null },
  activeSection: 'hero',
});
