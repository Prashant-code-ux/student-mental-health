// const User = require('../models/user.model');
// const ApiError = require('../utils/ApiError');
// const ApiResponse = require('../utils/ApiResponse');
// const bcrypt = require('bcrypt');

// // 🟢 REGISTER USER
// const registerUser = async (req, res) => {
//   try {
//     const { username, password, email } = req.body;

//     if (!username || !password || !email) {
//       return res.status(400).json(new ApiError(400, "All fields are required!"));
//     }

//     const existedUser = await User.findOne({ email });
//     if (existedUser) {
//       return res.status(400).json(new ApiError(400, "User already exists!"));
//     }

//     // hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const createdUser = await User.create({
//       username,
//       email,
//       password: hashedPassword
//     });

//     return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully!"));
//   } catch (error) {
//     console.log("Register error:", error);
//     return res.status(400).json(new ApiError(400, "Error while registering"));
//   }
// };

// // 🟢 LOGIN USER
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json(new ApiError(400, "All fields are required!"));
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json(new ApiError(400, "Invalid email or password!"));
//     }

//     // ✅ Compare hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json(new ApiError(401, "Invalid email or password!"));
//     }

//     // ✅ Send clean response to frontend
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     console.log("User login error:", error);
//     return res.status(400).json(new ApiError(400, "Login failed!"));
//   }
// };

// module.exports = { registerUser, loginUser };



const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const bcrypt = require('bcrypt');

// ✅ REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json(new ApiError(400, "All fields are required!"));
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json(new ApiError(400, "User already exists!"));
    }

    // (optional) hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      email,
      password // or hashedPassword
    });

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully!"));
  } catch (error) {
    console.log("Register error:", error);
    return res.status(400).json(new ApiError(400, "Error while registering"));
  }
};


// ✅ LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isPasswordValid = user.password === password; // (or await bcrypt.compare(password, user.password))

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // ✅ Respond after successful login
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error("User login error:", error);
    return res.status(500).json({ message: "Login failed!" });
  }
};


// ✅ EXPORT BOTH FUNCTIONS
module.exports = { registerUser, loginUser };
