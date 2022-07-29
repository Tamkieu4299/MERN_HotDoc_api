const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");

// Register a customer
module.exports.registerCustomer = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newCustomer = new Customer({
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            idNumber: req.body.idNumber,
            password: hashedPassword,
        });
        const customer = await newCustomer.save();
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Login with customer
// module.exports.loginCustomer = async (req, res) => {
//     const user = await Customer.findOne({ email: req.body.email });
//     try {
//         !user && res.status(404).json("Invalid user");

//         const validPassword = await bcrypt.compare(
//             req.body.password,
//             user.password
//         );
//         !validPassword && res.status(400).json("Invalid password");

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// Update a customer
module.exports.updateCustomer = async (req, res) => {
    // if (req.body.customerId === req.params.id) {
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        return res.status(200).json("Account has been updated");
    } catch (err) {
        return res.status(500).json();
    }
    // } else {
    //     return res.status(403).json("False to update");
    // }
};

// Get customer by Id or name
module.exports.getCustomer = async (req, res) => {
    const customerId = req.query.customerId;
    const customername = req.query.customername;

    try {
        const customer = customerId
            ? await Customer.findById(customerId)
            : await Customer.findOne({ username: customername });
        const { password, address, idNumber, ...other } = customer._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
};
