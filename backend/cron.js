// cron.js
import cron from "node-cron";
import { MongodbConnect } from "./config/MongoDbConnect.js";
import dotenv from "dotenv";
import Booking from "./Model/Booking.schema.js";

dotenv.config(); // Load environment variables from .env file
await MongodbConnect(); // Ensure DB connection

console.log("[CRON] cron.js loaded ✅");
// Schedule: Every day at midnight (server time)
cron.schedule("0 0 * * *", async () => {
  const now = new Date();
  
  // Update all bookings where checkOut date is in the past and status is still "ongoing"
  const result = await Booking.updateMany(
    { checkOut: { $lt: now }, status: "ongoing" },
    { $set: { status: "completed" } }
  );
  console.log(`[CRON] ✅ Updated ${result.modifiedCount} bookings`);
});
