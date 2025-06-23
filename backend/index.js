import express from 'express'
import dotenv from 'dotenv'
import { MongodbConnect } from './config/MongoDbConnect.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './Routes/auth.routes.js'

const app=express();

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())


// Routes

app.use("/api/auth",authRoutes)



const port =process.env.PORT || 5000

app.listen(port,()=>{
    MongodbConnect()
    console.log(`server is running on port ${port}`);
    
})