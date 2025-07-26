// backend/routes/aiRoutes.js
import express from 'express';
import { getTrendSuggestions } from '../controllers/aiController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/trends', protect, getTrendSuggestions);

export default router;
