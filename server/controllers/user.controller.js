const User = require('../models/user.model')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const bcrypt = require('bcrypt')

const registerUser = async (req,res) => {
    
    try {
        const {username, password, email } = await req.body;
    
        if(!username || !password || !email){
            return res.status(400).json(new ApiError(400, "All fields are required!"))
        }
    
        const existedUser = await User.findOne({ email });
        if(existedUser){
            return res.status(400).json(new ApiError(400, "User already existed!"))
        }
    
        const createdUser = await User.create({
            username,
            email,
            password
        })
    
        return res.status(201).json(new ApiResponse(201,createdUser, "All fields are required!"))
    } catch (error) {
        console.log("Register error: ", error);
        return res.status(400).json(new ApiError(400,"Error while regitering"))
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = await req.body;

        if (!email || !password) {
            return res.status(400).json(new ApiError(400, "All fields are required!"))
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json(new ApiError(400, "Invalid email or password!"))
        }

        const isPasswordValid = user.password === password
        // console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(401).json(new ApiError(401, "Invalid email or password!"))
        }

        const loggedInUser = {
            id: user._id,
            name: user.fullName,
            email: user.email,
        }

        res.status(201).json(new ApiResponse(201, loggedInUser, "User logged in successfully!"))

    } catch (error) {
        console.log("User login error : ", error);
        return res.status(400).json(new ApiError(400, "Login failed!"))
    }



    
}

// res.json({            //user_id
//   message: "Login successful",
//   user: {
//     _id: user._id,
//     username: user.username,
//     email: user.email
//   }
// });




module.exports =  { registerUser,loginUser }




