import mongoose from 'mongoose';
const inquirySchema=new mongoose.Schema({propertyId:{type:mongoose.Schema.Types.ObjectId,ref:'Property',required:true,index:true},buyerId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},ownerId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},message:{type:String,required:true,maxlength:1000},status:{type:String,enum:['NEW','CONTACTED','CLOSED'],default:'NEW',index:true}},{timestamps:true});
inquirySchema.index({buyerId:1,propertyId:1,createdAt:-1});
export const Inquiry=mongoose.model('Inquiry',inquirySchema);
