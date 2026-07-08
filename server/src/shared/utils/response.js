export const successResponse = ({ message = 'Success', data = null, meta = null, requestId }) => ({
  success: true,
  message,
  data,
  error: null,
  meta,
  requestId,
});

export const errorResponse = ({ message, code, details = null, requestId, stack }) => ({
  success: false,
  message,
  data: null,
  error: {
    code,
    details,
    stack,
  },
  meta: null,
  requestId,
});
