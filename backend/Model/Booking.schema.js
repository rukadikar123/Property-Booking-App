import mongoose from "mongoose";

// Define the schema for Booking
const BookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ongoing", "completed", "cancelled"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

// Create the Booking model from the schema and export it
const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
