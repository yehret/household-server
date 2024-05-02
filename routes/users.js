import express from 'express'
import { addFavourite, checkIsAdmin, getUserById, getUsers, removeFavourite } from '../controllers/user.js'
import { isAdmin } from '../middleware/isAdmin.js'
import { logout } from '../controllers/auth.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/', isAdmin, getUsers)

// router.get('/:userId', isAdmin, getUserById)

router.get('/checkuser/:userId', checkIsAdmin)

router.get("/logout", logout)

router.put("/addtofavourites/:productId", verifyToken, addFavourite)

router.put("/removefromfavourites/:productId", verifyToken, removeFavourite)

export default router

