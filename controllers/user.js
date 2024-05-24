import { createError } from "../middleware/createError.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'


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
      const user = await User.findById(req.params.userId).select('-password')
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

export const addFavourite = async (req, res, next) => {
   try {
      await User.findByIdAndUpdate(req.user.id, {
         $push: { favourites: req.params.productId },
      })

      res.status(200).json("Успішно додано в обрані")
   } catch (error) {
      next(error)
   }
}

export const removeFavourite = async (req, res, next) => {
   try {
      await User.findByIdAndUpdate(req.user.id, {
         $pull: {favourites: req.params.productId },
      })

      res.status(200).json("Успішно видалено з обраних")
   } catch (error) {
      next(error)
   }
}

export const addDropshipper = async (req, res, next) => {
   try {
      const userId = req.params.userId
      const user = await User.findOneAndUpdate({ _id: userId }, { role: 'dropshipper', dropshipperInfo: { status: true }}).select('-password')

      if(!user) next(createError(404, 'Користувача не знайдено'))

      res.status(200).json(user)
   } catch (error) {
      next(error)
   }
}

export const requestDropshipping = async (req, res, next) => {
   try {
      const userId = req.params.userId
      const { name, lastname, middlename, phone, email, country, mailIndex, region, district, city, address, drfo, mfo, iban, bankName } = req.body
      const user = await User.findOneAndUpdate({ _id: userId}, {
         name,
         middlename,
         surname: lastname,
         phoneNumber: phone,
         dropshipperInfo: {
            status: false,
            codeDRFO: drfo,
            iban,
            bankName,
            mfo,
            country,
            mailIndex,
            region,
            district,
            city,
            address
         },
         email,
         role: 'wannabedropshipper'
      })

      if(!user) return next(createError(404, 'Користувача не знайдено'))
         
      res.status(200).json("Заявку успішно відправлено")
   } catch (error) {
      next(error)
   }
}

export const getDropshippers = async (req, res, next) => {
   try {
      const users = await User.find({ role: { $in: ['wannabedropshipper', 'dropshipper'] } }).select('-password').sort({role: -1})

      if(!users) return next(createError(404, "Користувачів не знайдено"))

      res.status(200).json(users)
   } catch (error) {
      next(error)
   }
}

export const getNotApproved = async (req, res, next) => {
   try {
      const users = await User.find({ role: { $in: ['wannabedropshipper'] } }).select('-password').sort({role: -1})

      if(!users) return next(createError(404, "Користувачів не знайдено"))

      res.status(200).json(users)
   } catch (error) {
      next(error)
   }
}

export const changeNotifiedStatus = async (req, res, next) => {
   try {
      const userId = req.params.userId
      const user = await User.findByIdAndUpdate(userId, {notified: true})

      if(!user) next(createError('Користувача не знайдено'))

      res.status(200).json('notified successfully')
   } catch (error) {
      next(error)
   }
}