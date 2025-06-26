import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AddProperty() {
  // Form data for property details
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
  });
  const [images, setImages] = useState([]); // State for storing selected image files
  const [loading, setLoading] = useState(false);

  // Handle input field changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files)); // multiple files
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Require at least one image
    if (images.length === 0) {
      toast.warn("Please select at least one image.");
      return;
    }

    // Prepare FormData for multipart/form-data request
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    images.forEach((img) => data.append("images", img));

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/listing/add`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast("Property added successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Add property error:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto mt-6 p-8 bg-gray-100 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-[#FF385C] mb-6 text-center">
        Add New Property
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title Input */}
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
          value={formData.title}
          onChange={handleChange}
          required
        />
        {/* Description Input */}
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />
        {/* Location Input */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
          value={formData.location}
          onChange={handleChange}
          required
        />
        {/* Price Input */}
        <input
          type="number"
          name="price"
          placeholder="Price (₹ per night)"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
          value={formData.price}
          onChange={handleChange}
          required
        />
        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 cursor-pointer"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#FF385C] hover:bg-[#e11d48] text-white font-semibold py-3 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Property"}
        </button>
      </form>
    </section>
  );
}

export default AddProperty;
