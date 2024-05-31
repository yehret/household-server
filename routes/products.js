import express from 'express'
import { addProduct, deleteProduct, getAllProducts, getByCategory, getFavourites, getProduct, searchProducts, updateProduct } from '../controllers/product.js'
import { isAdmin } from '../middleware/isAdmin.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/', isAdmin, addProduct)

router.get('/', getAllProducts)

router.get('/favourites/', verifyToken, getFavourites)

router.get('/search/', searchProducts)

router.get('/category/:category', getByCategory)

router.put('/:id', isAdmin, updateProduct)

router.get('/:productId', getProduct)

router.delete('/:id', isAdmin, deleteProduct)



export default router