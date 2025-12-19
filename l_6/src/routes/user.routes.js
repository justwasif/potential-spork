import { Router } from "express";
import {registerUser,loginUser, logoutUser} from "../controllers/user.controller.js"
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




export default router