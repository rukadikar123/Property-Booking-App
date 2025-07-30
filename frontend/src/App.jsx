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
  const [searchedProperties, setSearchedProperties] = useState([]);
 
  useGetCurrentUser(); // Custom hook to fetch and set the current logged-in user

  const { user, loading } = useSelector((state) => state?.auth); // Get user and loading status from Redux store

   // Access wishlist from Redux store
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wishlist/allWishlist`,
        { withCredentials: true }
      );
      dispatch(setWishlist(response?.data?.wishlist));
      console.log("fetchWishlist",response);
      
    } catch (error) {
      console.log("fetch property error", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  if (loading) return <div>Loading...</div>; // While fetching user data, show loading

  return (
    <>
      {/* Global navigation bar */}
      <Navbar  setSearchedProperties={setSearchedProperties} />
      {/* Define routes */}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/listing" : "login"} />}
        />
        <Route
          path="/listing"
          element={user ? <PropertyCard fetchWishlist={fetchWishlist} /> : <Navigate to="/login" />}
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
          element={user ? <ListingDetails /> : <Navigate to="/listing" />}
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
        <Route path="/search" element={<SearchedDestinations  searchedProperties={searchedProperties} />} />
        <Route path="/my-wishlist" element={<WishList/>} />
        <Route />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
