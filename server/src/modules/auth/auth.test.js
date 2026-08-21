import { describe, expect, it } from 'vitest';
import { ROLE_PERMISSIONS, PERMISSIONS, USER_ROLES } from '../../shared/constants/roles.js';
import { createAccessToken, verifyAccessToken, hashToken } from './token.service.js';
import { changePasswordSchema, registerSchema } from './auth.schemas.js';

describe('identity foundation', () => {
  it('issues and verifies scoped access tokens', () => { const token=createAccessToken({id:'507f1f77bcf86cd799439011',role:USER_ROLES.BUYER}); const payload=verifyAccessToken(token); expect(payload.sub).toBe('507f1f77bcf86cd799439011'); expect(payload.role).toBe(USER_ROLES.BUYER); expect(payload.type).toBe('access'); });
  it('hashes refresh tokens without storing plaintext', () => { expect(hashToken('secret-token')).toHaveLength(64); expect(hashToken('secret-token')).not.toContain('secret-token'); });
  it('keeps administrative permissions out of buyer role', () => { expect(ROLE_PERMISSIONS[USER_ROLES.BUYER]).toContain(PERMISSIONS.OFFER_CREATE); expect(ROLE_PERMISSIONS[USER_ROLES.BUYER]).not.toContain(PERMISSIONS.USER_MANAGE); });
  it('rejects weak registration passwords', () => { expect(registerSchema.safeParse({body:{name:'Harshit',email:'user@example.com',password:'weak',role:USER_ROLES.BUYER}}).success).toBe(false); });
  it('requires a strong and different replacement password',()=>{expect(changePasswordSchema.safeParse({body:{currentPassword:'OldStrong123',newPassword:'OldStrong123'}}).success).toBe(false);expect(changePasswordSchema.safeParse({body:{currentPassword:'OldStrong123',newPassword:'NewStrong456'}}).success).toBe(true);});
});
