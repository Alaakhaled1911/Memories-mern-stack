import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import postRoute from "./routes/postRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
const PORT = process.env.PORT || 7000;

connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
