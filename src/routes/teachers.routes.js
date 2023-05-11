import { Router } from "express";
import { getAllTeachers, getTeacher, createTeacher, updateTeacher, deleteTeacher } from "../controllers/teachers.controller.js";

const router = Router();

router.get('/teachers', getAllTeachers);
router.get('/teachers/:id_docente', getTeacher);
router.post('/teachers', createTeacher);
router.patch('/teachers/:id_docente', updateTeacher);
router.delete('/teachers/:id_docente', deleteTeacher);

export default router;