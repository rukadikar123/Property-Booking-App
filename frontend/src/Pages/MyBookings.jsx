import axios from "axios";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
import PendingRatingPopup from "../Components/PendingRatingPopup";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // holds which booking user is rating
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkPendingRating = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/rating/isPending`,
          { withCredentials: true }
        );
        console.log(response);

        if (response?.data?.isPending) {
          setShowPopup(true);
        }
      } catch (error) {
        toast.error(`${error?.response?.data?.message}`);
      }
    };

    checkPendingRating();
  }, []);

  const handleRateNow = async () => {
    setShowPopup(false);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(newRating);
  };

  const submitRating = async () => {
    if (!selectedBooking) {
      toast.error("No booking selected.");
      return;
    }

    if (!rating) {
      toast.error("Please select a star rating before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/rating/add`,
        {
          property: selectedBooking.property._id,
          rating,
          comment,
        },
        { withCredentials: true }
      );
      toast.success("Rating submitted successfully!");
      setShowRatingPopup(false);
      setRating(0);
      setComment("");
      setSelectedBooking(null);
      fetchMyBookings();
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch bookings of the current user
  const fetchMyBookings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/booking/my-bookings`,
        { withCredentials: true }
      );
      console.log(res?.data);
      setBookings(res?.data?.BookingsWithRatingStatus);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <>
      <section className="min-h-screen bg-gray-100 py-12 px-4">
        <div>
          {showPopup && (
            <PendingRatingPopup
              onClose={() => setShowPopup(false)}
              onRateNow={handleRateNow}
            />
          )}
        </div>
        <div className="max-w-6xl mx-auto">
          {/* Page Heading */}
          <h1 className="text-3xl font-bold text-[#FF385C] mb-8 text-center">
            My Bookings
          </h1>
          {/* Show message if no bookings */}
          {bookings?.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              No bookings found.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {bookings.map((booking) => (
                <div
                  key={booking?._id}
                  className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] overflow-hidden"
                >
                  {/* Property image */}
                  <img
                    src={booking?.property?.images[0]}
                    alt="property"
                    className="w-full h-52  object-fill"
                  />
                  {/* Property details */}
                  <div className="p-5 space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {booking?.property?.title}
                    </h2>
                    <p className="text-gray-600">
                      {booking?.property?.location}
                    </p>

                    <div className="pt-2 text-sm text-gray-700 space-y-1">
                      <p>
                        <strong>Check-in:</strong>{" "}
                        {new Date(booking?.checkIn).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Check-out:</strong>{" "}
                        {new Date(booking?.checkOut).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Total Price:</strong>{" "}
                        <span className="text-[#FF385C] font-bold">
                          ₹{booking?.totalPrice?.toLocaleString()}
                        </span>
                      </p>
                      <p>
                        <strong>Status:</strong> {booking?.status}
                      </p>
                    </div>
                  </div>
                  {(() => {
                    if (booking?.alreadyRated) {
                      return (
                        <>
                          <button 
                            disabled
                            className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                          >
                            Already Rated
                          </button>
                          <div>
                            <ReactStars
                              count={5}
                              value={booking.ratingValue}
                              edit={false}
                            />
                            <span className="text-sm text-gray-600">
                              You rated: {booking.ratingValue} stars
                            </span>
                          </div>
                        </>
                      );
                    } else if (booking?.status !== "completed") {
                      return (
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                        >
                          Rate after Checkout
                        </button>
                      );
                    } else {
                      return (
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowRatingPopup(true);
                          }}
                          className="px-4 py-2 bg-[#FF385C] text-white rounded hover:bg-[#e23750] transition"
                        >
                          Rate this Home
                        </button>
                      );
                    }
                  })()}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {showRatingPopup && (
        <>
          {/* Background Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Popup */}
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white z-50 p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-center mb-4 text-[#FF385C]">
              Rate Your Stay
            </h2>

            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={35}
              value={rating}
              color2={"#FF385C"}
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave an optional comment..."
              className="w-full mt-4 border border-gray-300 rounded-md p-2"
              rows={4}
            />
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setShowRatingPopup(false)}
                disabled={loading}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                disabled={loading}
                className="px-4 py-2 bg-[#FF385C] text-white rounded-xl hover:bg-[#af4055]"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyBookings;
