import mongoose from 'mongoose';
const messageSchema=new mongoose.Schema({senderId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},body:{type:String,required:true,maxlength:4000},readBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],sentAt:{type:Date,default:Date.now}},{_id:true});
const schema=new mongoose.Schema({propertyId:{type:mongoose.Schema.Types.ObjectId,ref:'Property',index:true},participants:[{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}],messages:[messageSchema],lastMessageAt:{type:Date,default:Date.now,index:true},archivedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]},{timestamps:true});
schema.index({participants:1,lastMessageAt:-1});
export const Conversation=mongoose.model('Conversation',schema);
