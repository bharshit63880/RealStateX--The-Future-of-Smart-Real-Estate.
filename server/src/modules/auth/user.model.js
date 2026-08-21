import mongoose from 'mongoose';
import { USER_ROLES } from '../../shared/constants/roles.js';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.BUYER, index: true },
  status: { type: String, enum: ['ACTIVE', 'LOCKED', 'SUSPENDED', 'DELETED'], default: 'ACTIVE', index: true },
  emailVerifiedAt: { type: Date, default: null },
  failedLoginAttempts: { type: Number, default: 0, select: false },
  lockedUntil: { type: Date, default: null, select: false },
  lastLoginAt: { type: Date, default: null },
}, { timestamps: true, optimisticConcurrency: true });

userSchema.set('toJSON', { transform: (_document, value) => { value.id = value._id.toString(); delete value._id; delete value.__v; delete value.passwordHash; delete value.failedLoginAttempts; delete value.lockedUntil; return value; } });
export const User = mongoose.model('User', userSchema);
