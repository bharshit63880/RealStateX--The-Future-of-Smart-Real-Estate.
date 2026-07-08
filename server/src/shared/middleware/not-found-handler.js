import { NotFoundError } from '../errors/not-found-error.js';

export const notFoundHandler = (request, response, next) => {
  next(new NotFoundError(`Route not found: ${request.method} ${request.originalUrl}`));
};
