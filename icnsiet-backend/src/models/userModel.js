/**
 * @file userModel.js
 * @description This file contains the Mongoose schema and model for users.
 * @module models/userModel
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * @constant {mongoose.Schema} userSchema
 * @description The schema for a user.
 */
const userSchema = new mongoose.Schema({
    /**
     * @property {string} name - The name of the user.
     */
    name: {
        type: String,
        required: [true, 'Please provide your name.'],
        trim: true,
    },
    /**
     * @property {string} email - The email of the user.
     */
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address.'],
    },
    /**
     * @property {string} password - The password of the user.
     */
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        minlength: 8,
        select: false,
    },
    /**
     * @property {string} role - The role of the user.
     */
    role: {
        type: String,
        // We now officially support 'admin' and 'reviewer' roles
        enum: ['admin', 'reviewer'],
        default: 'reviewer', // New accounts default to the less powerful role
    },
});

/**
 * @function pre
 * @description Mongoose middleware to hash the user's password before saving.
 * @param {string} event - The event to listen for.
 * @param {function} callback - The callback function to execute.
 */
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

/**
 * @function correctPassword
 * @description Mongoose instance method to compare a candidate password with the user's password.
 * @param {string} candidatePassword - The candidate password.
 * @param {string} userPassword - The user's password.
 * @returns {boolean} Whether the passwords match.
 */
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


const User = mongoose.model('User', userSchema);

export default User;
