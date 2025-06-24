import Booking from "../Model/Booking.schema.js";
import Property from "../Model/Listing.schema.js";

export const placeBooking = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut } = req.body;

    if (!propertyId || !checkIn || !checkOut) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }

    const existingBooking = await Booking.findOne({
      property: propertyId,
      $or: [{ checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }],
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Dates already booked",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(400).json({
        success: false,
        message: "No property found",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const days = Math.ceil(
      (checkInDate - checkOutDate) / (24 * 60 * 60 * 1000)
    );

    const totalPrice = days * property?.price;

    const booking = await Booking.create({
      property: propertyId,
      user: req.user._id,
      checkIn,
      checkOut,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Booking placed successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `placeBooking: ${error.message}`,
    });
  }
};

export const getUsersBookings=async(req,res)=>{
    try {
        
        const bookings=await Booking.findById(req?.user?._id).populate("Property", "title location images price")

        if(!bookings){
            return res.status(400).json({
                success:false,
                message:"No Booking Found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"fetched all Bookings successfully",
            bookings
        })


    } catch (error) {
         return res.status(500).json({
      success: false,
      message: `placeBooking: ${error.message}`,
    });
    }
}