import { describe, expect, it } from 'vitest';
import { allowedBookingTransitions, canTransitionBooking } from './booking-state.js';

describe('booking state machine', () => {
  it('permits valid host lifecycle transitions', () => {
    expect(canTransitionBooking('REQUESTED', 'CONFIRMED')).toBe(true);
    expect(canTransitionBooking('CONFIRMED', 'COMPLETED')).toBe(true);
    expect(canTransitionBooking('RESCHEDULED', 'CONFIRMED')).toBe(true);
  });

  it('rejects reopening closed bookings and invalid jumps', () => {
    expect(canTransitionBooking('CANCELLED', 'CONFIRMED')).toBe(false);
    expect(canTransitionBooking('COMPLETED', 'RESCHEDULED')).toBe(false);
    expect(canTransitionBooking('REQUESTED', 'COMPLETED')).toBe(false);
  });

  it('limits requester actions to reschedule or cancellation', () => {
    expect(allowedBookingTransitions('CONFIRMED', false)).toEqual(['RESCHEDULED', 'CANCELLED']);
    expect(allowedBookingTransitions('CONFIRMED', true)).toContain('COMPLETED');
  });
});
