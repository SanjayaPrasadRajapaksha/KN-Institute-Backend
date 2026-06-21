import express from "express";
import CourseController from "../../controllers/course/course.controller.js";


const router = express.Router();
router.post("/create", CourseController.create);
router.delete("/deleteById/:id", CourseController.deleteById);
router.get("/getAll", CourseController.getAll);
router.get("/getById/:id", CourseController.findById);
router.put("/updateById/:id", CourseController.updateById);

export default router;