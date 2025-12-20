import { Router } from "express";
import {registerUser,loginUser, logoutUser,refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory} from "../controllers/user.controller.js"
import {uplod} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router=Router()

router.route("/register").post(
    uplod.fields([
        {
            name:"avatar",
            maxCount:1,
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)









router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,logoutUser)
router.report("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)
router.route("avatar").patch(verifyJWT,uplod.single("avatar"),updateUserAvatar)
router.route("/coverImage").patch(verifyJWT,uplod.single("coverImage",updateUserCoverImage))
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)//: c dono imp hai
router.route("/history").get(verifyJWT,getWatchHistory)




export default router