import { HTTP_STATUS } from '../constants/http-status.js';
import { AppError } from './app-error.js';

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      code: 'UNAUTHORIZED',
    });
  }
}
