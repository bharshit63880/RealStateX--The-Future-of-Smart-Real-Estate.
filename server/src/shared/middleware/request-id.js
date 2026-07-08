import crypto from 'node:crypto';

export const requestId = (request, response, next) => {
  const existingRequestId = request.get('x-request-id');
  const id = existingRequestId || crypto.randomUUID();

  request.id = id;
  response.setHeader('x-request-id', id);

  next();
};
