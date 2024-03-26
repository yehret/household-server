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
      requred: true,
   },
   price: {
      type: Number,
      required: true
   },
   categrory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      requied: true
   }
}, {timestamps: true})

export default mongoose.model("Product", ProductSchema)

