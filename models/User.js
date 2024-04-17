import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   surname: {
      type: String,
      required: true,
   },
   middlename: {
     type: String,
     required: true,
   },
   phoneNumber: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
   },
   role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
   }
}, {timestamps: true})

UserSchema.index({ name: 0, surname: 0, middlename: 0 });

export default mongoose.model('User', UserSchema)