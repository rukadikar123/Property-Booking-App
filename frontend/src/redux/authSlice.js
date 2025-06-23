import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        loading:true
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setLogout:(state)=>{
            state.user=null
        }
    }

})

export const {setUser,setLoading, setLogout}=authSlice.actions
export default authSlice.reducer