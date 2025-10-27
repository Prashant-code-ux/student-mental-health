const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/MyDB`)
        console.log("MongoDB connected successfully!");
    }catch(error){
        console.log("MongoDb Connection Failed : ", error);
        process.exit(1);
    }
}

module.exports = connectDB;