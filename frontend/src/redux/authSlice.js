import { createSlice } from "@reduxjs/toolkit";

// Authentication slice for managing user state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Holds the current logged-in user
    loading: true, // Used to manage global loading state
  },
  reducers: {
    // Sets the user data in state
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Sets the loading status
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Clears user data (on logout)
    setLogout: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setUser, setLoading, setLogout } = authSlice.actions;
// Export reducer
export default authSlice.reducer;
