import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../middleware/createError.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
   const verifyEmail = await User.findOne({ email: req.body.email})
   const verifyPhone = await User.findOne({ phoneNumber: req.body.phoneNumber})
   try {
      if(verifyEmail) {
         return next(createError(403, "Користувач з даною електронною поштою вже існує"))
      } else if(verifyPhone) {
         return next(createError(403, "Користувач з даним номером телефону вже існує"))
      } else {
         const salt = bcrypt.genSaltSync(10)
         const hash = bcrypt.hashSync(req.body.password, salt)
         const newUser = new User({...req.body, password: hash, role: 'user'})
   
         await newUser.save()
         const { password, role, ...others } = newUser._doc;
         const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT, { expiresIn: '14d'});
         
         res
         .cookie("access_token", token, {
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
         })
         .status(200)
         .json(others);
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
 
     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT, { expiresIn: '14d'});
     const { password, role, ...others } = user._doc;
 
     res
     .cookie("access_token", token, {
        secure: true,
        sameSite: 'none',
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
     })
     .status(200)
     .json(others);
   } catch (err) {
     next(err);
   }
 };

 export const logout = async (req, res, next) => {
   try {
      res.cookie("access_token", "", {
        expires: new Date(0),
        secure: true,
        sameSite: 'none',
      });
  
      res.status(200).json({ message: "Logged out successfully!" });
    } catch (err) {
      next(err);
    }
 }
