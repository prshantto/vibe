import express from "express";
const router = express.Router();

import {
  getusers,
  registerUser,
  loginUser,
  check,
} from "../controllers/user.controller.js";

router.get("/getusers", getusers);
router.post("/loginUser", loginUser);
router.post("/registerUser", registerUser);
router.get("/check", check);

export default router;
