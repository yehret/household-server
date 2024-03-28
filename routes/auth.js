import express from 'express'
import { getUsers, signin, signup } from '../controllers/auth.js'
import { isAdmin } from '../middleware/isAdmin.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/signup', signup)

router.post('/signin', signin)

router.post('/google', /* googleauth */)

router.get('/', isAdmin, getUsers)

export default router