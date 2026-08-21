import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { config } from '../../config/index.js';
export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
export const createAccessToken = (user) => jwt.sign({ sub: user.id, role: user.role, type: 'access' }, config.jwt.accessSecret, { expiresIn: config.jwt.accessExpiresIn, issuer: 'realstatex', audience: 'realstatex-web' });
export const createRefreshToken = (userId, familyId) => jwt.sign({ sub: userId, familyId, type: 'refresh', nonce: crypto.randomUUID() }, config.jwt.refreshSecret, { expiresIn: `${config.jwt.refreshExpiresInDays}d`, issuer: 'realstatex', audience: 'realstatex-web' });
export const verifyAccessToken = (token) => jwt.verify(token, config.jwt.accessSecret, { issuer: 'realstatex', audience: 'realstatex-web' });
export const verifyRefreshToken = (token) => jwt.verify(token, config.jwt.refreshSecret, { issuer: 'realstatex', audience: 'realstatex-web' });
