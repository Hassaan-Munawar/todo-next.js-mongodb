import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    }

}, { timestamps: true })

const User = models.users || mongoose.model("users", userSchema) 

export default User;