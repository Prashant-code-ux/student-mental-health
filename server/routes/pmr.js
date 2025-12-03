const express = require('express');
const router = express.Router();
const PMR = require('../models/PMR');

// Save or update PMR session
router.post('/save', async (req, res) => {
  try {
    const { userId, timeSpent } = req.body;

    if (!userId) return res.status(400).json({ error: "User ID is required" });

    let pmr = await PMR.findOne({ userId });

    if (pmr) {
      pmr.lastCompletedAt = new Date();
      pmr.sessionCount += 1;
      pmr.totalTime += timeSpent || 0;
      await pmr.save();
    } else {
      pmr = new PMR({
        userId,
        lastCompletedAt: new Date(),
        sessionCount: 1,
        totalTime: timeSpent || 0
      });
      await pmr.save();
    }

    res.json({ message: "PMR session saved successfully", pmr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get last PMR session
router.get('/last/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const pmr = await PMR.findOne({ userId });
    if (!pmr) return res.json({ session: null });
    res.json({ session: pmr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
