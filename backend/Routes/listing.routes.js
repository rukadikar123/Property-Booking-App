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

router.get("/", getpropertyList); // Route to get all property listings 
router.post("/add", isAuthenticated, upload.array("images", 6), addProperty); // Route to add a new property (requires authentication and image upload)
router.get("/search",getSearchProperty)   // Route to search for properties based on query parameters 
router.get("/:id", getProperty); // Route to get details of a specific property by ID 

export default router;
