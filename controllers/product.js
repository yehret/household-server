import Product from '../models/Product.js'
import { createError } from '../createError.js'

export const addProduct = async (req, res, next) => {
   const newProduct = new Product({...req.body})
   try {
      const savedProduct = await newProduct.save()
      res.status(200).json(savedProduct)
   } catch (error) {
      next(error)
   }
}