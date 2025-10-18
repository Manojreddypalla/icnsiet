/**
 * @file userRoutes.js
 * @description This file contains the routes for user-related operations.
 * @module routes/userRoutes
 */

import express from 'express';
import { 
    register, 
    login, 
    getAllUsers,
    getReviewers
} from '../controllers/authController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @name POST /login
 * @description Logs a user in. This is a public route.
 * @function
 * @memberof module:routes/userRoutes
 * @param {function} login - Controller function for logging a user in.
 */
router.post('/login', login);

// All routes below this point require the user to be a logged-in admin.
router.use(protect, restrictTo('admin'));

/**
 * @name GET /
 * @description Retrieves all users. Accessible only by Admins.
 * @function
 * @memberof module:routes/userRoutes
 * @param {function} getAllUsers - Controller function for retrieving all users.
 */
router.get('/', getAllUsers);

/**
 * @name GET /reviewers
 * @description Retrieves all users with the 'reviewer' role. Accessible only by Admins.
 * @function
 * @memberof module:routes/userRoutes
 * @param {function} getReviewers - Controller function for retrieving all reviewers.
 */
router.get('/reviewers', getReviewers);

/**
 * @name POST /register
 * @description Registers a new user (admin or reviewer). Accessible only by Admins.
 * @function
 * @memberof module:routes/userRoutes
 * @param {function} register - Controller function for registering a new user.
 */
router.post('/register', register);

export default router;
