import { describe, expect, it } from 'vitest';
import { getReadiness } from './health.service.js';

describe('readiness health check', () => {
  it('reports ready only when MongoDB is connected', () => {
    expect(getReadiness(1)).toMatchObject({ status: 'ready', checks: { database: 'up' } });
  });

  it.each([0, 2, 3])('reports not ready for MongoDB state %s', (state) => {
    expect(getReadiness(state)).toMatchObject({
      status: 'not_ready',
      checks: { database: 'down' },
    });
  });
});
