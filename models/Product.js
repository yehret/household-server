import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
   brandname: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true,
   },
   imageURL: {
      type: String
   },
   description: {
      name: String,
   },
   quantity: {
      type: Number,
      required: true,
   },
   price: {
      type: Number,
      required: true
   },
   category: {
      type: String,
      required: true
   }
}, {timestamps: true})

export default mongoose.model("Product", ProductSchema)

