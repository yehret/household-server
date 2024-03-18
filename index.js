import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const connect = () => {
   mongoose.connect(process.env.MONGO).then(() => {
      console.log("MongoDB Connected");
   }).catch((err) => {
      throw err;
   })
}

app.listen(8800, () => {
   console.log("Server Connected")
   connect()
})