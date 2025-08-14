import mongoose from "mongoose";
import Rating from "../Model/Rating.schema.js";
import Property from "../Model/Listing.schema.js";

// Function to update a property's average rating and total rating count
export const updatePropertyRating = async (propertyId) => {
  // Aggregate ratings for the given property ID
  const result = await Rating.aggregate([
    {
      $match: {
        property: new mongoose.Types.ObjectId(propertyId), // Match ratings for this property
      },
    },
    {
      $group: {
        _id: "$property", // Group by property ID
        averageRating: { $avg: "$rating" }, // Calculate average rating
        ratingCount: { $sum: 1 }, // Count total ratings
      },
    },
  ]);

  // If ratings exist, update property with average and count
  if (result.length > 0) {
    await Property.findByIdAndUpdate(propertyId, {
      ratings: result[0].averageRating,
      ratingCount: result[0].ratingCount,
    });
  } else {
    // If no ratings, reset ratings and count to 0
    await Property.findByIdAndUpdate(propertyId, {
      ratings: 0,
      ratingCount: 0,
    });
  }
};
