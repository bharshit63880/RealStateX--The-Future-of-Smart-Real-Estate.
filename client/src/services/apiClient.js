import { env } from '@config/env.js';

let accessToken = null;
export const setApiAccessToken = (token) => { accessToken = token; };

export class ApiClientError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'ApiClientError';
    this.status = options.status;
    this.payload = options.payload;
  }
}

export const apiClient = async (path, options = {}) => {
  const { headers: optionHeaders, ...requestOptions } = options;
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...requestOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...optionHeaders,
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiClientError(payload?.message || 'API request failed', {
      status: response.status,
      payload,
    });
  }

  return payload;
};
