const express = require('express');
const router = express.Router();
const FeelingExercise = require('../models/FeelingExercise');

// Save new feeling
router.post('/add', async (req, res) => {
  try {
    const { userId, feeling, message } = req.body;
    if (!userId || !feeling) {
      return res.status(400).json({ message: 'User ID and feeling are required' });
    }

    const newFeeling = new FeelingExercise({ userId, feeling, message });
    await newFeeling.save();

    res.status(201).json({ message: 'Feeling saved successfully', data: newFeeling });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get last feeling of a user
router.get('/last/:userId', async (req, res) => {
  try {
    const lastFeeling = await FeelingExercise.findOne({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json({ session: lastFeeling });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
