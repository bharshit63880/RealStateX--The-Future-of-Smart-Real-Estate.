import { HTTP_STATUS } from '../constants/http-status.js';

export class AppError extends Error {
  constructor(message, options = {}) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = options.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    this.code = options.code ?? 'INTERNAL_ERROR';
    this.details = options.details ?? null;
    this.isOperational = options.isOperational ?? true;

    Error.captureStackTrace(this, this.constructor);
  }
}
