/**
 * @file paperModel.js
 * @description This file contains the Mongoose schema and model for papers.
 * @module models/paperModel
 */

import mongoose from 'mongoose';

/**
 * @constant {mongoose.Schema} reviewSchema
 * @description The schema for a single review.
 */
const reviewSchema = new mongoose.Schema({
    /**
     * @property {mongoose.Schema.ObjectId} reviewer - The ID of the user who wrote the review.
     */
    reviewer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // A reference to the reviewer who wrote this review
        required: true
    },
    /**
     * @property {string} status - The status of the review.
     */
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    /**
     * @property {string} remarks - The remarks of the reviewer.
     */
    remarks: {
        type: String,
        trim: true
    },
    /**
     * @property {Date} submittedAt - The date the review was submitted.
     */
    submittedAt: {
        type: Date
    }
});

/**
 * @constant {mongoose.Schema} paperSchema
 * @description The schema for a paper.
 */
const paperSchema = new mongoose.Schema({
  /**
   * @property {string} title - The title of the paper.
   */
  title: {
    type: String,
    required: [true, 'A paper must have a title.'],
    trim: true,
  },
  /**
   * @property {string} authorName - The name of the author.
   */
  authorName: {
    type: String,
    required: [true, 'Please provide the author\'s name.'],
    trim: true,
  },
  /**
   * @property {string} authorEmail - The email of the author.
   */
  authorEmail: {
    type: String,
    required: [true, 'Please provide the author\'s email.'],
    lowercase: true,
    trim: true,
  },
  /**
   * @property {string} affiliation - The affiliation of the author.
   */
  affiliation: { type: String, required: true },
  /**
   * @property {string} abstract - The abstract of the paper.
   */
  abstract: { type: String, required: true },
  /**
   * @property {string[]} keywords - The keywords of the paper.
   */
  keywords: [String],
  /**
   * @property {string} filePath - The path to the paper's PDF file.
   */
  filePath: { type: String, required: true },
  /**
   * @property {string} status - The overall status of the paper.
   */
  status: { // This is the overall status, decided by the admin
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  /**
   * @property {Date} submittedAt - The date the paper was submitted.
   */
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  /**
   * @property {reviewSchema[]} reviews - The reviews for the paper.
   */
  reviews: [reviewSchema]
});

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;
