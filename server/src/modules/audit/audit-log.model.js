import mongoose from 'mongoose';
const auditSchema = new mongoose.Schema({
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  action: { type: String, required: true, index: true }, resourceType: { type: String, required: true },
  resourceId: { type: String, default: null }, requestId: { type: String, required: true, index: true },
  ipAddress: { type: String, default: null }, metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true, versionKey: false });
auditSchema.index({ createdAt: -1 });
export const AuditLog = mongoose.model('AuditLog', auditSchema);
