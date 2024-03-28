import { createError } from "../middleware/createError.js";
import Category from "../models/Category.js";

export const addCategory = async (req, res, next) => {
   const newCategory = new Category({name: req.body.name})
   try {
      const savedCategory = await newCategory.save()
      res.status(200).json(savedCategory)
   } catch (error) {
      next(error)
   }
}

export const getCategories = async (req, res, next) => {
   try {
   const categories = await Category.find()

   res.status(200).json(categories)
   } catch (error) {
      next(error)
   }
}

export const deleteCategory = async (req, res, next) => {
   try {
      const category = await Category.find(req.params.id)
      if(!category) return next(createError(404, 'Категорію не знайдено'))
      
      await Category.findByIdAndDelete(req.params.id)
      res.status(200).json("Категорія успішно видалена")
   } catch (error) {
      next(error)
   }
}
