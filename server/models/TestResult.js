// models/TestResult.js
const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  testName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  result: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("TestResult", testResultSchema);
