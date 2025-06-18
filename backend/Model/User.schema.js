import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    fullname:{
        type:String,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    } ,
    password:{
        type:String,
        required:true
    } ,
    profilepic:{
          type:String,
          default:""
    },
    isHost:{
        type:Boolean,
        default:false
    }


},{timestamps:true})


const User=mongoose.model("User",UserSchema)

export default User