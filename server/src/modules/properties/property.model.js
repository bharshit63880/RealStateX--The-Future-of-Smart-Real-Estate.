import mongoose from 'mongoose';

export const PROPERTY_STATUSES = ['DRAFT','SUBMITTED','UNDER_REVIEW','CHANGES_REQUESTED','VERIFIED','PUBLISHED','RESERVED','SOLD','RENTED','SUSPENDED','REJECTED','ARCHIVED'];
const propertySchema = new mongoose.Schema({
  title:{type:String,required:true,trim:true,maxlength:160}, slug:{type:String,required:true,unique:true,index:true},
  description:{type:String,required:true,maxlength:5000}, listingType:{type:String,enum:['buy','rent'],required:true,index:true},
  propertyType:{type:String,required:true,index:true}, price:{type:Number,required:true,min:0,index:true}, currency:{type:String,default:'INR'},
  bedrooms:{type:Number,min:0,index:true}, bathrooms:{type:Number,min:0}, balconies:{type:Number,min:0,default:0}, carpetArea:{type:Number,min:0}, builtUpArea:{type:Number,min:0},
  city:{type:String,required:true,index:true}, locality:{type:String,required:true,index:true}, state:{type:String,required:true}, postalCode:{type:String},
  location:{type:{type:String,enum:['Point'],default:'Point'},coordinates:{type:[Number],validate:{validator:(value)=>value.length===2,message:'Coordinates require longitude and latitude'}}},
  amenities:[{type:String}], media:[{url:String,type:{type:String,enum:['image','video','floor-plan','360']},alt:String,isCover:Boolean}],
  ownerId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true}, status:{type:String,enum:PROPERTY_STATUSES,default:'DRAFT',index:true},
  verified:{type:Boolean,default:false,index:true}, statusHistory:[{status:{type:String,enum:PROPERTY_STATUSES},at:{type:Date,default:Date.now},actorId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},reason:String}],
  publishedAt:{type:Date,default:null}, deletedAt:{type:Date,default:null,index:true},
},{timestamps:true,optimisticConcurrency:true});
propertySchema.index({location:'2dsphere'}); propertySchema.index({city:1,listingType:1,propertyType:1,price:1,status:1}); propertySchema.index({ownerId:1,status:1,updatedAt:-1});
export const Property=mongoose.model('Property',propertySchema);
