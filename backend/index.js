import express from 'express'
import dotenv from 'dotenv'
import { MongodbConnect } from './config/MongoDbConnect.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app=express();

dotenv.config()


app.use(cors({
    origin:"http://localhost:5173",
    Credential:true
}))
app.use(cookieParser())




const port =process.env.PORT || 5000

app.listen(port,()=>{
    MongodbConnect()
    console.log(`server is running on port ${port}`);
    
})