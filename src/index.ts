// Load env vars
import dotenv from "dotenv";
dotenv.config();

// Import dependencies
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";

// Import your Student model
import Student from "./studentModel"; // Ensure studentModel.ts is typed properly

// Create express app
const app: Application = express();
app.use(express.json());

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

// ================= ROUTES =================

// GET all students
app.get("/all-students", async (req: Request, res: Response): Promise<void> => {
  try {
    const allStudents = await Student.find();
    res.status(200).json({
      message: "Success!",
      allStudents,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// POST new student
app.post("/add-student", async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, studentClass, gender, height, age } = req.body;

    const newStudent = new Student({
      firstName,
      lastName,
      studentClass,
      gender,
      height,
      age,
    });

    await newStudent.save();

    res.status(201).json({
      message: "Success",
      newStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
});

// PUT update student
app.put("/edit-student/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { studentClass, height, age } = req.body;

    const editedStudent = await Student.findByIdAndUpdate(
      id,
      { studentClass, height, age },
      { new: true }
    );

    res.status(200).json({
      message: "Success!",
      editedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
});

// DELETE student
app.delete("/delete-student/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);

    res.status(200).json({
      message: "Student deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
});
