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