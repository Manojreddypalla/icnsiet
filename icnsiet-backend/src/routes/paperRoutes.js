import express from 'express';
import {
  submitPaper,
  getAllPapers,
  getPaperById,
  updatePaperStatus,
  assignReviewer,
  submitReview,
  upload,
} from '../controllers/paperController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for anyone to submit a paper
router.post('/', upload, submitPaper);

// All routes below this point require a user to be logged in
router.use(protect);

// Routes accessible by both Admins and Reviewers
router.get('/', getAllPapers);
router.get('/:id', getPaperById);

// Route accessible only by Reviewers
router.post('/:id/review', restrictTo('reviewer'), submitReview);

// Routes accessible only by Admins
router.patch('/:id/assign', restrictTo('admin'), assignReviewer);
router.patch('/:id', restrictTo('admin'), updatePaperStatus);

export default router;
