import React from "react";
import { useNavigate } from "react-router-dom";

function SearchedDestinations({ searchedProperties }) {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Popular Homes in {searchedProperties[0]?.location}
      </h1>
      {/* Grid layout for listing properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchedProperties &&
          searchedProperties.map((property) => (
            <div
              key={property._id}
              onClick={() => navigate(`/listing/${property._id}`)}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.03] cursor-pointer"
            >
              {/* Property Image */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={property?.images[0]}
                  alt={property?.title}
                  className="h-full w-full transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                />
              </div>
              {/* Property Info */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-800 truncate">
                  {property?.title}
                </h2>
                <p className="text-sm text-gray-500">{property?.location}</p>
                <p className="text-[#FF385C] font-bold text-base mt-1">
                  ₹ {property?.price?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default SearchedDestinations;
