import express from 'express';
import { addOrder, getOrders, getOrdersByPhoneNumber } from '../controllers/order.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router()

router.post('/', addOrder)

router.get('/', isAdmin, getOrders)

router.get('/:phoneNumber', getOrdersByPhoneNumber)

export default router