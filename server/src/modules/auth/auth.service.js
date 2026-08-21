import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { config } from '../../config/index.js';
import { BadRequestError } from '../../shared/errors/bad-request-error.js';
import { UnauthorizedError } from '../../shared/errors/unauthorized-error.js';
import { User } from './user.model.js';
import { Session } from './session.model.js';
import { createAccessToken, createRefreshToken, hashToken, verifyRefreshToken } from './token.service.js';

const expiry = () => new Date(Date.now() + config.jwt.refreshExpiresInDays * 86400000);
const dummyPasswordHash = '$2b$12$qVkHFPYdYRsxNHE6ezBk1eVBhJmRcBvZqFQZ9t1vK1miGhpAAwdJm';
const issue = async (user, context, familyId = crypto.randomUUID()) => {
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user.id, familyId);
  await Session.create({ userId: user.id, tokenHash: hashToken(refreshToken), familyId, userAgent: context.userAgent, ipAddress: context.ipAddress, expiresAt: expiry() });
  return { user, accessToken, refreshToken };
};
export const register = async (input, context) => {
  if (await User.exists({ email: input.email.toLowerCase() })) throw new BadRequestError('An account with this email already exists');
  const user = await User.create({ ...input, email: input.email.toLowerCase(), passwordHash: await bcrypt.hash(input.password, 12) });
  return issue(user.toJSON(), context);
};
export const login = async (input, context) => {
  const user = await User.findOne({ email: input.email.toLowerCase() }).select('+passwordHash +failedLoginAttempts +lockedUntil');
  const validPassword = await bcrypt.compare(input.password, user?.passwordHash || dummyPasswordHash);
  if (!user || !validPassword) {
    if (user) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= config.auth.maxFailedLogins) user.lockedUntil = new Date(Date.now() + config.auth.lockMinutes * 60000);
      await user.save();
    }
    throw new UnauthorizedError('Invalid email or password');
  }
  if (user.status !== 'ACTIVE' || (user.lockedUntil && user.lockedUntil > new Date())) throw new UnauthorizedError('Account is unavailable');
  user.failedLoginAttempts = 0; user.lockedUntil = null; user.lastLoginAt = new Date(); await user.save();
  return issue(user.toJSON(), context);
};
export const rotate = async (refreshToken, context) => {
  let payload; try { payload = verifyRefreshToken(refreshToken); } catch { throw new UnauthorizedError('Invalid refresh token'); }
  const tokenHash = hashToken(refreshToken);
  const session = await Session.findOne({ tokenHash }).select('+tokenHash +replacedByTokenHash');
  if (!session || session.revokedAt) { if (payload.familyId) await Session.updateMany({ familyId: payload.familyId, revokedAt: null }, { revokedAt: new Date() }); throw new UnauthorizedError('Refresh token reuse detected'); }
  const user = await User.findById(payload.sub); if (!user || user.status !== 'ACTIVE') throw new UnauthorizedError();
  session.revokedAt = new Date(); await session.save();
  const result = await issue(user.toJSON(), context, session.familyId); session.replacedByTokenHash = hashToken(result.refreshToken); await session.save(); return result;
};
export const revoke = (refreshToken) => refreshToken ? Session.updateOne({ tokenHash: hashToken(refreshToken), revokedAt: null }, { revokedAt: new Date() }) : Promise.resolve();
