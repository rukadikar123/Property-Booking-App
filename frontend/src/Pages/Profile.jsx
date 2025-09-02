import axios from "axios";
import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

function Profile() {
  const { user } = useSelector((state) => state?.auth); // Get the current user from Redux store

  // State to hold the image preview (frontend) and file to upload (backend)
  const [frontendImage, setFrontendImage] = useState(user?.profilepic);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state while updating

  const ref = useRef(); // Reference to the hidden file input
  const dispatch = useDispatch();

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file); // Store the file to send to backend
      setFrontendImage(URL.createObjectURL(file)); // Preview the image in UI
    }
  };

  // Handle profile update
  const handleUpdate = async () => {
    setLoading(true);

    // Show warning if no image is selected
    if (!backendImage) {
      setLoading(false);
      return toast.warn("Please select a new image to update");
    }

    // Create form data with the selected image
    const formData = new FormData();
    formData.append("image", backendImage);
    try {
      // Send PATCH request to update the profile image
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
      dispatch(setUser(res?.data?.user)); // Update user data in Redux store
      setLoading(false);
      toast.success("Profile image updated successfully!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to update profile image.");
    }
  };

  return (
    <>
      <div className="flex flex-col md:w-1/3 w-full mx-auto  items-center justify-center mt-12">
        <h1 className="text-4xl font-bold">About Me</h1>
        {/* Profile Image Display */}
        <div className="w-40 h-40 rounded-full overflow-hidden border absolute top-44 ">
          <img src={frontendImage} alt="Profile Picture" />
        </div>
        {/* Hidden file input to upload image */}
        <input
          type="file"
          hidden
          accept="image/*"
          ref={ref}
          onChange={handleImageChange}
        />
        {/* Camera icon to trigger file input */}
        <FaCamera
          onClick={() => ref.current.click()}
          size={25}
          className="relative z-10 top-32 cursor-pointer hover:scale-95 left-[62px]"
        />
        {/* User Info and Update Button */}
        <div className="flex flex-col w-full gap-4 mt-44 p-4">
          <h1 className="text-lg font-medium rounded-md border-2 border-[#e51d56] p-1 text-[#232323] ">
            FullName: <span>{user?.fullname}</span>
          </h1>
          <h1 className="text-lg font-medium rounded-md border-2 border-[#e51d56] p-1 text-[#232323] ">
            Email: <span>{user?.email}</span>
          </h1>
          {/* Button to update profile picture */}
          <button
            disabled={loading}
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
