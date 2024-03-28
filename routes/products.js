import express from 'express'
import { addProduct, deleteProduct, getAllProducts, getByCategory, updateProduct } from '../controllers/product.js'
import { isAdmin } from '../middleware/isAdmin.js'

const router = express.Router()

router.post('/', addProduct)

router.get('/:category', getByCategory)

router.put('/:id', isAdmin, updateProduct)

router.delete('/:id', isAdmin, deleteProduct)

router.get('/', isAdmin, getAllProducts)

export default router