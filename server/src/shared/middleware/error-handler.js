import { config } from '../../config/index.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { logger } from '../logger/index.js';
import { errorResponse } from '../utils/response.js';

export const errorHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  const duplicate = error?.code === 11000;
  const invalidIdentifier = error?.name === 'CastError';
  const statusCode = duplicate ? HTTP_STATUS.CONFLICT : invalidIdentifier ? HTTP_STATUS.BAD_REQUEST : error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const isOperational = error.isOperational === true || duplicate || invalidIdentifier;
  const message = duplicate ? 'A record with these details already exists' : invalidIdentifier ? 'Invalid resource identifier' : isOperational ? error.message : 'Internal server error';

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
      code: duplicate ? 'CONFLICT' : invalidIdentifier ? 'BAD_REQUEST' : error.code || 'INTERNAL_ERROR',
      details: isOperational ? error.details : null,
      requestId: request.id,
      stack: config.isProduction ? undefined : error.stack,
    }),
  );
};
