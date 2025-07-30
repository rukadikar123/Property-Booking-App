import { createSlice } from "@reduxjs/toolkit";

// Property slice for managing listing data
const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: null, // Array of property listings
    wishlist: null,
  },
  reducers: {
    // Sets the list of properties
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

// Export actions
export const { setProperties, setWishlist } = propertySlice.actions;
// Export reducer
export default propertySlice.reducer;
