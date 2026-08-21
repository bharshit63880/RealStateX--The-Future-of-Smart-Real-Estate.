import mongoose from 'mongoose';
const unitSchema=new mongoose.Schema({unitNumber:{type:String,required:true},tower:String,floor:Number,type:{type:String,required:true},bedrooms:Number,area:Number,price:Number,status:{type:String,enum:['AVAILABLE','HOLD','RESERVED','SOLD'],default:'AVAILABLE'}},{timestamps:true});
const schema=new mongoose.Schema({builderId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},name:{type:String,required:true,maxlength:180},city:{type:String,required:true,index:true},locality:{type:String,required:true},description:{type:String,maxlength:5000},status:{type:String,enum:['PLANNING','PRE_LAUNCH','UNDER_CONSTRUCTION','READY','COMPLETED','ARCHIVED'],default:'PLANNING',index:true},possessionDate:Date,units:[unitSchema]},{timestamps:true,optimisticConcurrency:true});
schema.index({builderId:1,status:1,updatedAt:-1});
export const Project=mongoose.model('Project',schema);
