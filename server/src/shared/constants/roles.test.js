import { describe,expect,it } from 'vitest';
import { PERMISSIONS,ROLE_PERMISSIONS,USER_ROLES } from './roles.js';
describe('role permission boundaries',()=>{
  it('reserves role management for super admins',()=>{expect(ROLE_PERMISSIONS[USER_ROLES.SUPER_ADMIN]).toContain(PERMISSIONS.ROLE_MANAGE);expect(ROLE_PERMISSIONS[USER_ROLES.ADMIN]).not.toContain(PERMISSIONS.ROLE_MANAGE);});
  it('keeps buyer permissions least privileged',()=>{expect(ROLE_PERMISSIONS[USER_ROLES.BUYER]).toContain(PERMISSIONS.OFFER_CREATE);expect(ROLE_PERMISSIONS[USER_ROLES.BUYER]).not.toContain(PERMISSIONS.PROPERTY_VERIFY);expect(ROLE_PERMISSIONS[USER_ROLES.BUYER]).not.toContain(PERMISSIONS.USER_MANAGE);});
  it('scopes manager operations to rental permissions',()=>{expect(ROLE_PERMISSIONS[USER_ROLES.PROPERTY_MANAGER]).toContain(PERMISSIONS.RENTAL_MANAGE);expect(ROLE_PERMISSIONS[USER_ROLES.PROPERTY_MANAGER]).not.toContain(PERMISSIONS.PROPERTY_EDIT_ANY);});
});
