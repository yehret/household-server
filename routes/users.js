import express from 'express'
import { checkIsAdmin, getUserById, getUsers } from '../controllers/user.js'
import { isAdmin } from '../middleware/isAdmin.js'
import { logout } from '../controllers/auth.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/', isAdmin, getUsers)

// router.get('/:userId', isAdmin, getUserById)

router.get('/checkuser/:userId', checkIsAdmin)

router.get("/logout/", logout)

export default router