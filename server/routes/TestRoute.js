// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/user.controller");
// const testController = require("../controllers/test.controller");

// // existing routes
// router.post("/register", userController.registerUser);
// router.post("/login", userController.loginUser);

// // 🧠 new routes
// router.post("/save-test", testController.saveTestResult);
// router.get("/get-tests/:userId", testController.getUserTests);

// module.exports = router;

const express = require("express");
const router = express.Router();
const testController = require("../controllers/test.controller");

// Save test result
router.post("/save-test", testController.saveTestResult);

// Get all tests for a user
router.get("/get-tests/:userId", testController.getUserTests);

module.exports = router;

