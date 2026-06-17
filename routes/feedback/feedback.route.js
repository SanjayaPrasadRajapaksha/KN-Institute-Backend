import express from "express";
import FeedbackController from "../../controllers/feedback/feedback.controller.js";


const router = express.Router();
router.post("/create", FeedbackController.create);
router.delete("/deleteById/:id", FeedbackController.deleteById);
router.get("/getAll", FeedbackController.getAll);
router.get("/getById/:id", FeedbackController.findById);
router.put("/verifyById/:id", FeedbackController.verifyById);

export default router;