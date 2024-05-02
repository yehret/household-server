import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import productsRoutes from './routes/products.js'
import categoriesRoutes from './routes/categories.js'
import usersRoutes from './routes/users.js'
import ordersRoutes from './routes/orders.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()

const connect = () => {
   mongoose.connect(process.env.MONGO).then(() => {
      console.log("MongoDB Connected");
   }).catch((err) => {
      throw err;
   })
}

app.use(cors({
   origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
   methods: 'GET, POST, PUT, DELETE, PATCH',
   credentials: true,
   maxAge: 3600,
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/categories", categoriesRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/orders", ordersRoutes)

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