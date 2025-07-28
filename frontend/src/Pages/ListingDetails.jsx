import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ListingDetails() {
  const { id } = useParams(); // Get property ID from URL
  const [property, setProperty] = useState(null); // State for property data
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");


  const navigate = useNavigate();

  // Fetch property details by ID
  const fetchProperty = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/listing/${id}`,
        { withCredentials: true }
      );
      setProperty(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle booking submission
  const handleBooking = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/booking/place-booking`,
        { propertyId: property?._id, checkIn, checkOut },
        { withCredentials: true }
      );
      toast("Booking successful!");
      navigate("/my-bookings");
    } catch (error) {
      // console.log(error);
      // Handle already booked dates
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Dates already booked"
      ) {
        toast.error("Selected dates are already booked.");
      } else {
        // console.error(error);
        toast.error(`${error?.response?.data?.message}`);
      }
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
     
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#FF385C]">{property?.title}</h1>

        {/* Images */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[400px] rounded-lg overflow-hidden">
          {property?.images.slice(0, 5).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Property ${index + 1}`}
              className={`object-cover w-full h-full rounded-lg transition-transform duration-300 hover:scale-105 ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            />
          ))}
        </div>

        {/* Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {property?.description}
          </p>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-xl font-semibold mb-1 text-gray-800">Location</h2>
          <p className="text-gray-600">{property?.location}</p>
        </div>

        {/* Booking Box */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg w-full md:w-1/2">
          <div className="text-2xl font-bold text-[#FF385C] mb-4">
            ₹{property?.price?.toLocaleString()}{" "}
            <span className="text-base font-medium text-gray-500">/ Night</span>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700">
              Check-in:
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Check-out:
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
              />
            </label>
          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-[#FF385C] hover:bg-[#e11d48] text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default ListingDetails;
