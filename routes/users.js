import express from 'express'
import { addDropshipper, addFavourite, changeNotifiedStatus, checkIsAdmin, getDropshippers, getNotApproved, getUserById, getUsers, removeFavourite, requestDropshipping } from '../controllers/user.js'
import { isAdmin } from '../middleware/isAdmin.js'
import { logout } from '../controllers/auth.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { isDropshipper } from '../middleware/isDropshipper.js'

const router = express.Router()

router.get('/', isAdmin, getUsers)

router.get('/user-data/:userId', verifyToken, getUserById)

router.get('/checkuser/:userId', checkIsAdmin)

router.get("/logout", logout)

router.put("/addtofavourites/:productId", verifyToken, addFavourite)

router.put("/removefromfavourites/:productId", verifyToken, removeFavourite)

router.get('/dropshippers/', isAdmin, getDropshippers)

router.get('/dropshippers/not-approved', isAdmin, getNotApproved)

router.put('/dropshippers/:userId', isAdmin, addDropshipper)

router.put('/dropshipper-request/:userId', verifyToken, requestDropshipping)

router.put('/dropshipper-notified/:userId', changeNotifiedStatus)

export default router

