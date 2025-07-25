import express from 'express';
import multer from 'multer';
import { uploadExpenses } from '../controllers/expenseUploadController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/upload', authMiddleware, upload.single('file'), uploadExpenses);

export default router;
