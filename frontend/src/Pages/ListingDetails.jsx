import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ListingDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [checkIn,setCheckIn]=useState("")
  const [checkOut,setCheckOut]=useState("")
  
  const navigate=useNavigate()

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


  const handleBooking=async()=>{
    try {
      const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/booking/place-booking`,{propertyId:property?._id, checkIn ,checkOut},{withCredentials:true})

        alert("Booking successful!");
        navigate("/my-bookings")
    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(() => {
    fetchProperty();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <h1 className="text-4xl font-bold">{property?.title}</h1>

      {/* Images Grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[400px]">
        {property?.images.slice(0, 5).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Property ${index + 1}`}
            className={
              index === 0
                ? "col-span-2 row-span-2 object-cover w-full h-full rounded-lg"
                : "object-cover w-full h-full rounded-lg"
            }
          />
        ))}
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{property?.description}</p>
      </div>

      {/* Location */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Location</h2>
        <p className="text-gray-600">{property?.location}</p>
      </div>

      {/* Booking Box */}
      <div className="border p-6 rounded-lg shadow-md w-full md:w-1/2">
        <div className="text-2xl font-bold mb-2">
          ₹{property?.price} / night
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <label className="text-sm font-medium">
            Check-in:
            <input
            value={checkIn}
            onChange={(e)=>setCheckIn(e.target.value)}
              type="date"
              className="block w-full border rounded p-2 mt-1"
            />
          </label>
          <label className="text-sm font-medium">
            Check-out:
            <input
            value={checkOut}
            onChange={(e)=>setCheckOut(e.target.value)}
              type="date"
              className="block w-full border rounded p-2 mt-1"
            />
          </label>
        </div>

        <button onClick={handleBooking} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default ListingDetails;
