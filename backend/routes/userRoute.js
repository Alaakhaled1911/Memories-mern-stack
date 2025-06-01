import express from "express";
import { signIn, signUp } from "../controller/userController.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
export default router;
