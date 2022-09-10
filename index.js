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
const userRoute = require("./routes/userRoutes")
const { chats } = require("./data/data")
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// Express Application
dotenv.config();

const app = express();

// Database connection
global.db = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log("Database connected");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get('/', (req, res) => {
    res.send("API is Running");
});

// Routes
app.use("/api/doctors", doctorRoute);
app.use("/api/customers", customerRoute);
app.use("/api/appointments", appointmentRoute);
app.use("/api/medicines", medicineRoute);
app.use("/api/auth", authRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoute);

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8800

const server = app.listen(8800, console.log(`Backend Server Started on PORT ${PORT}`));


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
    console.log('connected to socket.io');

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit('connected');
    })
    
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("user joined room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

        socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});