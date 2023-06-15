const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phnumber: {
        type: Number,
        required: true
    },
    apiKey: {
        type: String
    }
}, { timestamps: true })

const userModel = mongoose.model("user", userSchema)

module.exports = userModel