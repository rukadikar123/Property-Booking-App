import express from 'express'
import dotenv from 'dotenv'
import { MongodbConnect } from './config/MongoDbConnect.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './Routes/auth.routes.js'
import listingRoutes from './Routes/listing.routes.js'
import bookingRoutes from './Routes/booking.routes.js'


const app=express();

dotenv.config()

MongodbConnect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"https://property-booking-app-frontend.onrender.com",
    credentials:true
}))
app.use(cookieParser())


// Routes

app.use("/api/auth",authRoutes)
app.use("/api/listing",listingRoutes)
app.use("/api/booking",bookingRoutes)


import './cron.js';

const port =process.env.PORT || 5000

app.listen(port,()=>{
    
    console.log(`server is running on port ${port}`);
    
})