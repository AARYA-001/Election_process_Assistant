# Security Policy & Architecture

## Overview
The Indian Election Assistant is a public, stateless civic information tool. By design, the application minimizes security risk by avoiding persistent user data, authentication systems, and complex database architectures.

## Architecture Security
* **Stateless Design:** The application has no user accounts, login systems, or databases. Therefore, it is immune to account takeover, session hijacking, and Insecure Direct Object Reference (IDOR) vulnerabilities.
* **Secret Management:** All sensitive credentials (e.g., `GEMINI_API_KEY`, `UPSTASH_REDIS_REST_URL`) are strictly loaded server-side via environment variables. The repository is configured to prevent accidental commits of any `.env` variants.
* **Frontend Keys:** The only API key present on the frontend is the Google Maps API key (if configured), which should be HTTP Referrer-restricted in the Google Cloud Console.

## API Protection
The backend API (`/api/chat`) acts as a proxy to Google Gemini and is protected by:
1. **Rate Limiting:** Upstash Redis is used to distribute rate limits by IP address, preventing abuse and API quota exhaustion.
2. **Input Validation:** All incoming requests are strictly validated using `zod` to ensure expected payloads and lengths.
3. **CORS:** Cross-Origin Resource Sharing is strictly bound to the known frontend origins.
4. **Graceful Retries:** The AI service implementation includes exponential backoff to handle upstream rate limiting (429s) without exposing raw error traces to the client.

## Content Security
* **Sanitization:** All AI-generated output is sanitized using `DOMPurify` on the frontend to prevent Cross-Site Scripting (XSS).
* **CSP Headers:** The backend uses `helmet` to inject strict Content Security Policy headers.
* **Prompt Engineering:** The AI assistant uses a hardened system prompt designed to refuse non-election questions and maintain strict political neutrality.

## Reporting a Vulnerability
If you discover a security vulnerability within this project, please do not disclose it publicly. Contact the repository maintainers directly with details to allow for a coordinated patch.
