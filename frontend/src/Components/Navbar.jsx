import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


function Navbar() {
  const { user } = useSelector((state) => state?.auth);
    const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUser(null));
      navigate("/listing");
    } catch (error) {
      console.log(error);
    }
  };

  const handleHost = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/auth/become-host`,
        { isHost: true },
        { withCredentials: true }
      );
      console.log(res);
      navigate("/add")
      dispatch(setUser(res?.data?.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="shadow-md sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/listing"
          className="text-3xl font-extrabold text-[#FF385C] hover:text-[#e11d48] transition duration-200  tracking-tight"
        >
          Airbnb
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-lg">
          <Link to="/listing" className="text-gray-700 hover:text-[#FF385C] transition duration-200">
            Homes
          </Link>
          <button
            onClick={handleHost}
            className="text-gray-700 hover:text-[#FF385C] transition duration-200"
          >
            Become a Host
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-500 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-[#FF385C] transition duration-200">
              Login
            </Link>
          )}
          {user && (
            <div className="w-10 h-10 rounded-full bg-[#FF385C] flex items-center justify-center text-white font-semibold">
              {user?.fullname?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#FF385C] hover:text-[#e11d48] transition duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoMdClose /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start px-6 py-4 bg-white space-y-4 shadow-lg transition-all duration-300">
          <Link to="/listing" className="text-gray-700 hover:text-[#FF385C] transition duration-200" onClick={() => setIsOpen(false)}>
            Homes
          </Link>
          <button onClick={() => { handleHost(); setIsOpen(false); }} className="text-gray-700 hover:text-[#FF385C] transition duration-200">
            Become a Host
          </button>
          {user ? (
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-gray-700 hover:text-red-500 transition">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-[#FF385C] transition duration-200" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
