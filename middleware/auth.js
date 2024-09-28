import jwt from "jsonwebtoken"
import { userModel } from "../Models/userSchema.js";

const authUser = async (req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        if (!userToken) {
            throw ("Token not found!");
        }
        const isUserValid = await jwt.verify(userToken, process.env.JWT_SECRET);
        if (!isUserValid) {
            throw ("Invalid token")
        }
        console.log(isUserValid);
        const userData = await userModel.findOne({ email: isUserValid.data, token: userToken })
        if (!userData) {
            throw("User not found");
        }
        req.userData = userData;
        next();
    } catch (error) {
        console.log("Error while authentication;",error)
        res.status(401).json({message:"Unauthorized! Not a valid request",error});
    }
}

export { authUser }