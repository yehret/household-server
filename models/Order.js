import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
   orderId: {
      type: String,
   },
   clientNumber: {
      type: String,
      required: true
   },
   clientName: {
      type: String,
      required: true
   },
   clientMiddlename: {
      type: String,
   },
   clientLastname: {
      type: String,
      required: true
   },
   orderStack: [{
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      productImgURL: { type: String},
      productBrandname: { type: String, required: true },
      quantityOrder: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }
   }],
   status: {
      type: String,
      enum: ['в обробці', 'готово до видачі' ,'виконано', 'скасовано'],
      default: 'в обробці'
   }
}, {timestamps: true})

export default mongoose.model('Order', OrderSchema)


// Якщо людина зареєстрована відобразити історію замовлення

// Знижка на період часу