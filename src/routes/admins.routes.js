import { Router } from "express";
import { getAllAdmins, getAdmin, getAdminbyFBid, createAdmin, updateAdmin, deleteAdmin } from "../controllers/admins.controller.js";

const router = Router();

router.get('/admins', getAllAdmins);
router.get('/admins/:num_empleado', getAdmin);
router.get('/admins/fb/:num_empleado', getAdminbyFBid);
router.post('/admins', createAdmin);
router.patch('/admins/:num_empleado', updateAdmin);
router.delete('/admins/:num_empleado', deleteAdmin);

export default router;