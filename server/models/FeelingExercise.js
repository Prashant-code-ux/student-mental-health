const mongoose = require('mongoose');

const feelingExerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  feeling: {
    type: String,
    required: true
  },
  message: {
    type: String, // full message like "Kumkum felt 'Happy'"
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FeelingExercise', feelingExerciseSchema);
