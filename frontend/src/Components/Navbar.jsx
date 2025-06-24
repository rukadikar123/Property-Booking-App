import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";
import axios from "axios";

function Navbar() {
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleLogout =async() => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{withCredentials:true})
      
    dispatch(setUser(null));
    navigate("/listing")
    } catch (error) {
     console.log(error);
      
    }

  };

  return (
    <div className="flex items-center justify-between px-16 py-4 shadow-lg">
      <Link
        to="/listing"
        className="text-3xl font-bold text-blue-700 hover:text-blue-500"
      >
        Airbnb
      </Link>
      <div className="flex items-center gap-6">
        <Link className="hover:scale-105 font-semibold text-lg hover:text-gray-500 transition-all duration-200">
          Homes
        </Link>
        <Link className="hover:scale-105 font-semibold text-lg hover:text-gray-500 transition-all duration-200">
          Become a host
        </Link>
        {user && (
          <Link
            onClick={handleLogout}
            className="hover:scale-105 font-semibold text-lg hover:text-gray-500 transition-all duration-200"
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
