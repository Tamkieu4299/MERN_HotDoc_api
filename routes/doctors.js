const doctorController = require("../controllers/doctorController");
const router = require("express").Router();

// Register a Doctor
router.post("/register", doctorController.registerDoctor);
// Login with doctor
// router.post("/login", doctorController.loginDoctor);
// Update a doctor
router.put("/:id", doctorController.updateDoctor);
// Get a doctor
router.get("/", doctorController.getDoctor);
// Get all doctors
router.get("/all", doctorController.allDoctors);

module.exports = router;
