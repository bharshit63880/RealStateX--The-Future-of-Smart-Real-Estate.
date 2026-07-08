import { HTTP_STATUS } from '../constants/http-status.js';
import { AppError } from './app-error.js';

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, {
      statusCode: HTTP_STATUS.NOT_FOUND,
      code: 'NOT_FOUND',
    });
  }
}
