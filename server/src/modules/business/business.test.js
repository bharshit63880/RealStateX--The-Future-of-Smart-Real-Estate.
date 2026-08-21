import { describe,expect,it } from 'vitest';import { leadUpdateSchema,leaseSchema,leaseUpdateSchema,projectSchema,ticketSchema } from './business.schemas.js';
const id='507f1f77bcf86cd799439011';
describe('business workflow validation',()=>{
  it('accepts project inventory with units',()=>expect(projectSchema.safeParse({body:{name:'Arbor One',city:'Gurugram',locality:'Sector 54',units:[{unitNumber:'A-101',type:'3 BHK',price:15000000}]}}).success).toBe(true));
  it('requires lease end after start',()=>expect(leaseSchema.safeParse({body:{propertyId:id,tenantId:id,startDate:'2027-01-01',endDate:'2026-01-01',monthlyRent:50000}}).success).toBe(false));
  it('validates lease status updates',()=>expect(leaseUpdateSchema.safeParse({params:{id},body:{status:'ACTIVE',note:'Signed by both parties'}}).success).toBe(true));
  it('accepts CRM stage and note updates',()=>expect(leadUpdateSchema.safeParse({params:{id},body:{stage:'QUALIFIED',score:80,note:'Financing approved'}}).success).toBe(true));
  it('rejects underspecified maintenance requests',()=>expect(ticketSchema.safeParse({body:{propertyId:id,title:'AC',description:'broken'}}).success).toBe(false));
});
