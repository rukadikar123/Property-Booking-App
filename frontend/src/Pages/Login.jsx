import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" }); // state to store email and password input
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make login API call
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form,
        { withCredentials: true }
      );
      dispatch(setUser(res?.data?.user)); // Set logged-in user in Redux
      toast("Login successfull!");
    } catch (error) {
      console.log(error);
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
          Welcome Back
        </h2>
        {/* Input fields for email and password */}
        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email address"
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
        {/* Submit button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Log In
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up here
          </span>
        </p>
      </form>
    </section>
  );
}

export default Login;
