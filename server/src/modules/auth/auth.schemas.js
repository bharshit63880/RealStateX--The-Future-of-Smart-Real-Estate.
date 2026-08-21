import { z } from 'zod';
import { USER_ROLES } from '../../shared/constants/roles.js';
const password = z.string().min(10).max(128).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/);
export const registerSchema = z.object({ body: z.object({ name: z.string().trim().min(2).max(100), email: z.string().email().max(254), password, role: z.enum([USER_ROLES.BUYER, USER_ROLES.SELLER, USER_ROLES.AGENT, USER_ROLES.BUILDER, USER_ROLES.PROPERTY_MANAGER]).default(USER_ROLES.BUYER) }) });
export const loginSchema = z.object({ body: z.object({ email: z.string().email(), password: z.string().min(1).max(128) }) });
export const changePasswordSchema = z.object({ body: z.object({ currentPassword: z.string().min(1).max(128), newPassword: password }).refine(value=>value.currentPassword!==value.newPassword,{message:'New password must be different',path:['newPassword']}) });
