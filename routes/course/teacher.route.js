import express from "express";
import TeacherController from "../../controllers/course/teacher.controller.js";


const router = express.Router();
router.post("/create", TeacherController.create);
router.delete("/deleteById/:id", TeacherController.deleteById);
router.get("/getAll", TeacherController.getAll);
router.get("/getById/:id", TeacherController.findById);
router.put("/updateById/:id", TeacherController.updateById);

export default router;