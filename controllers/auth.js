import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../createError.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
   const verifyEmail = await User.findOne({ email: req.body.email})
   try {
      if(verifyEmail) {
         return next(createError(403, "Користувач з даною електронною поштою вже існує"))
      } else {
         const salt = bcrypt.genSaltSync(10)
         const hash = bcrypt.hashSync(req.body.password, salt)
         const newUser = new User({...req.body, password: hash})
   
         newUser.save()
         res.status(200).send("Користувач успішно створений")
      }
   }
   catch (error) {
      next(error)
   }
}