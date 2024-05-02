import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
   clientId: {
      type: String,
      required: true,
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
      required: true
   },
   clientLastname: {
      type: String,
      required: true
   },
   orderStack: [{
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }
   }],
   status: {
      type: String,
      enum: ['в обробці' , 'виконано', 'скасовано'],
      default: 'в обробці'
   }
}, {timestamps: true})

export default mongoose.model('Order', OrderSchema)


// Якщо людина зареєстрована відобразити історію замовлення

// Знижка на період часу