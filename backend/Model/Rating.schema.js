import mongoose from "mongoose";

const RatingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property",
        required:true
    },
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
        required:true
    },
    rating:{
        type:Number,
        required:true,
        max:5
    },
    comment:{
        type:String
    }
},{timestamps:true})

const Rating=mongoose.model("Rating",RatingSchema)

export default Rating