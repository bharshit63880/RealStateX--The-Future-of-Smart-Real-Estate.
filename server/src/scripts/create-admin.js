import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { User } from '../modules/auth/user.model.js';
import { logger } from '../shared/logger/index.js';

const required=(name)=>{const value=process.env[name];if(!value)throw new Error(`${name} is required`);return value;};
const email=required('ADMIN_EMAIL').trim().toLowerCase();
const password=required('ADMIN_PASSWORD');
const name=process.env.ADMIN_NAME?.trim()||'RealStateX Administrator';
if(password.length<14||!/[a-z]/.test(password)||!/[A-Z]/.test(password)||!/[0-9]/.test(password))throw new Error('ADMIN_PASSWORD must be 14+ characters with upper, lower and numeric characters');
try{
  await connectDatabase();
  const existing=await User.findOne({email});
  if(existing){existing.name=name;existing.role='SUPER_ADMIN';existing.status='ACTIVE';existing.passwordHash=await bcrypt.hash(password,12);await existing.save();logger.info({email},'Super admin updated');}
  else{await User.create({email,name,role:'SUPER_ADMIN',status:'ACTIVE',passwordHash:await bcrypt.hash(password,12),emailVerifiedAt:new Date()});logger.info({email},'Super admin created');}
}finally{if(mongoose.connection.readyState)await disconnectDatabase();}
