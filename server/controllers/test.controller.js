// // controllers/test.controller.js
// const TestResult = require("../models/TestResult");

// exports.saveTestResult = async (req, res) => {
//   try {
//     const { userId, testName, score, result } = req.body;

//     if (!userId || !testName || score == null) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const test = new TestResult({ userId, testName, score, result });
//     await test.save();

//     res.status(200).json({ message: "Test result saved successfully", test });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// exports.getUserTests = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const tests = await TestResult.find({ userId }).sort({ dateTaken: -1 });

//     if (!tests.length) {
//       return res.status(200).json({ message: "No Data Found", tests: [] });
//     }

//     res.status(200).json({ tests });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

const TestResult = require("../models/TestResult");

// 🧠 Save a user's test result
exports.saveTestResult = async (req, res) => {
  try {
    const { userId, testName, score, result } = req.body;

    if (!userId || !testName || score === undefined || !result) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newResult = new TestResult({
      userId,
      testName,
      score,
      result,
      date: new Date(),
    });

    await newResult.save();

    res.status(201).json({ message: "✅ Test result saved successfully", newResult });
  } catch (error) {
    console.error("❌ Error saving test result:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 🧾 Get all tests taken by a specific user
exports.getUserTests = async (req, res) => {
  try {
    const { userId } = req.params;
    const tests = await TestResult.find({ userId }).sort({ date: -1 });

    if (tests.length === 0) {
      return res.status(200).json({ message: "No Data Found", tests: [] });
    }

    res.status(200).json({ tests });
  } catch (error) {
    console.error("❌ Error fetching test results:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
