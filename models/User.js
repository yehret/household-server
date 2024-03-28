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

export default mongoose.model('User', UserSchema)