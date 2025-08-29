import mongoose from 'mongoose';

// A sub-schema to define the structure of a single review
const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // A reference to the reviewer who wrote this review
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    remarks: {
        type: String,
        trim: true
    },
    submittedAt: {
        type: Date
    }
});

const paperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A paper must have a title.'],
    trim: true,
  },
  authorName: {
    type: String,
    required: [true, 'Please provide the author\'s name.'],
    trim: true,
  },
  authorEmail: {
    type: String,
    required: [true, 'Please provide the author\'s email.'],
    lowercase: true,
    trim: true,
  },
  affiliation: { type: String, required: true },
  abstract: { type: String, required: true },
  keywords: [String],
  filePath: { type: String, required: true },
  status: { // This is the overall status, decided by the admin
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  // This now uses the new reviewSchema to store detailed reviews
  reviews: [reviewSchema]
});

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;
