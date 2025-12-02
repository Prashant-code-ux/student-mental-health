// models/BreathingSession.js
const mongoose = require('mongoose');

const BreathingSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  date: { type: Date, default: Date.now },
  breaths: { type: Number, required: true },
  timeTaken: { type: Number, required: true } // time in seconds
});

module.exports = mongoose.model('BreathingSession', BreathingSessionSchema);
