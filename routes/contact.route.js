import express from "express";
const router = express.Router();
import contactController from "../controllers/contact.controller.js";


router.post("/contactAdd", contactController.contactAdd);
router.get("/getAllContact", contactController.getAllContact);
router.delete("/deleteContactById/:id", contactController.deleteContactById);
router.get("/getContactById/:id", contactController.getContactById);


export default router;