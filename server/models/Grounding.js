// models/Grounding.js
const mongoose = require("mongoose");

const groundingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sessionNumber: { type: Number, required: true },
  message: { type: String, required: true },
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Grounding", groundingSchema);
