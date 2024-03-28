import express from 'express'
import { addProduct, getByCategory, updateProduct } from '../controllers/product.js'
import { isAdmin } from '../middleware/isAdmin.js'

const router = express.Router()

router.post('/', addProduct)

router.get('/:category', getByCategory)

router.put('/:id', isAdmin, updateProduct)

export default router