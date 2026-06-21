import express from "express";
import StoryController from "../../controllers/feedback/story.controller.js";


const router = express.Router();
router.post("/create", StoryController.create);
router.delete("/deleteById/:id", StoryController.deleteById);
router.get("/getAll", StoryController.getAll);
router.get("/getById/:id", StoryController.findById);
router.put("/verifyById/:id", StoryController.verifyById);

export default router;