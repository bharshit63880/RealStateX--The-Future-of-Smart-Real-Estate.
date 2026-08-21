# RealStateX production runbook

## Required infrastructure

- Node.js 22 or the supplied containers
- MongoDB 8 replica set/Atlas with backups, point-in-time recovery and TLS
- HTTPS reverse proxy and a dedicated application domain
- Encrypted persistent storage mounted at `DOCUMENT_STORAGE_PATH` (or a private object-storage adapter)
- Central log/metric drain and uptime alerts for `/api/v1/health/live`; route traffic only when `/api/v1/health/ready` returns 200.

## Secrets

Generate unique values of at least 32 random bytes for `COOKIE_SECRET`, `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET`. Never reuse development values. Set `DATABASE_REQUIRED=true`, an allow-listed `CLIENT_URL`, and a least-privilege MongoDB user. Rotate secrets through the deployment platform, never through Git.

## Release gate

Run `npm ci`, `npm run lint`, `npm test`, `npm run build`, and `npm audit --audit-level=high`. Deploy to staging, exercise registration, refresh rotation, property submission/moderation, visit booking, messaging, offers, documents and each role workspace. Confirm backups and rollback before production promotion.

## Containers

Copy `.env.example` to `.env`, replace every secret and run `docker compose up --build -d`. The web application is exposed on port `8080`; MongoDB is not published to the host. For real production, use a managed database and external TLS ingress.

## Operational controls

- Refresh tokens are hashed and rotated; reuse revokes the entire token family.
- Access tokens are short-lived, held in browser memory, and checked against active account state plus a revocable security version.
- Password changes and “sign out all devices” immediately revoke refresh sessions and already-issued access tokens.
- Admin, moderation and transaction mutations emit audit records.
- Global and stricter authentication rate limits, Helmet, strict CORS, signed HttpOnly cookies and body limits are enabled.
- Document uploads enforce authentication, ownership/manager scope, 25 MB limits, allowed MIME/signature checks, SHA-256 checksums and audited downloads. Back `DOCUMENT_STORAGE_PATH` with encrypted persistent storage and malware scanning in production.
