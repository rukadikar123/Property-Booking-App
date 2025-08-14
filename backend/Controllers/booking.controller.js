import Booking from "../Model/Booking.schema.js";
import Property from "../Model/Listing.schema.js";
import Rating from "../Model/Rating.schema.js";

export const placeBooking = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut } = req.body;

    // Validate required fields
    if (!propertyId || !checkIn || !checkOut) {
      return res.status(404).json({
        success: false,
        message: "Please select dates",
      });
    }

    // Check for overlapping bookings on the same property
    const existingBooking = await Booking.findOne({
      property: propertyId,
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Dates already booked",
      });
    }

    const property = await Property.findById(propertyId);

    // Validate that the property exists
    if (!property) {
      return res.status(400).json({
        success: false,
        message: "No property found",
      });
    }

    // Calculate total number of days
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const days = Math.ceil(
      (checkOutDate - checkInDate) / (24 * 60 * 60 * 1000)
    );

    // Ensure check-out is after check-in
    if (days <= 0) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    // Calculate total price based on number of days and property price
    const totalPrice = days * property?.price;

    // Create the booking
    const booking = await Booking.create({
      property: propertyId,
      user: req.user._id,
      checkIn,
      checkOut,
      totalPrice,
      status: "ongoing",
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

export const getUsersBookings = async (req, res) => {
  try {
    // Fetch bookings where the user ID matches the currently logged-in user
    const bookings = await Booking.find({ user: req.user._id })
      .populate(
        "property", // Populate property details
        "title location images price" // Only select these fields from the property
      )
      .sort({ createdAt: -1 });

    // If no bookings found, return appropriate message
    if (!bookings || bookings.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Booking Found",
      });
    }

    // Wait for all asynchronous operations inside the map to complete
    const BookingsWithRatingStatus = await Promise.all(
      // Loop through each booking and perform async operations
      bookings.map(async (booking) => {
        // Find a rating document where the user matches the logged-in user
        // and the booking matches the current booking's ID
        const rating = await Rating.findOne({
          user: req.user._id,
          booking: booking._id,
        });
        // Return a new object containing all original booking properties,
        // plus additional fields about the rating status
        return {
          ...booking._doc, // Spread the raw MongoDB document fields
          alreadyRated: !!rating, // Boolean: true if rating exists, false otherwise
          ratingValue: rating ? rating.rating : null, // Actual rating value if found, otherwise null
        };
      })
    );

    // Send bookings in response
    return res.status(200).json({
      success: true,
      message: "fetched all Bookings successfully",
      BookingsWithRatingStatus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `placeBooking: ${error.message}`,
    });
  }
};
