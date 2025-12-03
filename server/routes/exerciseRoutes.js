// routes/exerciseRoutes.js
const express = require("express");
const router = express.Router();
const Grounding = require("../models/Grounding");

// Save a grounding session (create new session with incremented sessionNumber)
router.post("/grounding/save", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });

    // count previous sessions to compute next sessionNumber
    const previousCount = await Grounding.countDocuments({ userId });
    const sessionNumber = previousCount + 1;
    const message = `Session ${sessionNumber} completed successfully`;

    const session = await Grounding.create({
      userId,
      sessionNumber,
      message,
      completedAt: new Date()
    });

    res.json({ success: true, session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save grounding session" });
  }
});

// Get the last grounding session for a user
router.get("/grounding/last/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const session = await Grounding.findOne({ userId }).sort({ completedAt: -1 });
    res.json({ success: true, session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch last grounding session" });
  }
});

module.exports = router;
