const mongoose = require('mongoose');

const pmrSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  lastCompletedAt: { type: Date, default: Date.now },
  sessionCount: { type: Number, default: 0 },
  totalTime: { type: Number, default: 0 } // in seconds
});

module.exports = mongoose.model('PMR', pmrSchema);
