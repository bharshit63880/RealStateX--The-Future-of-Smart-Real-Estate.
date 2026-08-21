# RealStateX API

Base URL: `/api/v1`. JSON responses use `{ success, message, data, error, meta, requestId }`. Protected routes require `Authorization: Bearer <access-token>`; refresh tokens are signed HttpOnly cookies.

## Operations

| Method | Path | Purpose |
|---|---|---|
| GET | `/health`, `/health/live` | Process liveness and database state |
| GET | `/health/ready` | Dependency readiness; returns 503 while MongoDB is unavailable |

## Identity

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/register` | Register buyer/seller/agent/builder/manager |
| POST | `/auth/login` | Create access and refresh session |
| POST | `/auth/refresh` | Rotate refresh token family |
| POST | `/auth/logout` | Revoke current refresh session |
| GET | `/auth/me` | Current profile |

## Marketplace

| Method | Path | Purpose |
|---|---|---|
| GET | `/properties` | Paginated public search |
| GET | `/properties/:slug` | Published property detail |
| GET | `/properties/mine` | Owner listings |
| POST | `/properties` | Create draft |
| PATCH | `/properties/:id` | Update editable draft |
| POST | `/properties/:id/submit` | Submit for moderation |
| POST | `/properties/:id/favourite` | Toggle saved property |
| POST | `/properties/:id/inquiries` | Create inquiry |

## Engagement and transactions

| Method | Path | Purpose |
|---|---|---|
| GET/POST | `/bookings` | List/request visits |
| PATCH | `/bookings/:id` | Confirm/reschedule/close visit |
| GET/POST | `/conversations` | List/start property chats |
| POST | `/conversations/:id/messages` | Send message |
| PATCH | `/conversations/:id/read` | Mark messages read |
| GET | `/notifications` | Activity inbox |
| PATCH | `/notifications/:id/read` | Mark notification read |
| PATCH | `/notifications/read-all` | Mark the current user's notification inbox read |

Booking updates enforce a server-side lifecycle (`REQUESTED` → `CONFIRMED`/`RESCHEDULED`/`CANCELLED`, then completion or no-show from an active visit). Requesters may only reschedule or cancel; hosts control confirmation and closure.
| GET/POST | `/offers` | List/create offers |
| PATCH | `/offers/:id` | Accept/reject/counter/withdraw |
| GET/POST | `/documents` | List/upload private PDF/image documents |
| GET | `/documents/:id/download` | Authorized audited download |
| PATCH | `/documents/:id/review` | Moderator verification |

## Business operations

| Method | Path | Purpose |
|---|---|---|
| GET/POST | `/projects` | Builder projects |
| POST | `/projects/:id/units` | Add inventory unit |
| GET/POST | `/leads` | Agent/builder CRM |
| PATCH | `/leads/:id` | Move lead and add note |
| GET/POST | `/leases` | Property-management leases |
| PATCH | `/leases/:id` | Advance a lease through its validated lifecycle |
| GET/POST | `/maintenance` | Maintenance queue |
| PATCH | `/maintenance/:id` | Assign/update ticket |
| GET | `/dashboard/summary` | Role-scoped live metrics |

## Moderation and administration

| Method | Path | Purpose |
|---|---|---|
| GET | `/moderation/listings` | Pending review queue |
| PATCH | `/moderation/listings/:id` | Review/status transition |
| GET/PATCH | `/admin/users[/:id]` | User governance |
| GET | `/admin/analytics` | Platform totals and breakdowns |
| GET | `/admin/audit-logs` | Paginated audit trail |

Create the first administrator only from a trusted deployment shell:

```bash
ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD='replace-with-a-strong-secret' npm run admin:create --workspace server
```

Do not expose this command as an HTTP endpoint.
