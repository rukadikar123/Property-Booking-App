import { createSlice } from "@reduxjs/toolkit";

// Property slice for managing listing data
const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: null, // Array of property listings
    wishlist: null,   // Stores the user's wishlist
  },
  reducers: {
    // Sets the list of properties
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    // Update the wishlist array in the state
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

// Export actions
export const { setProperties, setWishlist } = propertySlice.actions;
// Export reducer
export default propertySlice.reducer;
