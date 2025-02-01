import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  check,
} from "../controllers/user.controller.js";

router.post("/loginUser", loginUser);
router.post("/registerUser", registerUser);
router.get("/check", check);

export default router;
