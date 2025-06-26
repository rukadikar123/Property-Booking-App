import axios from "axios";
import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/booking/my-bookings`,
        { withCredentials: true }
      );
      console.log(res?.data);
      setBookings(res?.data?.bookings);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#FF385C] mb-8 text-center">
          My Bookings
        </h1>

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
                <img
                  src={booking?.property?.images[0]}
                  alt="property"
                  className="w-full h-52  object-fill"
                />

                <div className="p-5 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {booking?.property?.title}
                  </h2>
                  <p className="text-gray-600">{booking?.property?.location}</p>

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
                      <strong>Status:</strong>{" "}
                      {booking?.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyBookings;
