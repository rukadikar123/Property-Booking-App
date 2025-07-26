import { Router } from "express";
import {
  addProperty,
  getProperty,
  getpropertyList,
  getSearchProperty,
} from "../Controllers/listing.controller.js";
import { isAuthenticated } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.js";

const router = Router();

router.get("/", isAuthenticated, getpropertyList); // Route to get all property listings (requires authentication)
router.post("/add", isAuthenticated, upload.array("images", 6), addProperty); // Route to add a new property (requires authentication and image upload)
router.get("/search",isAuthenticated,getSearchProperty)
router.get("/:id", isAuthenticated, getProperty); // Route to get details of a specific property by ID (requires authentication)

export default router;
