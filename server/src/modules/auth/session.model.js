import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tokenHash: { type: String, required: true, unique: true, select: false },
  familyId: { type: String, required: true, index: true },
  userAgent: { type: String, default: null, maxlength: 500 },
  ipAddress: { type: String, default: null },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
  revokedAt: { type: Date, default: null, index: true },
  replacedByTokenHash: { type: String, default: null, select: false },
}, { timestamps: true });
sessionSchema.index({ userId: 1, revokedAt: 1 });
export const Session = mongoose.model('Session', sessionSchema);
