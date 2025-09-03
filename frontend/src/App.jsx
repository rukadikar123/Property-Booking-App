import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import PropertyCard from "./Components/PropertyCard";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import useGetCurrentUser from "./customHooks/useGetCurrentUser";
import ListingDetails from "./Pages/ListingDetails";
import MyBookings from "./Pages/MyBookings";
import AddProperty from "./Pages/AddProperty";
import { ToastContainer } from "react-toastify";
import Profile from "./Pages/Profile";
import SearchedDestinations from "./Pages/SearchedDestinations";
import { useEffect, useState } from "react";
import WishList from "./Pages/WishList";
import { setWishlist } from "./redux/propertySlice";
import axios from "axios";

function App() {
  const [searchedProperties, setSearchedProperties] = useState([]); // State variable to store the list of properties matching the search query

  useGetCurrentUser(); // Custom hook to fetch and set the current logged-in user

  const { user, loading } = useSelector((state) => state?.auth); // Get user and loading status from Redux store

  // Access wishlist from Redux store
  const dispatch = useDispatch();

  // Function to fetch the user's wishlist from the API
  const fetchWishlist = async () => {
    try {
      // Send GET request to the wishlist endpoint with credentials (cookies/session)
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wishlist/allWishlist`,
        { withCredentials: true }
      );
      dispatch(setWishlist(response?.data?.wishlist)); // Update the Redux store with the fetched wishlist data
      // console.log("fetchWishlist",response);
    } catch (error) {
      // console.log("fetch property error", error);
    }
  };

  // Automatically fetch wishlist when the `user` changes (e.g., login/logout)
  useEffect(() => {
    if(user){
      fetchWishlist()
    }else{
      dispatch(setWishlist(null));

    }
  }, [user]);

  if (loading) return <div>Loading...</div>; // While fetching user data, show loading

  return (
    <>
      {/* Global navigation bar */}
      <Navbar setSearchedProperties={setSearchedProperties} />
      {/* Define routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/listing" />} />
        <Route
          path="/listing"
          element={<PropertyCard fetchWishlist={fetchWishlist} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/listing" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/listing" />}
        />
        <Route
          path="/listing/:id"
          element={<ListingDetails />}
        />
        <Route
          path="/my-bookings"
          element={user ? <MyBookings /> : <Navigate to="/listing" />}
        />
        <Route
          path="/add"
          element={user ? <AddProperty /> : <Navigate to="/listing" />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/search"
          element={
            <SearchedDestinations searchedProperties={searchedProperties} />
          }
        />
        <Route path="/my-wishlist" element={user ? <WishList /> : <Navigate to="/listing" />} />   
        <Route />
      </Routes>
      <ToastContainer  
      autoClose={1500} />
    </>
  );
}

export default App;
