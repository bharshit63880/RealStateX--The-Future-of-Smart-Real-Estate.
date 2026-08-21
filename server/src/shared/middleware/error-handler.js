import { config } from '../../config/index.js';
import { HTTP_STATUS } from '../constants/http-status.js';
import { logger } from '../logger/index.js';
import { errorResponse } from '../utils/response.js';
import fs from 'node:fs';

export const errorHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if(request.file?.path)fs.promises.unlink(request.file.path).catch(()=>{});
  const duplicate = error?.code === 11000;
  const invalidIdentifier = error?.name === 'CastError';
  const uploadError = error?.name === 'MulterError';
  const statusCode = duplicate ? HTTP_STATUS.CONFLICT : invalidIdentifier||uploadError ? HTTP_STATUS.BAD_REQUEST : error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const isOperational = error.isOperational === true || duplicate || invalidIdentifier || uploadError;
  const message = duplicate ? 'A record with these details already exists' : invalidIdentifier ? 'Invalid resource identifier' : uploadError ? 'Invalid document upload' : isOperational ? error.message : 'Internal server error';

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
      code: duplicate ? 'CONFLICT' : invalidIdentifier||uploadError ? 'BAD_REQUEST' : error.code || 'INTERNAL_ERROR',
      details: isOperational ? error.details : null,
      requestId: request.id,
      stack: config.isProduction ? undefined : error.stack,
    }),
  );
};
