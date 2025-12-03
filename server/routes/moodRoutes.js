const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");

// Save a mood
router.post("/save", async (req, res) => {
  try {
    const { userId, mood, note, date } = req.body;
    if (!userId || !mood || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMood = new Mood({ userId, mood, note, date });
    await newMood.save();
    res.status(200).json({ message: "Mood saved successfully", mood: newMood });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all moods for a user
router.get("/:userId", async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json({ moods });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
