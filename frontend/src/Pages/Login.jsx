import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

function Login() {
     const [form, setForm] = useState({ email: "", password: "" });
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit=async (e)=>{
           e.preventDefault();
        try {
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,form,{withCredentials:true})
            dispatch(setUser(res?.data?.user))
        } catch (error) {
            console.log(error);
            
        }
      }
  return (
 <div className="flex justify-center items-center h-[90vh] bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-3 p-2 w-full border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-3 p-2 w-full border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Log In
        </button>
        <p className="mt-4">
          Already have an Account{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>  )
}

export default Login