import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessesAndRefreshToken=async(userId)=>{
  try {
    const user=await User.findById(userId)
    const accessToken=user.generateAccessesToken()
    const refreshToken=user.generateRefreshToken()   
    
    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})

    return{accessToken,refreshToken}
  } catch (error) {
    throw new ApiError(500,"somethinh")
    
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  // 1️⃣ Validate fields
  if ([fullName, email, username, password].some(field => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // 2️⃣ Check existing user
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  console.log(req.files);

  // 3️⃣ Safe file handling (FILES OPTIONAL)
  const avatarLocalPath = req.files?.avatar?.[0]?.path || null;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path || null;

  let avatarUrl = "";
  let coverImageUrl = "";

  if (avatarLocalPath) {
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    avatarUrl = avatar?.url || "";
  }

  if (coverImageLocalPath) {
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    coverImageUrl = coverImage?.url || "";
  }

  // 4️⃣ Create user
  const user = await User.create({
    fullName,
    avatar: avatarUrl,
    coverImage: coverImageUrl,
    email,
    password,
    username: username.toLowerCase(),
  });

  // 5️⃣ Remove sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );
});

const loginUser=asyncHandler(async(req,res)=>{
  const {email,username,password}=req.body
  if(!(username||email)){
    throw new ApiError(400,"username or email is req")
  }
  const user=await User.findOne({
    $or:[{username},{email}]
  });
  if(!user){
  throw new ApiError(404,"user does not exist")
  }

  const isPasswordValid=await user.isPasswordCorrect(password)

  if(!isPasswordValid){
    throw new ApiError(401,"invalid user credentials")
  }

  const {accessToken,refreshToken}=await generateAccessesAndRefreshToken(user._id)


  const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

  const options={
    httpOnly:true,
    secure:true
  }

  return res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},
      "user hogaya"
    )
  )


})

const logoutUser=asyncHandler(async(req,res)=>{
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        refreshToken:undefined
      }
    },
    {
      new:true
    }
  )
  const options={
    httpOnly:ViewTransitionTypeSet,
    secure:true
  }
  return res
  .status(200)
  .clearCookie("accessToken")
  .clearCookie("refreshToken")
  
})

export { registerUser ,loginUser,logoutUser};
