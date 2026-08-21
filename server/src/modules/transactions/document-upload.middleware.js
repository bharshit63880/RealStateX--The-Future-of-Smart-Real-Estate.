import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { config } from '../../config/index.js';

fs.mkdirSync(config.documentStoragePath,{recursive:true});
const allowed=new Set(['application/pdf','image/jpeg','image/png','image/webp']);
const storage=multer.diskStorage({destination:(_request,_file,callback)=>callback(null,config.documentStoragePath),filename:(_request,file,callback)=>{const extension=path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g,'').slice(0,10);callback(null,`${crypto.randomUUID()}${extension}`);}});
export const documentUpload=multer({storage,limits:{fileSize:25*1024*1024,files:1},fileFilter:(_request,file,callback)=>allowed.has(file.mimetype)?callback(null,true):callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE','file'))}).single('file');
