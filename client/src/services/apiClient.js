import { env } from '@config/env.js';

export class ApiClientError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'ApiClientError';
    this.status = options.status;
    this.payload = options.payload;
  }
}

export const apiClient = async (path, options = {}) => {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
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
