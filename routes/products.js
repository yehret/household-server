import express from 'express'
import { addProduct, deleteProduct, getAllProducts, getByCategory, getFavourites, getProduct, updateProduct } from '../controllers/product.js'
import { isAdmin } from '../middleware/isAdmin.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/', isAdmin, addProduct)

router.get('/category/:category', getByCategory)

router.put('/:id', isAdmin, updateProduct)

router.delete('/:id', isAdmin, deleteProduct)

router.get('/', isAdmin, getAllProducts)

router.get('/favourites/', verifyToken, getFavourites)

router.get('/:productId', getProduct)

export default router