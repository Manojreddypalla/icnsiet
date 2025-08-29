import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/userModel.js';

// This middleware checks if a user is logged in by verifying their JWT.
export const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
    }

    // 2) Verification of the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'The user belonging to this token no longer exists.' });
    }

    // 4) GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token. Please log in again.' });
  }
};


// --- NEW FUNCTION ---
// This middleware checks if the logged-in user has one of the required roles.
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // 'roles' is an array like ['admin'] or ['admin', 'reviewer']
    // We check if the logged-in user's role is included in this array.
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'You do not have permission to perform this action.' 
      });
    }
    next(); // If they have the correct role, they can proceed.
  };
};
