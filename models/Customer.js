const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        idNumber: {
            type: String,
            required: true,
            unique: true,
        },
        dateOfBirth: {
            type: String,
        },
        password: {
            type: String,   
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        coverPicture: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            max: 50,
        },
        amount: {
            type: Number,
        },
        medicines: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
