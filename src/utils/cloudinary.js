import { v2 as cloudinary} from "cloudinary";
import fs from "fs"; // file system of node js to provide file handling
cloudinary.config({
    cloud_name :process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})
const uploadOnCloudinary = async (localFilePath) => {
    // console.log(localFilePath)
    try {
        if(!localFilePath)return null
        //upload the file 
       const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        
        //file has been uploaded successfully
        console.log("file uploaded successfully");
        // console.log(res.url)
        fs.unlinkSync(localFilePath) // removes the locally saved temporary file as the upload operation got failed
        return res
    } catch (error) {

        console.log(error)
        // what if exception appears
        fs.unlinkSync(localFilePath) // removes the locally saved temporary file as the upload operation got failed
        return null
    }
}

export {uploadOnCloudinary}


