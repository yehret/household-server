import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import productsRoutes from './routes/products.js'
import categoriesRoutes from './routes/categories.js'

const app = express()
dotenv.config()

const connect = () => {
   mongoose.connect(process.env.MONGO).then(() => {
      console.log("MongoDB Connected");
   }).catch((err) => {
      throw err;
   })
}

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/categories", categoriesRoutes)

app.use((err, req, res, next) => {
   const status = err.status || 500;
   const message = err.message || "Something went wrong";

   return res.status(status).json({
      success: false,
      status,
      message
   })
})

app.listen(8800, () => {
   console.log("Server Connected")
   connect()
})