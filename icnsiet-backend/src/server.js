/**
 * @file server.js
 * @description This file contains the main server setup for the application.
 * @module server
 */

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import your route files
import paperRoutes from './routes/paperRoutes.js';
import userRoutes from './routes/userRoutes.js'; // This line is now active

// --- Initial Configuration ---
dotenv.config(); // This loads the environment variables from your .env file
const app = express();
const PORT = process.env.PORT || 3000;

// Helper for ES Modules to get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Database Connection ---
const DB_URI = process.env.DATABASE_URI;
if (!DB_URI) {
    console.error("FATAL ERROR: DATABASE_URI is not defined in .env file.");
    process.exit(1); // Exit the application if the DB connection string is missing
}

mongoose.connect(DB_URI)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// --- Middlewares ---

/**
 * @name use
 * @description Enables CORS for all routes.
 * @function
 * @memberof module:server
 */
app.use(cors());

/**
 * @name use
 * @description Parses incoming JSON requests.
 * @function
 * @memberof module:server
 */
app.use(express.json());

/**
 * @name use
 * @description Parses incoming URL-encoded requests.
 * @function
 * @memberof module:server
 */
app.use(express.urlencoded({ extended: true }));

/**
 * @name use
 * @description Serves static files from the 'uploads' directory.
 * @function
 * @memberof module:server
 */
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// --- API Routes ---

/**
 * @name use
 * @description Mounts the paper routes on the '/api/papers' path.
 * @function
 * @memberof module:server
 */
app.use('/api/papers', paperRoutes);

/**
 * @name use
 * @description Mounts the user routes on the '/api/users' path.
 * @function
 * @memberof module:server
 */
app.use('/api/users', userRoutes); // <-- THIS IS THE CRITICAL FIX


// --- Handle Not Found Routes ---

/**
 * @name all
 * @description Handles requests for routes that are not found.
 * @function
 * @memberof module:server
 * @param {string} path - The path to match.
 * @param {function} callback - The callback function to execute.
 */
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});


// --- Global Error Handler ---

/**
 * @name use
 * @description Global error handler for the application.
 * @function
 * @memberof module:server
 * @param {function} callback - The callback function to execute.
 */
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});


// --- Start the Server ---

/**
 * @name listen
 * @description Starts the server on the specified port.
 * @function
 * @memberof module:server
 * @param {number} port - The port to listen on.
 * @param {function} callback - The callback function to execute.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
