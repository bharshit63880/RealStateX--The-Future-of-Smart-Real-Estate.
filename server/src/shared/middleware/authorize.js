import { ForbiddenError } from '../errors/forbidden-error.js';
import { ROLE_PERMISSIONS } from '../constants/roles.js';
export const authorize = (...required) => (request,_response,next) => { const permissions=ROLE_PERMISSIONS[request.auth?.role]||[]; return required.every((permission)=>permissions.includes(permission)) ? next() : next(new ForbiddenError('You do not have permission to perform this action')); };
