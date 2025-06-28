import axios from "axios";
import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

function Profile() {
  const { user } = useSelector((state) => state?.auth);
  const [frontendImage, setFrontendImage] = useState(user?.profilepic);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const ref = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (!backendImage) {
      setLoading(false);
      return toast.warn("Please select an image");
    }
    const formData = new FormData();
    formData.append("image", backendImage);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/auth/profile/edit`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(setUser(res?.data?.user));
      setLoading(false);
      toast.success("Profile image updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:w-1/3 w-full mx-auto  items-center justify-center mt-12">
        <h1 className="text-4xl font-bold">About Me</h1>
        <div className="w-40 h-40 rounded-full overflow-hidden border absolute top-44 ">
          <img src={frontendImage} alt="" />
        </div>
        <input
          type="file"
          hidden
          accept="image/*"
          ref={ref}
          onChange={handleImageChange}
        />
        <FaCamera
          onClick={() => ref.current.click()}
          size={25}
          className="relative z-10 top-32 cursor-pointer hover:scale-95 left-[62px]"
        />
        <div className="flex flex-col w-full gap-4 mt-44 p-4">
          <h1 className="text-lg font-medium rounded-md border-2 border-[#e51d56] p-1 text-[#232323] ">
            FullName: <span>{user?.fullname}</span>
          </h1>
          <h1 className="text-lg font-medium rounded-md border-2 border-[#e51d56] p-1 text-[#232323] ">
            Email: <span>{user?.email}</span>
          </h1>
          <button
            onClick={handleUpdate}
            className="mt-4 bg-blue-500 rounded-sm p-2 text-lg font-semibold text-white w-full hover:scale-95 transition-all duration-300"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
