// cron.js
import cron from 'node-cron';
import { MongodbConnect } from './config/MongoDbConnect.js';
import dotenv from 'dotenv';
import Booking from './Model/Booking.schema.js';

dotenv.config();
await MongodbConnect(); // Ensure DB connection

// Schedule: Every day at midnight (server time)
cron.schedule('0 0 * * *', async () => {
  const now = new Date();
  const result = await Booking.updateMany(
    { checkOut: { $lt: now }, status: 'ongoing' },
    { $set: { status: 'completed' } }
  );
  console.log(`[CRON] ✅ Updated ${result.modifiedCount} bookings`);
});
