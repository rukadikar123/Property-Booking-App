import express from "express";
import dotenv from "dotenv";
import { MongodbConnect } from "./config/MongoDbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./Routes/auth.routes.js";
import listingRoutes from "./Routes/listing.routes.js";
import bookingRoutes from "./Routes/booking.routes.js";
import ratingRoutes from './Routes/rating.routes.js'
import wishlistRoutes from "./Routes/wishlist.routes.js"
const app = express(); // Initialize express app

dotenv.config(); // Load environment variables

MongodbConnect(); // Connect to MongoDB

// Middleware to parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for frontend origin (allow credentials like cookies)
app.use(
  cors({
    origin: "https://property-booking-app-frontend.onrender.com",
    credentials: true,
  })
);

app.use(cookieParser()); // Middleware to parse cookies

// API Routes
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/listing", listingRoutes); // Property listing routes
app.use("/api/booking", bookingRoutes); // Booking routes
app.use("/api/rating", ratingRoutes); // Rating routes
app.use("/api/wishlist", wishlistRoutes); // Wishlist routes

import "./cron.js"; // Import scheduled cron job (runs on startup)

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
