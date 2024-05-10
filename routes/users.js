import express from 'express'
import { addDropshipper, addFavourite, checkIsAdmin, getDropshippers, getUserById, getUsers, removeFavourite, requestDropshipping } from '../controllers/user.js'
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

router.get('/dropshippers/', isAdmin, getDropshippers)

router.put('/dropshippers/:userId', isAdmin, addDropshipper)

router.put('/dropshipper-request/:userId', verifyToken, requestDropshipping)


export default router

