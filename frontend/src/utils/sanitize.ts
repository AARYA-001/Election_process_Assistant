import DOMPurify from 'dompurify';

// Never render raw AI output — always sanitize first
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'br', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ADD_ATTR: ['target'],
  });
}
