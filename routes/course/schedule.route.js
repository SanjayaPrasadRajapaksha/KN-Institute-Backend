import express from "express";
import ScheduleController from "../../controllers/course/schedule.controller.js";


const router = express.Router();
router.post("/create", ScheduleController.create);
router.delete("/deleteById/:id", ScheduleController.deleteById);
router.get("/getAll", ScheduleController.getAll);
router.get("/getById/:id", ScheduleController.findById);
router.put("/updateById/:id", ScheduleController.updateById);

export default router;