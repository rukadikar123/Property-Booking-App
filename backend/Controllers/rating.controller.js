import Booking from "../Model/Booking.schema.js";
import Rating from "../Model/Rating.schema.js";
import { updatePropertyRating } from "../utils/updatePropertyRating.js";

export const pendingRatings = async (req, res) => {
  try {
    const userId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const recentBookedProperty = await Booking.findOne({
      user: userId,
      checkOut: { $lte: today },
    }).sort({ checkOut: -1 });

    if (!recentBookedProperty) {
      return res.status(200).json({
        success: true,
        isPending: false, // No booking yet, so no pending rating
      });
    }

    const alreadyRated = await Rating.findOne({
      user: userId,
      property: recentBookedProperty.property,
    });

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

export const addRating = async (req, res) => {
  try {
    const { property, rating, comment } = req.body;
    const userId = req.user._id;

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: "Rating Is required to add",
      });
    }

    const alreadyRated = await Rating.findOne({
      user: userId,
      property,
    });

    if (alreadyRated) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this property",
      });
    }

    const newRating = await Rating.create({
      user: userId,
      property,
      rating,
      comment,
    });

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

export const getReviews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required",
      });
    }

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
