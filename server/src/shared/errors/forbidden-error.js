import { HTTP_STATUS } from '../constants/http-status.js';
import { AppError } from './app-error.js';

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, {
      statusCode: HTTP_STATUS.FORBIDDEN,
      code: 'FORBIDDEN',
    });
  }
}
