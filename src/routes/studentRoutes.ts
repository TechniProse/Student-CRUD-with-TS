
import { getAllStudents, addStudent, updateStudent, deleteStudent } from "../controllers/studentController";
import express, {  } from "express";

const router = express.Router();

// GET all students
router.get("/all-students", getAllStudents);

// POST new student
router.post("/add-student", addStudent);

// PUT update student
router.put("/edit-student/:id", updateStudent);

// DELETE student
router.delete("/delete-student/:id", deleteStudent);

export default router;
