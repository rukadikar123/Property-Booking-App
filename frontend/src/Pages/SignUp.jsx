import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setLoading, setUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

function SignUp() {
 const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit=async (e)=>{
       e.preventDefault();
    try {
        const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`,form,{withCredentials:true})
        console.log(res);
        dispatch(setUser(res?.data?.user))
        dispatch(setLoading(false))
        navigate('/listing')
        
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false))
        
    }
  }

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <input
          name="fullname"
          type="text"
          placeholder="Fullname"
          value={form.fullname}
          onChange={handleChange}
          className="mb-3 p-2 w-full border rounded"
          required
        />
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
          Create Account
        </button>
        <p className='mt-4'>Already have an Account <span className='text-blue-400 cursor-pointer' onClick={()=>navigate('/login')}>Login</span></p>
      </form>
    </div>
  )
}

export default SignUp