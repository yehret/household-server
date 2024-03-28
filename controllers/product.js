import Product from '../models/Product.js'
import Category from '../models/Category.js'
import { createError } from '../middleware/createError.js'

export const addProduct = async (req, res, next) => {
   try {
      const category = await Category.findOne({ name: req.body.category })
      if(!category) {
         return next(createError(400, "Category not found"))
      }

      const newProduct = new Product({
         category: category.name,
         ...req.body
      })

      const savedProduct = await newProduct.save()

      res.status(200).json(savedProduct)
   } catch (error) {
      next(error)
   }
}