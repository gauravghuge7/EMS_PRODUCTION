import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan"

import ApiRouter from "./routes/index.js";
import { healthCheck } from "./controllers/health.controller.js";

// accept json and form data
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for receiving cookies
app.use(cookieParser());



// enable cors

app.use(cors({
  origin: "http://13.235.142.116:80",
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



app.options('*', cors()); // Handle preflight requests for all routes


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://13.235.142.116:80");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH,  DELETE, OPTIONS");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Handle preflight requests
  }
  next();
});





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
