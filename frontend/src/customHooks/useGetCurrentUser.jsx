import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading, setUser } from '../redux/authSlice'

function useGetCurrentUser() {
  
    let dispatch=useDispatch()
    useEffect(() => {
       const fetchUser=async()=>{
        dispatch(setLoading(true))
        try {
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/current`,{withCredentials:true})
            console.log(res);
            dispatch(setUser(res?.data?.user))
            
        } catch (error) {
            console.log(error);
            dispatch(setUser(null))
            
        }finally{
            dispatch(setLoading(false))
        }
       }

       fetchUser();
    }, [])
    

}

export default useGetCurrentUser