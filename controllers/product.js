import Product from '../models/Product.js'
import Category from '../models/Category.js'
import { createError } from '../middleware/createError.js'

export const addProduct = async (req, res, next) => {
   try {
      const category = await Category.findOne({ name: req.body.category.toLowerCase() })
      if(!category) {
         return next(createError(400, "Category not found"))
      }

      const newProduct = new Product({
         ...req.body,
         category: category.name,
      })

      const savedProduct = await newProduct.save()

      res.status(200).json(savedProduct)
   } catch (error) {
      next(error)
   }
}

export const updateProduct = async (req, res, next) => {
   try {
      const product = await Product.findById(req.params.id)
      if(!product) return next(createError(404, "Товар не знайдено"))

      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
         $set: req.body
      }, {new: true})

      res.status(200).json(updatedProduct)
   } catch (error) {
      next(error)
   }
}

export const deleteProduct = async (req, res, next) => {
   try {
      const product = await Product.findById(req.params.id)
      if(!product) return next(createError(404, "Товар не знайдено"))
      
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).send("Товар успішно видалено")
   } catch (error) {
      next(error)
   }
}

export const getByCategory = async (req, res, next) => {
   try {
      const products = await Product.find({ category: req.params.category })
      if(!products || products.length === 0) {
         next(createError(400, "Немає наявних товарів даної категорії"))
      } else {
         res.status(200).json(products)
      }
   } catch (error) {
      next(error)
   }
}

export const getAllProducts = async (req, res, next) => {
   try {
      const products = await Product.find()

      res.status(200).json(products)
   } catch (error) {
      next(error)
   }
}

