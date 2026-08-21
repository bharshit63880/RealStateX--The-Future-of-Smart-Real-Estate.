import { describe, expect, it } from 'vitest';
import { canTransitionLease } from './lease-state.js';

describe('lease state machine', () => {
  it('allows activation and notice lifecycle', () => {
    expect(canTransitionLease('DRAFT', 'ACTIVE')).toBe(true);
    expect(canTransitionLease('ACTIVE', 'NOTICE')).toBe(true);
    expect(canTransitionLease('NOTICE', 'ACTIVE')).toBe(true);
  });

  it('prevents reopening closed leases and invalid jumps', () => {
    expect(canTransitionLease('EXPIRED', 'ACTIVE')).toBe(false);
    expect(canTransitionLease('TERMINATED', 'NOTICE')).toBe(false);
    expect(canTransitionLease('DRAFT', 'EXPIRED')).toBe(false);
  });
});
