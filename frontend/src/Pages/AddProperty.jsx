import axios from 'axios';
import React, { useState } from 'react'

function AddProperty() {

    const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files)); // multiple files
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );

    images.forEach((img) => data.append("images", img)); // match `upload.array("images", 6)`

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

      alert("Property added successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Add property error:", error);
      alert("Failed to add property");
    } finally {
      setLoading(false);
    }
  };



  return (
     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-2 rounded"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹ per night)"
          className="w-full border p-2 rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Property"}
        </button>
      </form>
    </div>
  )
}

export default AddProperty