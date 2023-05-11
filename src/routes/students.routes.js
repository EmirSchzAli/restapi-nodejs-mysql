import { Router } from "express";
import { getAllStudents, getStudent, createStudent, updateStudent, deleteStudent } from "../controllers/students.controller.js";

const router = Router();

router.get('/students', getAllStudents);
router.get('/students/:matricula', getStudent);
router.post('/students', createStudent);
router.patch('/students/:id_alumno', updateStudent);
router.delete('/students/:id_alumno', deleteStudent);

export default router;