import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    watchHistory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"

    },
    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,

    },
    emai:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullName:{
        type:String,
         require:true,
        lowercase:true,
        trim:true,
        index:true,

    },
    avatar:{
        type:String,
        require:true,
        unique:true,
    },
    coverImage:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"req"]
    },
    refreshToken:{
        type:String,
    },
    






},{timestamps:true})

userSchema.pre("save",async function(next) {
    if(this.isModified("passwoed")) return next();
    this.password=bcrypt.hask(this.password,10)
    next()
})

userSchema.methods.isPasswordCorreect=async function(passwoed){
    return await bcrypt.compare(passwoed,this.passwoed)
}
userSchema.methods.generateAccessToken=function(){
     return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullName,
    },
    {
      process.env.ACCESS_TOKEN_SECRET,
    },{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRE
    })

}

userSchema.method.generateRefreshToken=function(){
   return jwt.sign({
        _id:this._id,
        
    },
    {
      process.env.REFRESH_TOKEN_SECRET,
    },{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRE
    }) 
}


export const User=mongoose.model("User",userSchema)