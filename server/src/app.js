import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import ApiRouter from "./routes/index.js";
import { healthCheck } from "./controllers/health.controller.js";

// accept json and form data
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for receiving cookies

app.use(
    cookieParser()
)

console.log(" cookieParser.prototype", cookieParser.prototype);



// Allow requests from specific origins
const allowedOrigins = [
    "http://13.202.64.146",
    "http://localhost:5173",
    "http://192.168.56.50:5173",
    "http://192.168.250.50",
    "http://192.168.250.50:5173"
];

// Enable CORS
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD", "CONNECT"],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Credentials",
        "Access-Control-Allow-Methods",
        "Access-Control-Allow-Headers",
        "content" // Add custom header 'content' or any other you're using
    ],
    exposedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Credentials",
        "Access-Control-Allow-Methods",
        "Access-Control-Allow-Headers"
    ],



    preflightContinue: false,
    optionsSuccessStatus: 200
}));


// Handle preflight requests for all routes
app.options('*', cors());







app.use("/api", ApiRouter);
app.use("/health", healthCheck);

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        error: {
            message: err.message,
        },
    });
});

export { app }; 