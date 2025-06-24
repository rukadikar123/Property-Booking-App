import { generateToken } from "../config/generateToken.js"
import User from "../Model/User.schema.js"
import bcrypt from 'bcryptjs'

export const Signup=async(req,res)=>{
    try {
        const {fullname, email,password}=req.body

        if([fullname,email,password].some((item)=>item ==='')){
            return res.status(400).json({
                success:false,
                message:"all fields required"
            })
        }

        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({
                success:false,
                message:"User already exist please login"
            })
        }

        const hashedPassword=await bcrypt.hash(password,8)


        const user=await User.create({
            fullname,
            email,
            password:hashedPassword
        })

        const token=generateToken(user._id)

        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"None",
            secure:true,
            maxAge:4*24*60*60*1000
        })

        user.password=undefined

        return res.status(200).json({
            success:true,
            user,
            message:"user Created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Signup: ${error.message}`
        })
    }
}

export const Login=async(req,res)=>{
    try {
        const {email, password}=req.body;

        if([email,password].some((item)=>item ==='')){
            return res.status(400).json({
                success:false,
                message:"all fields required"
            })
        }

        const user=await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"email not exist"
            })
        }

        let comparedPassword=await bcrypt.compare(password,user.password)

        if(!comparedPassword){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            })
        }

        const token=generateToken(user._id)
        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"None",
            secure:true,
            maxAge:4*24*60*60*1000
        })
        
        user.password=undefined;

        return res.status(200).json({
            success:true,
            user,
            message:"User Logged in successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Login: ${error.message}`
        })
    }
    
}

export const Logout=async(req,res)=>{
    try {
        res.clearCookie("jwt",{
            httpOnly:true,
            sameSite:"None",
            secure:true,
        })

        res.status(200).json({
            success:true,
            message:"Logout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Logout: ${error.message}`
        })
    }
}


export const getCurrentUser=async(req,res)=>{
    try {
        const {user}=req

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        return res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`getCurrentUser: ${error.message}`
        })
    }
}

export const becomeHost=async(req,res)=>{
    try {
        const {isHost}=req.body

        if(!isHost){

            return res.status(400).json({
                success:false,
                message:"No field to update"
            })
        }

        const user=await User.findByIdAndUpdate(req.user._id,{
            isHost
        },{new:true }).select("-password")

        return res.status(200).json({
            success:true,
            message:"User updated successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`becomeHost: ${error.message}`
        })
    }
}