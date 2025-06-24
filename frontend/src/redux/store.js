import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import propertyReducer from './propertySlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        property:propertyReducer
    }
})

export default store;