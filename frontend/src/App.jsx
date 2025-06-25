import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import PropertyCard from "./Components/PropertyCard";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";
import useGetCurrentUser from "./customHooks/useGetCurrentUser";
import ListingDetails from "./Pages/ListingDetails";
import MyBookings from "./Pages/MyBookings";

function App() {
  useGetCurrentUser()
const {user,loading}=useSelector(state=> state?.auth)

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/listing" : "login"} />} />
        <Route path="/listing" element={user? <PropertyCard /> : <Navigate to='/login' /> } />
        <Route path="/signup" element={!user ? <SignUp/> : <Navigate to='/listing' />} />
        <Route path="/login" element={!user ? <Login/> : <Navigate to='/listing' /> } />
        <Route path="/listing/:id" element={user ? <ListingDetails/> : <Navigate to='/listing' /> } />
        <Route path="/my-bookings" element={user ? <MyBookings/> : <Navigate to='/listing' /> } />
        <Route />
      </Routes>
    </>
  );
}

export default App;
