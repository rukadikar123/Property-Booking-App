import { Router } from "express";
import { getUsersBookings, placeBooking } from "../Controllers/booking.controller.js";
import { isAuthenticated } from "../Middlewares/auth.middleware.js";


const router=Router();


router.post('/place-booking', isAuthenticated , placeBooking)
router.post('/my-bookings', isAuthenticated, getUsersBookings)




export default router