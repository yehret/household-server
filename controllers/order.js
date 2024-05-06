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
      res.status(200).json(orders.flat().sort((a, b) => b.createdAt - a.createdAt))
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

export const cancelOrder = async (req, res, next) => {
   const orderId = req.params.orderId
   try {
      await Order.findByIdAndUpdate(orderId, { status: 'скасовано'})
      
      res.status(200).json('Замовлення скасовано')
   } catch (error) {
      next(error)
   }
}

export const readyOrder = async (req, res, next) => {
   const orderId = req.params.orderId
   try {
      await Order.findByIdAndUpdate(orderId, { status: 'готово до видачі'})
      
      res.status(200).json('Замовлення готово до видачі')
   } catch (error) {
      next(error)
   }
}

export const completeOrder = async (req, res, next) => {
   const orderId = req.params.orderId
   try {
      await Order.findByIdAndUpdate(orderId, { status: 'виконано'})
      
      res.status(200).json('Замовлення виконано')
   } catch (error) {
      next(error)
   }
}