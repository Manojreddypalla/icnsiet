/**
 * @file authController.js
 * @description This file contains the controller functions for authentication-related operations.
 * @module controllers/authController
 */

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/**
 * @function signToken
 * @description Signs a JWT token with the user's ID.
 * @param {string} id - The user's ID.
 * @returns {string} The JWT token.
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d', // Token will be valid for 90 days
  });
};

/**
 * @function register
 * @description Registers a new user (admin or reviewer).
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 * @returns {object} A JSON response confirming the user's creation.
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
 * @function login
 * @description Logs in an existing user.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 * @returns {object} A JSON response containing the user's token, role, and name.
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
 * @function getAllUsers
 * @description Retrieves all users.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 * @returns {object} A JSON response containing the list of users.
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
 * @function getReviewers
 * @description Retrieves all users with the 'reviewer' role.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 * @returns {object} A JSON response containing the list of reviewers.
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
