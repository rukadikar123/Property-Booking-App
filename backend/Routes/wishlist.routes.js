import { Router } from "express";
import { getAllWishlistItems, ToggleWishlist } from "../Controllers/wishlist.controller.js";
import { isAuthenticated } from "../Middlewares/auth.middleware.js";

const router=Router()

router.post("/toggleWishlist",isAuthenticated, ToggleWishlist)
router.get("/allWishlist",isAuthenticated, getAllWishlistItems)



export default router