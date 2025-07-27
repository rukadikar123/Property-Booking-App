import mongoose from "mongoose";

// Define the schema for Property listings
const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

// Create the model from schema and export
const Property = mongoose.model("Property", PropertySchema);

export default Property;
