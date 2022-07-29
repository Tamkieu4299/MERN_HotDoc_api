const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");

// Register a doctor
module.exports.registerDoctor = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newDoctor = new Doctor({
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            idNumber: req.body.idNumber,
            password: hashedPassword,
        });
        const doctor = await newDoctor.save();
        res.status(200).json(doctor);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a doctor
module.exports.updateDoctor = async (req, res) => {
    if (req.body.doctorId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const doctor = await Doctor.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json();
        }
    } else {
        return res.status(403).json("False to update");
    }
};

// Get doctor by ID or name
module.exports.getDoctor = async (req, res) => {
    const doctorId = req.query.doctorId;
    const doctorname = req.query.doctorname;
    try {
        console.log(doctorname);
        const doctor = doctorId
            ? await Doctor.findById(doctorId)
            : await Doctor.findOne({ username: doctorname });
        const { password, address, idNumber, ...other } = doctor._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all doctos 
module.exports.allDoctors = async (req,res) => {
    try{
        const allDoctors = await Doctor.find();
        res.status(200).json(allDoctors);
    }
    catch(err){
        res.status(500).json(err);
    }
}
