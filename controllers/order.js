import { createError } from "../middleware/createError.js"
import Order from "../models/Order.js"

export const addOrder = async (req, res, next) => {
   try {
      await new Order({ ...req.body }).save()

      res.status(200).json("Замовлення успішно відправлено")
   } catch (error) {
      next(error)
   }
}

export const getOrders = async (req, res, next) => {
   try {
      const orders = await Order.find()
      res.status(200).json(orders)
   } catch (error) {
      next(error)
   }
}

export const getOrdersByPhoneNumber = async (req, res, next) => {
   try {
      const orders = await Order.find({ clientNumber: req.params.phoneNumber })
      if(!orders) return next(createError(401, 'Не знайдено'))

      res.status(200).json(orders)

   } catch (error) {
      next(error)
   }
}