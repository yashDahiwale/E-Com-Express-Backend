import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { userModel } from "../Models/userSchema.js";

dotenv.config({ path: "./config.env" });

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = async (data) => {
    const payload = { data }
    const token = jwt.sign(payload, JWT_SECRET);
    const userEmail = payload.data.email;

    // Store token in Database
    const result = await userModel.updateOne({ email: userEmail }, { $set: { token: token } })

    return token;
}

export { generateToken }