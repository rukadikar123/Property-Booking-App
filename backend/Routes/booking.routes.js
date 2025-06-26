import { Router } from "express";
import {
  getUsersBookings,
  placeBooking,
} from "../Controllers/booking.controller.js";
import { isAuthenticated } from "../Middlewares/auth.middleware.js";

const router = Router();

router.post("/place-booking", isAuthenticated, placeBooking); // Route to place a new booking (requires authentication)
router.get("/my-bookings", isAuthenticated, getUsersBookings); // Route to get all bookings for the logged-in user (requires authentication)

export default router;
