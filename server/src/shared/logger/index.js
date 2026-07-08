import pino from 'pino';
import pinoHttp from 'pino-http';

import { config } from '../../config/index.js';

export const logger = pino({
  level: config.logLevel,
  base: {
    service: 'realstatex-api',
    env: config.nodeEnv,
  },
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'password',
      'passwordHash',
      'accessToken',
      'refreshToken',
    ],
    remove: true,
  },
  transport: config.isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: true,
        },
      },
});

export const httpLogger = pinoHttp({
  logger,
  genReqId: (request) => request.id,
});
