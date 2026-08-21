import { describe,expect,it } from 'vitest';
import { documentReviewSchema,documentSchema,documentUploadSchema,offerActionSchema,offerSchema } from './transaction.schemas.js';
const id='507f1f77bcf86cd799439011';
describe('transaction validation',()=>{
  it('accepts a complete future offer',()=>{expect(offerSchema.safeParse({body:{propertyId:id,amount:12500000,expiresAt:new Date(Date.now()+86400000)}}).success).toBe(true);});
  it('rejects expired and negative offers',()=>{expect(offerSchema.safeParse({body:{propertyId:id,amount:-1,expiresAt:new Date(0)}}).success).toBe(false);});
  it('requires amount and expiry for counter offers',()=>{expect(offerActionSchema.safeParse({params:{id},body:{action:'COUNTER'}}).success).toBe(false);});
  it('limits registered documents to 25 MB',()=>{expect(documentSchema.safeParse({body:{propertyId:id,name:'Title deed',category:'OWNERSHIP',storageKey:'private/example.pdf',mimeType:'application/pdf',size:30000000,checksum:'a'.repeat(64)}}).success).toBe(false);});
  it('accepts document verification decisions',()=>{expect(documentReviewSchema.safeParse({params:{id},body:{status:'VERIFIED',note:'Registry confirmed'}}).success).toBe(true);});
  it('validates multipart document metadata',()=>{expect(documentUploadSchema.safeParse({body:{propertyId:id,category:'OWNERSHIP',visibility:'PRIVATE'}}).success).toBe(true);});
});
