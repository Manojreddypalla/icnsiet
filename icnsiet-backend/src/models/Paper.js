// src/models/Paper.js
const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  title: String,
  abstract: String,
  authorName: String,
  email: String,
  affiliation: String,
  pdf: String, // File path
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Paper", paperSchema);
