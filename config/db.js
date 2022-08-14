const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI; //no need to require dot env because that is already required in server.js

const connectDb = async () =>{
    mongoose.connect(MONGO_URI,()=>{
        console.log("connected to the database")
    })
}

module.exports = connectDb;
