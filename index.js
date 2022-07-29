const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const doctorRoute = require("./routes/doctors");
const customerRoute = require("./routes/customers");
const appointmentRoute = require("./routes/appointments")
const medicineRoute = require("./routes/medicines");
const authRoute = require("./routes/auth");
const reviewRoute = require("./routes/reviews");

// Express Application
const app = express();
dotenv.config();

// Database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log("Database connected");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


// Routes
app.use("/api/doctors", doctorRoute);
app.use("/api/customers", customerRoute);
app.use("/api/appointments", appointmentRoute);
app.use("/api/medicines", medicineRoute);
app.use("/api/auth", authRoute);
app.use("/api/reviews", reviewRoute);

// Run on port
app.listen(8800, () => {
    console.log("Backend is running");
});
