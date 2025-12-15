import mongoose from "mongoose"
import { DB_NAME } from "../constants"

const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected ${connectionInstance.connection.host} `)
        
    } catch (error) {
        console.log("MONGOB connection err",error);

        process.exit(1)
        
    }


}

export default connectDB

