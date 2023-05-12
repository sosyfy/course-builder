import express from "express";

//controllers
import authController from "../controllers/authController.js";

const router = express.Router();


router.use("/auth", authController)



export default router;