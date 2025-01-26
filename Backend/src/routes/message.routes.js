import express from "express";
const router = express.Router();
import messageController from "../controllers/message.controller.js";

router.post("/", protectRoute, messageController.getUsers);

router.get("/:id", protectRoute, messageController.getMessages);

router.post("/send/:id", protectRoute, messageController.sendMessage);

export default router;
