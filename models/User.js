import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   surname: {
      type: String,
      required: true,
      unique: true,
   },
   phoneNumber: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
   },

}, {timestamps: true})

export default mongoose.model('User', UserSchema)