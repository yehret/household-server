import express from 'express'
import { signup } from '../controllers/auth.js'

const router = express.Router()

router.post('/signup', signup)

router.post('/signin', /* signinfunction */)

router.post('/google', /* googleauth */)

export default router