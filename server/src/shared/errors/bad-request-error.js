import { HTTP_STATUS } from '../constants/http-status.js';
import { AppError } from './app-error.js';

export class BadRequestError extends AppError {
  constructor(message = 'Bad request', details = null) {
    super(message, {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      code: 'BAD_REQUEST',
      details,
    });
  }
}
