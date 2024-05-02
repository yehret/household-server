import Order from "../models/Order.js"

export const addOrder = async (req, res, next) => {
   try {
      await new Order({ ...req.body }).save()

      res.status(200).json("Замовлення успішно відправлено")
   } catch (error) {
      next(error)
   }
}