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

    if(!rating){
      return res.status(400).json({
        success:false,
        message:"Rating Is required to add"
      })
    }

    const alreadyRated=await Rating.findOne({
        user:userId,
        property  
    })

    if(alreadyRated){
      return res.status(400).json({
        success:false,
        message:"You have already rated this property"
      })
    }

    const newRating= await Rating.create({
      user:userId,
      property,
      rating,
      comment
    })

  await   updatePropertyRating(property)

    return res.status(200).json({
      success:true,
      newRating,
      message:"Rating submitted successfully"
    })


  } catch (error) {
     return res.status(500).json({
      success: false,
      message: `addRating: ${error.message}`,
    });
  }
};
