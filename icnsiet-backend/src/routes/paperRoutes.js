/**
 * @file paperRoutes.js
 * @description This file contains the routes for paper-related operations.
 * @module routes/paperRoutes
 */

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

/**
 * @name POST /
 * @description Submits a new paper. This is a public route.
 * @function
 * @memberof module:routes/paperRoutes
 * @param {function} upload - Middleware for handling file uploads.
 * @param {function} submitPaper - Controller function for submitting a paper.
 */
router.post('/', upload, submitPaper);

// All routes below this point require a user to be logged in
router.use(protect);

/**
 * @name GET /
 * @description Retrieves all papers. Accessible by both Admins and Reviewers.
 * @function
 * @memberof module:routes/paperRoutes
 * @param {function} getAllPapers - Controller function for retrieving all papers.
 */
router.get('/', getAllPapers);

/**
 * @name GET /:id
 * @description Retrieves a paper by its ID. Accessible by both Admins and Reviewers.
 * @function
 * @memberof module:routes/paperRoutes
 * @param {function} getPaperById - Controller function for retrieving a paper by its ID.
 */
router.get('/:id', getPaperById);

/**
 * @name POST /:id/review
 * @description Submits a review for a paper. Accessible only by Reviewers.
 * @function
 * @memberof module:routes/paperRoutes
 * @param {function} restrictTo - Middleware for restricting access to certain roles.
 * @param {function} submitReview - Controller function for submitting a review.
 */
router.post('/:id/review', restrictTo('reviewer'), submitReview);

/**
 * @name PATCH /:id/assign
 * @description Assigns a reviewer to a paper. Accessible only by Admins.
 * @function
 * @memberof module:routes/paperRoutes
 * @param {function} restrictTo - Middleware for restricting access to certain roles.
 * @param {function} assignReviewer - Controller function for assigning a reviewer.
 */
router.patch('/:id/assign', restrictTo('admin'), assignReviewer);

/**
 * @name PATCH /:id
 * @description Updates the status of a paper. Accessible only by Admins.
 * @function
 * @memberof module:routes/paperRoutes
 * @param {function} restrictTo - Middleware for restricting access to certain roles.
 * @param {function} updatePaperStatus - Controller function for updating the status of a paper.
 */
router.patch('/:id', restrictTo('admin'), updatePaperStatus);

export default router;
