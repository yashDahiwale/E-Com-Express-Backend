import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    timeStamp: String,
    token: String
})

userSchema.pre("save", async function () {
    try {
        this.timeStamp = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`

        // Encrypting User Password
        const saltRounds = 10;
        // const salt = await bcrypt.genSalt(saltRounds);  // For Generating the Salt
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = await hashedPassword;
    } catch (error) {
        console.log(error);
    }
})

const userModel = new model("users", userSchema);

export { userModel };