import { createError } from "../middleware/createError.js";
import User from "../models/User.js";

export const getUsers = async (req, res, next) => {
   try {
      const users = await User.find()
      res.status(200).json(users);
   } catch (error) {
      next(error)
   }
}

export const getUserById = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.userId)
      if(!user) {
         return next(createError(401, "User not found"))
      }

      res.status(200).json(user)

   } catch (error) {
      next(error)
   }
}

export const checkIsAdmin = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.userId)
      if(!user) {
         return next(createError(401, "User not found"))
      }

      if(user.role !== "admin") {
         return res.status(200).json({ status: false })
      } else {
         return res.status(200).json({ status: true })
      }

   } catch (error) {
      next(error)
   }
}