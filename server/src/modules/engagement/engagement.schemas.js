import { z } from 'zod';
const id=z.string().regex(/^[a-f\d]{24}$/i,'Invalid identifier');
export const bookingSchema=z.object({body:z.object({propertyId:id,scheduledFor:z.coerce.date().refine(value=>value>Date.now(),'Visit must be in the future'),mode:z.enum(['IN_PERSON','VIDEO']).default('IN_PERSON'),note:z.string().max(1000).optional()})});
export const bookingStatusSchema=z.object({body:z.object({status:z.enum(['CONFIRMED','RESCHEDULED','COMPLETED','CANCELLED','NO_SHOW']),scheduledFor:z.coerce.date().optional(),reason:z.string().max(500).optional()})});
export const conversationSchema=z.object({body:z.object({propertyId:id,body:z.string().trim().min(1).max(4000)})});
export const messageSchema=z.object({body:z.object({body:z.string().trim().min(1).max(4000)})});
