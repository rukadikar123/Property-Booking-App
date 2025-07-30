import mongoose from "mongoose";

const WishlistSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property",
        required:true
    }

},{timestamps:true})

const Wishlist=mongoose.model("Wishlist",WishlistSchema)

export default Wishlist