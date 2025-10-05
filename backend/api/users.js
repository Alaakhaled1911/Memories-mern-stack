import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import { signIn, signUp } from "../controller/userController.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Connect to database
connectDB();

// Routes
app.post("/signIn", signIn);
app.post("/signUp", signUp);

export default app;
