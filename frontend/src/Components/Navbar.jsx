import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-16 py-4 shadow-lg"> 
      <Link to="/" className="text-3xl font-bold text-blue-700 hover:text-blue-500">Airbnb</Link>
      <div className="flex items-center gap-6">
        <Link className="hover:scale-105 font-semibold text-lg hover:text-gray-500 transition-all duration-200">Homes</Link>
        <Link className="hover:scale-105 font-semibold text-lg hover:text-gray-500 transition-all duration-200">Become a host</Link>
        <Link className="hover:scale-105 font-semibold text-lg hover:text-gray-500 transition-all duration-200">login</Link>
      </div>
    </div>
  );
}


export default Navbar;
