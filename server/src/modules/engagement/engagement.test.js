import { describe,expect,it } from 'vitest';
import { bookingSchema,bookingStatusSchema,conversationSchema,messageSchema } from './engagement.schemas.js';
const id='507f1f77bcf86cd799439011';
describe('engagement validation',()=>{
  it('requires future visit dates',()=>{expect(bookingSchema.safeParse({body:{propertyId:id,scheduledFor:new Date(0)}}).success).toBe(false);});
  it('accepts rescheduling with a date',()=>{expect(bookingStatusSchema.safeParse({params:{id},body:{status:'RESCHEDULED',scheduledFor:new Date(Date.now()+3600000)}}).success).toBe(true);});
  it('rejects blank conversation messages',()=>{expect(conversationSchema.safeParse({body:{propertyId:id,body:'  '}}).success).toBe(false);expect(messageSchema.safeParse({body:{body:''}}).success).toBe(false);});
});
