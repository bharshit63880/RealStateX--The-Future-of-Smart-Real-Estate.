import mongoose from 'mongoose';
const favouriteSchema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},propertyId:{type:mongoose.Schema.Types.ObjectId,ref:'Property',required:true},listName:{type:String,default:'Saved',maxlength:80}},{timestamps:true});
favouriteSchema.index({userId:1,propertyId:1},{unique:true});
export const Favourite=mongoose.model('Favourite',favouriteSchema);
