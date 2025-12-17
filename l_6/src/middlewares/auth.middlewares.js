import { asyncHandler } from "../utils/asyncHandler";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import {User} from "../models/user.model";
import { ApiError } from "../utils/ApiError";



export const verifyJWt=asyncHandler(async(req,_,next)=>{
    try {
        const token=req.cookies?.accessToken ||req.header("Authorization")?.replace("Bearer","")

        if(!token){
            throw new ApiError(401,"unauthorized")
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        await User.findById(decodedToken?._id).
        select("-password -refreshToken")

        if(!user){
            throw new ApiError(401,"invalid")
        }
        req.user=user;
        next()
    } catch (error) {
        
    }
})