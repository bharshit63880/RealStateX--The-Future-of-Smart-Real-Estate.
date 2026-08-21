import dotenv from 'dotenv';

import { ENVIRONMENTS } from '../shared/constants/environments.js';

dotenv.config();

const required = (key, fallback) => {
  const value = process.env[key] ?? fallback;

  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const numberFromEnv = (key, fallback) => {
  const rawValue = required(key, fallback);
  const parsed = Number(rawValue);

  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }

  return parsed;
};

export const config = {
  nodeEnv: required('NODE_ENV', ENVIRONMENTS.DEVELOPMENT),
  isProduction: process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION,
  port: numberFromEnv('PORT', '5000'),
  apiVersion: required('API_VERSION', 'v1'),
  clientUrl: required('CLIENT_URL', 'http://localhost:5173'),
  mongoUri: required('MONGODB_URI'),
  mongoDatabase: required('MONGODB_DATABASE', 'realstatex'),
  mongoFallbackHosts: process.env.MONGODB_FALLBACK_HOSTS || '',
  mongoReplicaSet: process.env.MONGODB_REPLICA_SET || '',
  databaseRequired:
    required(
      'DATABASE_REQUIRED',
      process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION ? 'true' : 'false',
    ) === 'true',
  logLevel: required('LOG_LEVEL', 'info'),
  requestBodyLimit: required('REQUEST_BODY_LIMIT', '1mb'),
  cookieSecret: required('COOKIE_SECRET'),
  jwt: {
    accessSecret: required('JWT_ACCESS_SECRET'),
    refreshSecret: required('JWT_REFRESH_SECRET'),
    accessExpiresIn: required('JWT_ACCESS_EXPIRES_IN', '15m'),
    refreshExpiresInDays: numberFromEnv('JWT_REFRESH_EXPIRES_IN_DAYS', '30'),
  },
  auth: {
    maxFailedLogins: numberFromEnv('AUTH_MAX_FAILED_LOGINS', '5'),
    lockMinutes: numberFromEnv('AUTH_LOCK_MINUTES', '15'),
  },
  rateLimit: {
    windowMs: numberFromEnv('RATE_LIMIT_WINDOW_MS', '900000'),
    max: numberFromEnv('RATE_LIMIT_MAX', '300'),
  },
};
