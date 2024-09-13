import mongoose from "mongoose";
import dotenv from "dotenv"

// Dotenv
dotenv.config({ path: "./server/config.env" })
dotenv.config({ path: "./config.env" })
const mongoString = process.env.MONGOSTRING;

// Connection
const connect = async () => {
    try {
        await mongoose.connect(mongoString);
        console.log("Successfully Connected with Database.")
    } catch (error) {
        console.log("Failed to Connect with Database!", error);
    }

}
connect();