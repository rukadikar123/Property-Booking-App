import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProperties } from "../redux/propertySlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PropertyCard() {
  const { properties } = useSelector((state) => state?.property);
  const dispatch = useDispatch();
  const navigate=useNavigate()

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

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
   <>
   <h1 className="mt-4 text-2xl font-bold ml-6 ">Popular Homes</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-6 ">
      {properties &&
        properties.map((property) => (
          <div onClick={()=>navigate(`/listing/${property._id}`)} key={property._id} className="border p-2 rounded-lg flex flex-col gap-2 hover:cursor-pointer shadow-md hover:scale-105 transition-all ease-in-out duration-300">
           <h2 className="text-lg font-semibold">{property?.title}</h2>
            <div className="flex">
              <img src={property?.images[0]} alt="images" className="w-full h-40 object-contain" />
            </div>
            <p>{property?.location}</p>
            <p>{property?.price}</p>
          </div>
        ))}
    </div>
   </>
  );
}

export default PropertyCard;
