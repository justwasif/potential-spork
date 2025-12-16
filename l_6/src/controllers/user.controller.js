import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uplodeOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"






const registerUser=asyncHandler(async(req,res)=>{

    const {fullname,email,username,password}=req.body
    console.log("email",email);


    // if(fullname===""){
    //     throw new ApiError(400,"fullname is req")
    // }
    if (
        [fullname,email,username,password].some((fields)=>fields?.trim()=="")
    ) {
        throw new ApiError(400,"all field are come")
        
    }
    const existedUser=User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exist")
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.file?.coverImage[0]?.path;

    if (!avatarLocalPath){
        throw new ApiError(400,"avatar file ")
    }
    if (!coverImageLocalPath){
        throw new ApiError(400,"Avatar not" )
    }
    const avatar=await uplodeOnCloudinary(avatarLocalPath)
    const coverImage=await uplodeOnCloudinary(coverImageLocalPath)

    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url ||"",
        email,
        password,
        username:username.toLowerCase(),

    })
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"well fffffffff we dont know ")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User hogaya")
    )
})
export {registerUser}