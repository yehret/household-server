import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
   clientNumber: {
      type: String,
      required: true
   },
   productName: {
      type: String,
      required: true
   },
   productQuantity: {
      type: Number,
      required: true,
   },
   status: {
      type: String,
      default: 'В обробці'
   }
}, {timestamps: true})

export default mongoose.model('Order', OrderSchema)