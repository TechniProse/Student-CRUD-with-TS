import mongoose, { Document, Schema } from "mongoose";

// Define interface
export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  studentClass: string;
  gender: string;
  height: number;
  age: number;
}

// Schema
const studentSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  studentClass: { type: String, required: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  age: { type: Number, required: true },
});

// Model
const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;

module.exports = Student;