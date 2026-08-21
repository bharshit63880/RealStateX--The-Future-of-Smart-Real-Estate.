import mongoose from 'mongoose';
const schema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},type:{type:String,required:true,index:true},title:{type:String,required:true},body:{type:String,required:true},resourceType:String,resourceId:mongoose.Schema.Types.ObjectId,readAt:{type:Date,default:null,index:true}},{timestamps:true});
schema.index({userId:1,readAt:1,createdAt:-1});
export const Notification=mongoose.model('Notification',schema);
