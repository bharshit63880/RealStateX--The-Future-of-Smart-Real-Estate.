import { z } from 'zod';
import { PROPERTY_STATUSES } from '../properties/property.model.js';
import { USER_ROLES } from '../../shared/constants/roles.js';
const id=z.string().regex(/^[a-f\d]{24}$/i,'Invalid identifier');
export const listingReviewSchema=z.object({params:z.object({id}),body:z.object({status:z.enum(['UNDER_REVIEW','CHANGES_REQUESTED','VERIFIED','PUBLISHED','REJECTED','SUSPENDED','ARCHIVED']),reason:z.string().trim().min(3).max(1000)})});
export const submitListingSchema=z.object({params:z.object({id}),body:z.object({}).optional()});
export const userGovernanceSchema=z.object({params:z.object({id}),body:z.object({status:z.enum(['ACTIVE','LOCKED','SUSPENDED','DELETED']).optional(),role:z.enum(Object.values(USER_ROLES)).optional()}).refine(value=>Object.keys(value).length>0,'A change is required')});
export const auditQuerySchema=z.object({query:z.object({action:z.string().max(100).optional(),resourceType:z.string().max(100).optional(),page:z.coerce.number().int().positive().default(1),limit:z.coerce.number().int().min(1).max(100).default(50)})});
export { PROPERTY_STATUSES };
