import helmet from 'helmet';
import { Express } from 'express';

export function applySecurityHeaders(app: Express): void {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'maps.googleapis.com'],
        connectSrc: ["'self'", 'maps.googleapis.com'],
        imgSrc: ["'self'", 'data:', 'maps.gstatic.com', '*.googleapis.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
        frameSrc: ["'none'"],
      }
    },
    crossOriginEmbedderPolicy: false,
  }));

  // Prevent MIME sniffing
  app.use((_, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
}
