export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly recoverable: boolean = true,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network error. Please check your connection.') {
    super(message, 'NETWORK_ERROR', true);
    this.name = 'NetworkError';
  }
}

export class RateLimitError extends AppError {
  constructor(public readonly retryAfter: number = 60) {
    super(`Too many requests. Please wait ${retryAfter} seconds.`, 'RATE_LIMIT', true);
    this.name = 'RateLimitError';
  }
}
