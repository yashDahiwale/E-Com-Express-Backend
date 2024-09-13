import express from "express"
import bcrypt from "bcrypt"
import { generateToken } from "../middleware/generateToken.js";

// Import Models
import { userModel } from "../Models/userSchema.js"
import { subscriberModel } from "../Models/subscriberSchema.js";
import { authUser } from "../middleware/auth.js";

const router = express()
router.post("/user/registerUser", async (req, res) => {
    try {
        const data = req.body;
        const isDuplicate = await userModel.findOne({ $or: [{ email: data.email }, { phone: data.phone }] });
        if (isDuplicate) {
            throw ("User with the same phone or email already exists.");
        } else {
            const instanceUserModel = new userModel(data);
            instanceUserModel.save();
            res.status(200).json({ message: "Registered Successfully!" });
        }
    } catch (error) {
        res.status(200).json({ message: error });
    }
});

router.post("/user/loginUser", async (req, res) => {
    try {
        const data = req.body;
        const isUserExist = await userModel.findOne({ email: data.email });
        if (!isUserExist) {
            throw ("User Doesn't Exist!");
        }
        const matchedPassword = await bcrypt.compare(data.password, isUserExist.password);
        if (!matchedPassword) {
            throw ("Wrong Email or Password");
        }
        console.log("Login Successfull");
        const token = await generateToken(isUserExist.name, isUserExist.email);
        res.status(200).json({ message: "Login Successfull", token });
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: `Login failed! ${error}`, error })
    }
})

router.get("user/dashboard", authUser, (req, res)=> {
    try {
        const userData = req.userData;
        console.log("Dashboard access allowed")
        res.status(200).json({message:`Welcome ${userData.name}.` , userData }) 
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error while validating user!" , err})
    }
})

router.post("/user/subscribe", async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;
        const isUserExist = await subscriberModel.findOne({ email: email });
        if (isUserExist) {
            throw ("You have already subscribed to daily updates!");
        }
        const instanceSubscriberModel = new subscriberModel(data);
        instanceSubscriberModel.save();
        // console.log("You have subscribed to daily updates");
        res.status(200).json({ message: "You have subscribed to daily updates" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error })
    }
})


export default router;