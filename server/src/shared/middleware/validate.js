import { BadRequestError } from '../errors/bad-request-error.js';
export const validate = (schema) => (request, _response, next) => {
  const result = schema.safeParse({ body: request.body, params: request.params, query: request.query });
  if (!result.success) return next(new BadRequestError('Request validation failed', result.error.flatten()));
  request.validated = result.data;
  return next();
};
