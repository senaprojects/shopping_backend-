import express from "express";
import multer from "multer";
import { userRegister, userLogin } from "../controllers/authController.js";
const router = express.Router();

  
 
router.post("/register",userRegister);
router.post("/login", userLogin);

export default router;

