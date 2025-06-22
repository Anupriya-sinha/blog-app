import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";


dotenv.config();
const app = express();
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;

const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-app-jet-psi.vercel.app",
  "https://blog-app-git-main-anupriya-sinhas-projects.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// MongoDB Connection
try {
  await mongoose.connect(MONGO_URL);
  console.log("✅ Connected to MongoDB");
} catch (error) {
  console.error("❌ MongoDB connection failed:", error);
}

// Routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);


// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
