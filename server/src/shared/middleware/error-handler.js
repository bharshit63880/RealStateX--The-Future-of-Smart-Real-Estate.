import { config } from '../../config/index.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { logger } from '../logger/index.js';
import { errorResponse } from '../utils/response.js';

export const errorHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const isOperational = error.isOperational === true;
  const message = isOperational ? error.message : 'Internal server error';

  logger.error(
    {
      error,
      requestId: request.id,
      method: request.method,
      path: request.originalUrl,
    },
    message,
  );

  response.status(statusCode).json(
    errorResponse({
      message,
      code: error.code || 'INTERNAL_ERROR',
      details: isOperational ? error.details : null,
      requestId: request.id,
      stack: config.isProduction ? undefined : error.stack,
    }),
  );
};
