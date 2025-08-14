import Booking from "../Model/Booking.schema.js";
import Rating from "../Model/Rating.schema.js";
import { updatePropertyRating } from "../utils/updatePropertyRating.js";

// Check if the user has any recent booking that is pending a rating
export const pendingRatings = async (req, res) => {
  try {
    const userId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find the most recent booking that has already checked out
    const recentBookedProperty = await Booking.findOne({
      user: userId,
      checkOut: { $lte: today }, // booking's checkout date is today or earlier
    }).sort({ checkOut: -1 }); // sort latest first

    // If user has no bookings yet, no pending rating
    if (!recentBookedProperty) {
      return res.status(200).json({
        success: true,
        isPending: false, // No booking yet, so no pending rating
      });
    }

    // Check if this booking has already been rated
    const alreadyRated = await Rating.findOne({
      user: userId,
      booking: recentBookedProperty._id,
    });

    // If not rated yet, mark as pending
    if (!alreadyRated) {
      return res.status(200).json({
        success: true,
        isPending: true,
      });
    } else {
      return res.status(200).json({
        success: true,
        isPending: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `pendingRatings: ${error.message}`,
    });
  }
};

// Add a rating for a booking
export const addRating = async (req, res) => {
  try {
    const { bookingId, property, rating, comment } = req.body;
    const userId = req.user._id;

    // Rating is mandatory
    if (!rating) {
      return res.status(400).json({
        success: false,
        message: "Rating Is required to add",
      });
    }

    // Validate booking ownership
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Invalid booking",
      });
    }

    // Prevent duplicate ratings for the same booking
    const alreadyRated = await Rating.findOne({ booking: bookingId });

    if (alreadyRated) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this property",
      });
    }

    // Create the rating
    const newRating = await Rating.create({
      user: userId,
      property,
      booking: bookingId,
      rating,
      comment,
    });

    // Update property's average rating and count
    await updatePropertyRating(property);

    return res.status(200).json({
      success: true,
      newRating,
      message: "Rating submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `addRating: ${error.message}`,
    });
  }
};

// Get all reviews for a property
export const getReviews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required",
      });
    }

    // Find all ratings for the property, with user details populated
    let ratings = await Rating.find({
      property: id,
    })
      .populate("user", "fullname profilepic")
      .sort({ createdAt: -1 });

    if (ratings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Reviews found",
      });
    }

    // If logged in, move the current user's review to the top of the list
    if (req.user) {
      ratings = ratings.sort((a, b) => {
        if (a.user._id.toString() === req.user._id.toString()) return -1;
        if (b.user._id.toString() === req.user._id.toString()) return 1;
        return 0;
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      ratings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getReviews: ${error.message}`,
    });
  }
};
