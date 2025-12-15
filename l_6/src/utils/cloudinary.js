import {v2 as cloudinary} from 'cloudinary';

import fs from 'fs'
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRE,
})

const uplodeOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        console.log(`file is uploded ${response.url}`);
        return response;
        
    } catch (error) {
        fs.unlink(localFilePath)
        
    }
}

const uploadResult=await cloudinary.uploader
.upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',{
        public_id:''
    }
)
