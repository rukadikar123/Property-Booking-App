import { Router } from "express";
import { becomeHost, getCurrentUser, Login, Logout, Signup } from "../Controllers/auth.controller.js";
import { isAuthenticated } from "../Middlewares/auth.middleware.js";

const router=Router();


router.post("/signup",Signup)
router.post("/login",Login)
router.patch("/become-host",isAuthenticated, becomeHost)
router.get("/logout",isAuthenticated, Logout)
router.get("/current",isAuthenticated, getCurrentUser)





export default router;