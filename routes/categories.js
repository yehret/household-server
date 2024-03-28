import express from 'express';
import { addCategory, deleteCategory, getCategories } from '../controllers/category.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router()

router.post('/', isAdmin, addCategory)

router.get('/', getCategories)

router.delete('/:id', isAdmin, deleteCategory)

export default router