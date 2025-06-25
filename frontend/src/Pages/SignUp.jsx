import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoading, setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function SignUp() {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        form,
        { withCredentials: true }
      );
      console.log(res);
      dispatch(setUser(res?.data?.user));
      dispatch(setLoading(false));
      toast("Signup successfull!");
      navigate("/listing");
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Create Account
        </h2>

        <div className="space-y-4">
          <input
            name="fullname"
            type="text"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Create Account
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in here
          </span>
        </p>
      </form>
    </section>
  );
}

export default SignUp;
