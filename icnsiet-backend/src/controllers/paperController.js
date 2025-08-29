import Paper from '../models/paperModel.js';
import User from '../models/userModel.js';
import multer from 'multer';
import path from 'path';
import sendEmail from '../utils/email.js';
import { Parser } from 'json2csv';

// --- (Multer configuration remains the same) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, `${uniqueSuffix}-${sanitizedOriginalName}`);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Invalid file type. Only PDFs are allowed.'), false);
};
export const upload = multer({ storage, fileFilter }).single('paperPdf');


// --- Controller Functions ---

export const getAllPapers = async (req, res) => {
    try {
        let query = {};
        // If the user is a reviewer, find papers where they are part of the 'reviews' array.
        if (req.user.role === 'reviewer') {
            query = { 'reviews.reviewer': req.user._id };
        }
        
        const papers = await Paper.find(query).populate('reviews.reviewer', 'name email');

        // --- THIS IS THE CRITICAL SECURITY FIX ---
        // If the user is a reviewer, we create a new anonymized list of papers.
        if (req.user.role === 'reviewer') {
            const anonymizedPapers = papers.map(paper => {
                const paperObj = paper.toObject(); // Convert Mongoose document to a plain object
                // Remove all identifying author information
                delete paperObj.authorName;
                delete paperObj.authorEmail;
                delete paperObj.affiliation;
                return paperObj;
            });
            return res.status(200).json({ status: 'success', data: { papers: anonymizedPapers } });
        }

        // For admins, send the full data
        res.status(200).json({ status: 'success', data: { papers } });

    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching papers.' });
    }
};

// ... (The rest of your controller functions: submitPaper, getPaperById, updatePaperStatus, assignReviewer, submitReview)
// They do not need to be changed for this feature.
export const submitPaper = async (req, res) => {
  try {
    const { title, authorName, authorEmail, affiliation, abstract, keywords } = req.body;
    if (!req.file) return res.status(400).json({ message: 'A PDF file for the paper is required.' });
    const urlFriendlyFilePath = req.file.path.replace(/\\/g, '/');
    const newPaper = await Paper.create({
      title, authorName, authorEmail, affiliation, abstract,
      keywords: keywords.split(',').map(keyword => keyword.trim()),
      filePath: urlFriendlyFilePath,
    });
    res.status(201).json({ status: 'success', data: { paper: newPaper } });
  } catch (error) {
    res.status(500).json({ message: 'Server error while submitting paper.', error: error.message });
  }
};

export const getPaperById = async (req, res) => {
    try {
        const paper = await Paper.findById(req.params.id).populate('reviews.reviewer', 'name email');
        if (!paper) {
            return res.status(404).json({ message: 'Paper not found.' });
        }
        res.status(200).json({ status: 'success', data: { paper } });
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching paper.' });
    }
};

export const updatePaperStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedPaper = await Paper.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!updatedPaper) return res.status(404).json({ message: 'No paper found with that ID.' });
    res.status(200).json({ status: 'success', data: { paper: updatedPaper } });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating status.' });
  }
};

export const assignReviewer = async (req, res) => {
    try {
        const { reviewerId } = req.body;
        const paper = await Paper.findById(req.params.id);
        const reviewer = await User.findById(reviewerId);
        if (!paper || !reviewer || reviewer.role !== 'reviewer') {
            return res.status(404).json({ message: 'Paper or valid reviewer not found.' });
        }
        if (paper.reviews.some(review => review.reviewer.equals(reviewerId))) {
            return res.status(409).json({ message: 'Reviewer already assigned.' });
        }
        paper.reviews.push({ reviewer: reviewerId, status: 'Pending' });
        await paper.save();
        const updatedPaper = await Paper.findById(req.params.id).populate('reviews.reviewer', 'name email');
        res.status(200).json({ status: 'success', data: { paper: updatedPaper } });
    } catch (error) {
        res.status(500).json({ message: 'Server error while assigning reviewer.' });
    }
};

export const submitReview = async (req, res) => {
    try {
        const { status, remarks } = req.body;
        const paper = await Paper.findById(req.params.id);
        if (!paper) {
            return res.status(404).json({ message: 'Paper not found.' });
        }
        const review = paper.reviews.find(r => r.reviewer.equals(req.user._id));
        if (!review) {
            return res.status(403).json({ message: 'You are not assigned to review this paper.' });
        }
        review.status = status;
        if (remarks) review.remarks = remarks;
        review.submittedAt = Date.now();
        await paper.save();
        res.status(200).json({ status: 'success', data: { review } });
    } catch (error) {
        res.status(500).json({ message: 'Server error while submitting review.' });
    }
};
