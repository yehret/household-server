import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'

const app = express()
dotenv.config()

const connect = () => {
   mongoose.connect(process.env.MONGO).then(() => {
      console.log("MongoDB Connected");
   }).catch((err) => {
      throw err;
   })
}



app.use((err, req, res, next) => {
   const status = err.status || 500;
   const message = err.message || "Something went wrong";

   return res.status(status).json({
      success: false,
      status,
      message
   })
})

app.use("/api/auth", authRoutes)

app.listen(8800, () => {
   console.log("Server Connected")
   connect()
})