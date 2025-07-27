import Booking from "../Model/Booking.schema.js";
import Rating from "../Model/Rating.schema.js";

export const pendingRatings = async (req,res) => {
  try {
    const userId = req.user._id;

    const recentBookedProperty = await Booking.findOne({
      user: userId,
      checkOut: { $lt: new Date() },
    }).sort({ checkOut: -1 });

    if (!recentBookedProperty) {
      return res.status(200).json({
        success: true,
        isPending: false, // No booking yet, so no pending rating
      });
    }

    const alreadyRated = await Rating.findOne({
      user: userId,
      property: recentBookedProperty._id,
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
