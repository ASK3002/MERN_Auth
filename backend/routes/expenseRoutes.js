import express from 'express';
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getMonthlySummary,
} from '../controllers/expenseController.js';
import { protect } from '../middlewares/authMiddleware.js';

import multer from 'multer';
import { uploadExpenses } from '../controllers/expenseUploadController.js';

const storage = multer.memoryStorage();       // ✅ use memory storage
const upload = multer({ storage });           // ✅ enables req.file.buffer


const router = express.Router();

router.post('/', protect, createExpense);
router.get('/', protect, getExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);
router.get('/summary', protect, getMonthlySummary);

router.post('/upload', protect, upload.single('file'), uploadExpenses);

export default router;
