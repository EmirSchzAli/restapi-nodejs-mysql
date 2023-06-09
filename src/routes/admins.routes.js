import { Router } from "express";
import { getAllAdmins, getAdmin, getAdminbyFBid, getAdminsRegistred, createAdmin, updateAdmin, deleteAdmin } from "../controllers/admins.controller.js";

const router = Router();

router.get('/admins', getAllAdmins);
router.get('/admins/:id_admin', getAdmin);
router.get('/admins/fb/:fb_id', getAdminbyFBid);
router.post('/admins/registred', getAdminsRegistred);
router.post('/admins', createAdmin);
router.patch('/admins/:id_admin', updateAdmin);
router.delete('/admins/:id_admin', deleteAdmin);

export default router;