import axios from 'axios';
import  { useEffect, useState } from 'react'

function MyBookings() {
    const [bookings,setBookings]=useState([])

    const fetchMyBookings=async()=>{
        try {
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/booking/my-bookings`,{withCredentials:true})
            console.log(res?.data);
            setBookings(res?.data?.bookings)
        } catch (error) {
            console.log(error);
            
        }
    } 
    useEffect(()=>{
        fetchMyBookings()
    },[])


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings?.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bookings?.map((booking) => (
            <div
              key={booking?._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={booking?.property?.images[0]}
                alt="property"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">
                {booking?.property?.title}
              </h2>
              <p className="text-gray-600">{booking?.property?.location}</p>
              <div className="mt-2 text-sm">
                <p>
                  <strong>Check-in:</strong>{" "}
                  {new Date(booking?.checkIn).toLocaleDateString()}
                </p>
                <p>
                  <strong>Check-out:</strong>{" "}
                  {new Date(booking?.checkOut).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Price:</strong> ₹{booking?.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings