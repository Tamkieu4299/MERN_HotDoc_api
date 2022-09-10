const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//api
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
    ? {
        $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
        : {};

    const users = await User.find(keyword).find({ });
    res.send(users);
});

module.exports = { allUsers };