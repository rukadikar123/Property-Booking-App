import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { MongodbConnect } from "./config/MongoDbConnect.js";
import User from "./Model/User.schema.js";
import Booking from "./Model/Booking.schema.js";
import Property from "./Model/Listing.schema.js";

dotenv.config();

const seed = async () => {
  try {
    await MongodbConnect();

    await Booking.deleteMany();
    await Property.deleteMany();
    await User.deleteMany();

    const password = await bcrypt.hash("19857656", 10);

    const hostUser = await User.create({
      fullname: "John Host",
      email: "host@example.com",
      password,
      isHost: true,
    });

    const normalUser = await User.create({
      fullname: "Alice Guest",
      email: "user@example.com",
      password,
      isHost: false,
    });

    const properties = await Property.insertMany([
      {
        title: "Cozy Cottage",
        description: "A nice place in the hills.",
        location: "Shimla",
        price: 2000,
        images: ["https://example.com/img1.jpg"],
        host: hostUser._id,
      },
      {
        title: "Beach House",
        description: "Ocean view and peaceful evenings.",
        location: "Goa",
        price: 4500,
        images: ["https://example.com/img2.jpg"],
        host: hostUser._id,
      },
    ]);

    const booking = await Booking.create({
      property: properties[0]._id,
      user: normalUser._id,
      checkIn: new Date("2025-06-24"),
      checkOut: new Date("2025-06-26"),
      totalPrice: 4000,
    });

    console.log("✅ Seed data inserted");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seed()