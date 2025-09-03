import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";

// Custom hook to fetch the currently logged-in user
function useGetCurrentUser() {
  let dispatch = useDispatch();
  useEffect(() => {
    // Async function to fetch user data
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        // Make API call to fetch current user
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/current`,
          { withCredentials: true }
        );
        console.log("current user data",res);
        dispatch(setUser(res?.data?.user)); // Set user in Redux store
      } catch (error) {
        // console.log(error);
        dispatch(setUser(null)); // Clear user on error
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser(); // Call the async function when component mounts
  }, []);
}

export default useGetCurrentUser;
