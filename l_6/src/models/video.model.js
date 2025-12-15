import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const videoSchema=new mongoose.Schema({
    videoFile:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    title:{
        type:String,
    },
    descripition:{
        type:String
    },
    duraton:{
        type:Number,
    },
    views:{
        type:Number,
    },
    isPublished:{
        type:Boolean,
    }
},{timestamps:true})



export const Video=mongoose.model("Video",videoSchema)