import Student from "../models/studentModel";
import { Request, Response } from "express";

// GET all students
export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const allStudents = await Student.find();
    res.status(200).json({
      message: "Success!",
      allStudents,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// POST new student
export const addStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, studentClass, gender, height, age } = req.body;

    // Basic validation
    if (!firstName || !lastName || !studentClass || !gender || !height || !age) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

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
    console.error(error);
    res.status(500).json({ message: "Error adding student" });
  }
};

// PUT update student
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
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
};

// DELETE student
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);

    res.status(200).json({
      message: "Student deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
