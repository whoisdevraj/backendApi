import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authenticate.js";
import profileController from "../controllers/profileController.js";

const router = Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

//profile routes

router.get("/profile", authMiddleware, profileController.index);
router.put("/profile/:id", authMiddleware, profileController.update);

export default router;
