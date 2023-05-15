import { Router } from "express";
import { createRegistry, getAllRegistries, getRegistriesbyAdminId } from "../controllers/registries.controller.js";

const router = Router();

router.post('/registries', createRegistry);
router.get('/registries', getAllRegistries);
router.get('/registries/:id_admin', getRegistriesbyAdminId);

export default router;