import { Router } from "express";
import { getAllWishlistItems, ToggleWishlist } from "../Controllers/wishlist.controller.js";
import { isAuthenticated } from "../Middlewares/auth.middleware.js";

const router=Router()

router.post("/toggleWishlist",isAuthenticated, ToggleWishlist)  // Toggle a property in the wishlist (add/remove based on current state)
router.get("/allWishlist",isAuthenticated, getAllWishlistItems) // Get all wishlist items of the logged-in user



export default router