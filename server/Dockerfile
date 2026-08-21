FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY server/package.json server/package.json
COPY client/package.json client/package.json
RUN npm ci --omit=dev --workspace server --include-workspace-root
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN addgroup -S realstatex && adduser -S realstatex -G realstatex
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./package.json
COPY server ./server
USER realstatex
EXPOSE 5000
CMD ["node","server/src/server.js"]
