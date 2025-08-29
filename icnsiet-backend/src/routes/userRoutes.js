import express from 'express';
import { 
    register, 
    login, 
    getAllUsers,
    getReviewers
} from '../controllers/authController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Public Route ---
// Anyone can attempt to log in.
router.post('/login', login);

// --- Protected Admin-Only Routes ---
// All routes below this point require the user to be a logged-in admin.
router.use(protect, restrictTo('admin'));

// Get a list of all users
router.get('/', getAllUsers);

// Get a list of users with the 'reviewer' role
router.get('/reviewers', getReviewers);

// Register a new user (admin or reviewer)
router.post('/register', register);

export default router;
