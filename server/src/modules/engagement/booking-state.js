const TRANSITIONS = Object.freeze({
  REQUESTED: ['CONFIRMED', 'RESCHEDULED', 'CANCELLED'],
  CONFIRMED: ['RESCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'],
  RESCHEDULED: ['CONFIRMED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'],
  COMPLETED: [],
  CANCELLED: [],
  NO_SHOW: [],
});

export function canTransitionBooking(currentStatus, nextStatus) {
  return Boolean(TRANSITIONS[currentStatus]?.includes(nextStatus));
}

export function allowedBookingTransitions(currentStatus, isHost) {
  const allowed = TRANSITIONS[currentStatus] || [];
  return allowed.filter((status) => isHost || ['RESCHEDULED', 'CANCELLED'].includes(status));
}
