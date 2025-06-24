import mongoose from "mongoose";

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
    totalPrice:{
        type:Number,
        required:true
    }
  },
  { timestamps: true }
);

const Booking=mongoose.model("Booking",BookingSchema)
export default Booking