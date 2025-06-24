import { createSlice } from "@reduxjs/toolkit";

const propertySlice=createSlice({
    name:"property",
    initialState:{
        properties:null
    },
    reducers:{
        setProperties:(state,action)=>{
            state.properties=action.payload
        }
    }
})

export const {setProperties}=propertySlice.actions

export default propertySlice.reducer