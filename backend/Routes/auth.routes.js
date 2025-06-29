import { Router } from "express";
import {
  becomeHost,
  editProfile,
  getCurrentUser,
  Login,
  Logout,
  Signup,
} from "../Controllers/auth.controller.js";
import { isAuthenticated } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.js";

const router = Router();

router.post("/signup", Signup); // Route to sign up a new user
router.post("/login", Login); // Route to log in a user
router.patch("/become-host", isAuthenticated, becomeHost); // Route to become a host (protected)
router.get("/logout", isAuthenticated, Logout); // Route to log out a user (protected)
router.get("/current", isAuthenticated, getCurrentUser); // Route to get current logged-in user (protected)
router.patch(
  "/profile/edit",
  isAuthenticated,
  upload.single("image"),
  editProfile
); // Route to Edit profile(protected)

export default router;
