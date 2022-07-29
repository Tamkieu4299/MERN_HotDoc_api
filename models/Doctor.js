const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
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
        dateOfBirth: {
            type: String,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        idNumber: {
            type: String,
            required: true,
            unique: true,
        },
        workingDesc: {
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
        rating: {
            type: Number,
        },
        numberOfBookings: {
            type: Number,
            default: 0,
        },
        availableForBooking: {
            type: Boolean,
            default: false,
        },
        isAutherized: {
            type: Boolean,
            default: false,
        },
        reviews: {
            type: Array,
            default: [],
        },
        services: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
