import jwt from 'jsonwebtoken'
import User from '../Model/User.schema.js'

export const isAuthenticated=async(req,res,next)=>{
    try {
        const token =req?.cookies?.jwt

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Unauthorized"
            })
        }


        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)

        if(!decodedToken){
            return res.status(400).json({
                success:false,
                message:"Unauthorized-Invalid token"
            })
        }

        const user =await User.findById(decodedToken.id).select("-password")

        req.user=user;

        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`isAuthenticated: ${error.message}`
        })
    }
}