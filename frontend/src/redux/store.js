import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import propertyReducer from './propertySlice'

// Configuring Redux store and combining slices
const store=configureStore({
    reducer:{
        auth:authReducer,        // Manages authentication state
        property:propertyReducer    // Manages property listings state
    }
})

export default store;