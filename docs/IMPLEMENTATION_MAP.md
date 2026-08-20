# RealStateX implementation map

## Audit baseline

The repository began as a small Vite/React and Express foundation. It had routing, a health endpoint, configuration, request IDs, rate limiting, structured logging, centralized errors, and MongoDB connection scaffolding. The README described a target architecture; it did not represent implemented product functionality.

## Current release

| Capability | Status | Notes |
| --- | --- | --- |
| Cinematic public homepage | Implemented | Supplied video is mapped to scroll position with rAF and reduced-motion fallback. |
| Public discovery | Prototype | Connected routes and deterministic Indian property seed data. |
| Property detail | Prototype | Editorial detail route; advanced media, documents, and booking are not enabled. |
| Property search API | Implemented foundation | Query, city, intent, type, bedroom, price, verification, pagination. Demo seed is explicitly marked. |
| Health, errors, logging, rate limits | Implemented | Existing foundation preserved. |
| Mongo persistence | Foundation | Connection exists; property repository extraction remains. |
| Authentication and RBAC | Planned | Must not be represented as live until sessions, persistence, and verification are integrated. |
| Geo/Elasticsearch | External-service blocked | Data contracts include GeoJSON; provider and indexing pipeline are not configured. |
| AI, payments, chat, documents | Planned | No fake predictions, payments, messages, or document storage are exposed. |

## Next phases

1. Persist property aggregates and indexes in MongoDB, then add seller-owned draft/review/publish workflows.
2. Add password hashing, rotating refresh sessions, central permissions, email verification, and protected routes.
3. Extract search behind a provider interface and add Elasticsearch geo queries with Mongo fallback.
4. Add visit booking and notifications transactionally, followed by chat and offer workflows.
5. Add private object storage and audited document authorization.
