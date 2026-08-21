import { UnauthorizedError } from '../errors/unauthorized-error.js';
import { verifyAccessToken } from '../../modules/auth/token.service.js';
export const authenticate = (request, _response, next) => { const token=request.get('authorization')?.replace(/^Bearer\s+/iu,''); if(!token) return next(new UnauthorizedError()); try { request.auth=verifyAccessToken(token); return next(); } catch { return next(new UnauthorizedError('Access token is invalid or expired')); } };
