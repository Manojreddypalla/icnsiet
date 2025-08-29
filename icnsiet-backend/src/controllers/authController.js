import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// A helper function to sign a JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d', // Token will be valid for 90 days
  });
};

/**
 * @desc    Register a new user (admin or reviewer)
 * @route   POST /api/users/register
 * @access  Private/Admin
 */
export const register = async (req, res, next) => { // Added 'next' for error handling
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password.' });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role, // Role can be 'admin' or 'reviewer'
    });
    
    // We don't send a token back, we just confirm creation.
    res.status(201).json({
      status: 'success',
      data: {
        user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
      },
    });
  } catch (error) {
    // --- THIS IS THE FIX ---
    // Instead of sending a direct response, we pass the error to the global error handler.
    // This provides more consistent error logging and responses.
    if (error.code === 11000) {
        return res.status(409).json({ message: 'An account with this email already exists.' });
    }
    // Pass other errors to the next middleware (our global error handler)
    next(error);
  }
};

/**
 * @desc    Log in an existing user
 * @route   POST /api/users/login
 * @access  Public
 */
export const login = async (req, res, next) => { // Added 'next' for error handling
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
          role: user.role,
          name: user.name
      }
    });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};


/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res, next) => { // Added 'next' for error handling
    try {
        const users = await User.find({});

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (error) {
        next(error); // Pass errors to the global error handler
    }
};

/**
 * @desc    Get all users with the 'reviewer' role
 * @route   GET /api/users/reviewers
 * @access  Private/Admin
 */
export const getReviewers = async (req, res, next) => { // Added 'next' for error handling
    try {
        const reviewers = await User.find({ role: 'reviewer' });

        res.status(200).json({
            status: 'success',
            results: reviewers.length,
            data: {
                reviewers
            }
        });
    } catch (error) {
        next(error); // Pass errors to the global error handler
    }
};
