import { Router } from "express";
import { getCurrentUser, Login, Logout, Signup } from "../Controllers/auth.controller.js";
import { isAuthenticated } from "../Middlewares/auth.middleware.js";

const router=Router();


router.post("/signup",Signup)
router.post("/login",Login)
router.get("/logout",isAuthenticated, Logout)
router.get("/current",isAuthenticated, getCurrentUser)





export default router;