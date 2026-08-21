import { config } from '../../config/index.js';
import { HTTP_STATUS } from '../../shared/constants/http-status.js';
import { successResponse } from '../../shared/utils/response.js';
import { User } from './user.model.js';
import { AuditLog } from '../audit/audit-log.model.js';
import * as authService from './auth.service.js';

const cookieOptions = { httpOnly: true, secure: config.isProduction, sameSite: 'strict', signed: true, path: '/api', maxAge: config.jwt.refreshExpiresInDays * 86400000 };
const context = (request) => ({ userAgent: request.get('user-agent') || null, ipAddress: request.ip });
const respond = (request, response, result, status = HTTP_STATUS.OK) => { response.cookie('refreshToken', result.refreshToken, cookieOptions); return response.status(status).json(successResponse({ message: 'Authentication successful', data: { user: result.user, accessToken: result.accessToken }, requestId: request.id })); };
export const register = async (request,response) => respond(request,response,await authService.register(request.validated.body,context(request)),HTTP_STATUS.CREATED);
export const login = async (request,response) => respond(request,response,await authService.login(request.validated.body,context(request)));
export const refresh = async (request,response) => respond(request,response,await authService.rotate(request.signedCookies.refreshToken,context(request)));
export const logout = async (request,response) => { await authService.revoke(request.signedCookies.refreshToken); response.clearCookie('refreshToken',{...cookieOptions,maxAge:undefined}); return response.status(HTTP_STATUS.NO_CONTENT).send(); };
export const me = async (request,response) => response.status(HTTP_STATUS.OK).json(successResponse({ message:'Profile retrieved', data:await User.findById(request.auth.sub), requestId:request.id }));
const clearRefreshCookie=(response)=>response.clearCookie('refreshToken',{...cookieOptions,maxAge:undefined});
const auditSecurityEvent=(request,action)=>AuditLog.create({actorId:request.auth.sub,action,resourceType:'User',resourceId:request.auth.sub,requestId:request.id,ipAddress:request.ip,metadata:{userAgent:request.get('user-agent')||null}});
export const changePassword = async (request,response) => {await authService.changePassword(request.auth.sub,request.validated.body.currentPassword,request.validated.body.newPassword);await auditSecurityEvent(request,'PASSWORD_CHANGED');clearRefreshCookie(response);return response.status(HTTP_STATUS.OK).json(successResponse({message:'Password changed. Sign in again on every device.',requestId:request.id}));};
export const logoutAll = async (request,response) => {await authService.revokeAll(request.auth.sub);await auditSecurityEvent(request,'ALL_SESSIONS_REVOKED');clearRefreshCookie(response);return response.status(HTTP_STATUS.OK).json(successResponse({message:'All sessions revoked',requestId:request.id}));};
