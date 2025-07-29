// cron.js
import cron from "node-cron";
import { MongodbConnect } from "./config/MongoDbConnect.js";
import dotenv from "dotenv";
import Booking from "./Model/Booking.schema.js";

dotenv.config(); // Load environment variables from .env file
await MongodbConnect(); // Ensure DB connection

console.log("[CRON] cron.js loaded ✅");
// Schedule: Every day at midnight (server time)
cron.schedule("* * * * *", async () => {
  const now = new Date();

  // Convert current time to IST
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is +5:30 from UTC
  const nowIST = new Date(now.getTime() + istOffset);

  // Calculate start of today in IST
    const startOfTodayIST = new Date(nowIST);
    startOfTodayIST.setHours(0, 0, 0, 0);

 // Convert start of today IST to UTC
    const startOfTodayUTC = new Date(startOfTodayIST.getTime() - istOffset);

  // Update all bookings where checkOut date is in the past and status is still "ongoing"
  const result = await Booking.updateMany(
    { checkOut: { $lt: startOfTodayUTC }, status: "ongoing" },
    { $set: { status: "completed" } }
  );
  console.log(`[CRON] ✅ Updated ${result.modifiedCount} bookings`);
},
{
  timezone: "Asia/Kolkata" // ⬅️ this sets the cron to IST
});
