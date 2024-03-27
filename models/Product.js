import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
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
      ref: "Category",
      required: true
   }
}, {timestamps: true})

export default mongoose.model("Product", ProductSchema)

