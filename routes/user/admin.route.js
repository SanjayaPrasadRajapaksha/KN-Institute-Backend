import express from "express";
import AdminController from "../../controllers/user/admin.controller.js";
import adminAuth from "../../middleware/adminAuth.js";

const router = express.Router();

router.post("/register", AdminController.registerAdmin);
router.post("/login", AdminController.adminLogin);
router.post("/super-register", AdminController.superAdminRegistration);
router.post("/change-password/:id", AdminController.changeAdminPassword);
router.get("/getAll", AdminController.getAdmin);
router.get("/getById/:id", AdminController.getAdminById);
router.put("/updateById/:id", AdminController.updateAdminDetails);
router.patch("/verifyById/:id", AdminController.verifyAdminById);
router.patch("/activateById/:id", AdminController.activateAdminById);
router.patch("/updateSuspendStatusById/:id", AdminController.updateSuspendStatusById);
router.delete("/deleteById/:id", AdminController.deleteAdminById);

export default router;