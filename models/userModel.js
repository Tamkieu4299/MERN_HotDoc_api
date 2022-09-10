const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        idNumber: { type: String, required: true, unique: true,},
        pic: {
            type: String,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
    },
    {
        timestamps: true
    });


userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;