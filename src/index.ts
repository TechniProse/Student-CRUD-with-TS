// Load env vars
import dotenv from "dotenv";
dotenv.config();

// Import dependencies
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";

// Create express app
const app: Application = express();
app.use(express.json());

// Import Student model and Import routes
import studentRoutes from "./routes/studentRoutes";

app.use("/api/students", studentRoutes);

// Environment variables
const MONGODB_URL = process.env.MONGODB_URL as string;
const PORT = process.env.PORT || 8000;

console.log("MONGODB_URL:", MONGODB_URL);
console.log("PORT:", PORT);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("MongoDB is connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

