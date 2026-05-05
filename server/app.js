require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requestIp = require("request-ip");
const morgan = require("morgan");
const useragent = require("express-useragent");
const router = require("./router");
const { welcomeNote } = require("./constant/constant");
const connectDb = require("./config/db");
const { createLocalFolders } = require("./config/onstart-configuration");

const app = express();
createLocalFolders();
connectDb();

const corsOptions = {
    origin: [
        "https://manage.velocitytechacademy.com",
        "https://velocitytechacademy.com",
        "https://velocitytechacademy.vercel.app",
        "http://localhost:3000",
        "http://localhost:3002",
    ],
    credentials: true,
};

/* * Middleware */
app.use(useragent.express());
app.use(cors(corsOptions)); // Enable CORS with specified options
app.options(/.*/, cors(corsOptions)); // Enable pre-flight requests for all routes
app.use(express.static("uploads")); // Serve static files from the uploads directory
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(requestIp.mw());
app.use(morgan("dev")); // Logging middleware
app.use(router);


/**
 * Welcome Route
 */
app.get("/", (req, res) => {
    console.log(`${req.protocol}://${req.host}`);

    res.status(200).send(welcomeNote);
});

/**
 * For file upload error handling
 */
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            if (err.field === "thumb") {
                return res.status(400).json({
                    success: false,
                    message: "File too large (max 5MB)",
                });
            }
            if (err.field === "video") {
                return res.status(400).json({
                    success: false,
                    message: "File too large (max 100MB)",
                });
            }
        }

        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    // your custom errors (fileFilter etc.)
    if (err.message?.includes("Invalid file type")) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    next(err);
});

/**
 * For Error Route
 */
app.use((req, res, next) => {
    res.status(404).send({
        success: false,
        message: "Invalid Route",
    });
});

module.exports = app;