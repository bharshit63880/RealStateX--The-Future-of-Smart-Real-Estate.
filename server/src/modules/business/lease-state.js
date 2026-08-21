const TRANSITIONS = Object.freeze({
  DRAFT: ['ACTIVE', 'TERMINATED'],
  ACTIVE: ['NOTICE', 'EXPIRED', 'TERMINATED'],
  NOTICE: ['ACTIVE', 'EXPIRED', 'TERMINATED'],
  EXPIRED: [],
  TERMINATED: [],
});

export const canTransitionLease = (currentStatus, nextStatus) =>
  Boolean(TRANSITIONS[currentStatus]?.includes(nextStatus));
