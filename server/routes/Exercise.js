const express = require('express');
const router = express.Router();
const BreathingSession = require('../models/BreathingSession');

// Save a breathing session
router.post('/breathing', async (req, res) => {
  const { userId, breaths, timeTaken } = req.body;

  if (!userId || breaths == null || timeTaken == null) {
    return res.status(400).json({ message: 'Missing required data' });
  }

  try {
    const session = new BreathingSession({ userId, breaths, timeTaken });
    await session.save();
    res.json({ message: 'Breathing session saved successfully', session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all sessions of a user
router.get('/breathing/:userId', async (req, res) => {
  try {
    const sessions = await BreathingSession.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json({ sessions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
