import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import {connectDB} from "./db/index.js"
// require('dotenv').config({path:'./env'})

import dotenv from "dotenv"

dotenv.config({
    path:'./env'
})
connectDB().then(()=>{application.listen(process.env.PORT),()=>{console.log("RUNING AT",process.env.PORT)}})
.catch((err)=>{
    console.log("err",err)
})






/*
import express from "express";
const app=express()
(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("error",error)
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is listening ${process.env.PORT}`);
        })

        
    } catch (error) {
        console.error("Error",error)
        throw error
        
    }
})
*/