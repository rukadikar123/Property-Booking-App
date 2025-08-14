import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProperties } from "../redux/propertySlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { toast } from "react-toastify";

function PropertyCard({ fetchWishlist }) {
  const { properties, wishlist } = useSelector((state) => state?.property); // Access properties and wishlist from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle wishlist for a property
  const wishlistHandler = async (e, property) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/wishlist/toggleWishlist`,
        { propertyId: property._id },
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      fetchWishlist();
    } catch (error) {
      console.log("fetch property error", error);
    }
  };

  // Fetch property listings from the backend
  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/listing`,
        { withCredentials: true }
      );
      console.log(res);

      dispatch(setProperties(res?.data?.data));
    } catch (error) {
      console.log("fetch property error", error);
    }
  };
  // Run once when the component mounts
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Popular Homes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties &&
            properties.map((property) => {
              const isWishlisted = wishlist?.some(
                (item) => item?.property._id === property._id
              );
              return (
                <div
                  key={property._id}
                  onClick={() => navigate(`/listing/${property._id}`)}
                  className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.03] cursor-pointer"
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
                    <p className="text-sm text-gray-500">
                      {property?.location}
                    </p>
                    <div className="flex justify-between">
                      <p className="text-[#FF385C] font-bold text-base mt-1">
                        ₹ {property?.price?.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1">
                        <IoStar size={20} className="text-black/80" />
                        <span className="text-sm text-gray-700">
                          {property?.ratings.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Wishlist button */}
                  <div
                    onClick={(e) => wishlistHandler(e, property)}
                    className="absolute top-2 right-2 text-2xl"
                  >
                    {isWishlisted ? "❤" : "🤍"}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default PropertyCard;
