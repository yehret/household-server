import express from 'express';
import { addOrder, cancelOrder, completeOrder, getOrders, getOrdersByPhoneNumber, readyOrder } from '../controllers/order.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router()

router.post('/', addOrder)

router.get('/', isAdmin, getOrders)

router.get('/:phoneNumber', getOrdersByPhoneNumber)

router.put('/complete/:orderId', isAdmin, completeOrder)

router.put('/ready/:orderId', isAdmin, readyOrder)

router.put('/cancel/:orderId', cancelOrder)

export default router