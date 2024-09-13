import mongoose, { model } from "mongoose";

const subscriberSchema = mongoose.Schema({
    email: String,
})

const subscriberModel = new model("subscribers", subscriberSchema);

export { subscriberModel };