// backend/routes/expenseSuggestionRoute.js
import express from 'express';
import { getCategoryTrends } from '../controllers/expenseSuggestionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/category-trends', protect, getCategoryTrends);

export default router;
