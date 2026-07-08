# RealStateX

Production-ready MERN modular monolith foundation for a real-estate platform.

## Stack

- MongoDB
- Express
- React
- Node.js
- JavaScript only

## Workspaces

- `server`: Express API, config, logging, database, errors, and modules.
- `client`: Vite React app, routing, shared UI, services, and styles.
- `docs`: architecture and folder explanations.

## Commands

```bash
npm install
npm run dev:server
npm run dev:client
npm run lint
npm run format:check
```

## Notes

Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env`
before running locally. Secrets must never be committed.
