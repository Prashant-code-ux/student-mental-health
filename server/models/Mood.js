const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mood: { type: String, required: true },
  note: { type: String, default: "" },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Mood", moodSchema);
