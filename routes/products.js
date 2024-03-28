import express from 'express'
import { addProduct, getByCategory } from '../controllers/product.js'

const router = express.Router()

router.post('/', addProduct)

router.get('/:category', getByCategory)

export default router