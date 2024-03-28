import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../middleware/createError.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
   const verifyEmail = await User.findOne({ email: req.body.email})
   try {
      if(verifyEmail) {
         return next(createError(403, "Користувач з даною електронною поштою вже існує"))
      } else {
         const salt = bcrypt.genSaltSync(10)
         const hash = bcrypt.hashSync(req.body.password, salt)
         const newUser = new User({...req.body, password: hash, role: 'user'})
   
         newUser.save()
         res.status(200).send("Користувач успішно створений")
      }
   }
   catch (error) {
      next(error)
   }
}

export const signin = async (req, res, next) => {
   try {
     const user = await User.findOne({ email: req.body.email });
     if (!user) return next(createError(404, "Користувача не знайдено!"));
 
     const isCorrect = await bcrypt.compare(req.body.password, user.password);
 
     if (!isCorrect) return next(createError(400, "Неправильно введені дані!"));
 
     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT, { expiresIn: "14d"});
     const { password, ...others } = user._doc;
 
     res
       .cookie("access_token", token, {
         httpOnly: true,
       })
       .status(200)
       .json(others);
   } catch (err) {
     next(err);
   }
 };

export const getUsers = async (req, res, next) => {
   try {
      const users = await User.find()
      res.status(200).json(users);
   } catch (error) {
      next(error)
   }
}