import { Router } from "express";
import { getAllClassrooms, getClassroom, createClassroom, updateClassroom, deleteClassroom } from "../controllers/classrooms.controller.js";

const router = Router();

router.get('/classrooms', getAllClassrooms);
router.get('/classrooms/:id_salon', getClassroom);
router.post('/classrooms', createClassroom);
router.patch('/classrooms/:id_salon', updateClassroom);
router.delete('/classrooms/:id_salon', deleteClassroom);

export default router;