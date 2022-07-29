const appointmentController = require("../controllers/appointmentController");
const router = require("express").Router();

// Create appointment
router.post("/booking", appointmentController.bookingDoctor);
// View available doctos between
router.get("/alldoctors/:from/:to", appointmentController.viewAvailableDoctors);
// Get all appointments for doctor
router.get("/:doctorId", appointmentController.appointmentsForDoctor);

module.exports = router;
