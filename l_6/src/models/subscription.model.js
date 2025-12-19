import mongoose, {Schema} from "mongoose";

const subscriptionSchema=new Schema({
    sunbscriber:{
        type:mongoose.Schema.Type.ObjectId,
        ref:"user",
        require:true,
    },
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    

},{timestamps:true})

export const Subscription=mongoose.model("Subscription",subscriptionSchema)
