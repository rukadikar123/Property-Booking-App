import mongoose from "mongoose";

export const MongodbConnect=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`).then(()=>{
            console.log("MongoDb connected");
            
        })
    } catch (error) {
        console.log("mongoDb connect error",error);
        
    }
}