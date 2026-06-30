import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';//file system[read, write, delete files from your server]

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const Uploadfile = async (localfilePath) => {
    try {
        if(!localfilePath) return null;
        //upload file to cloudinary
        const result = await cloudinary.uploader.upload(localfilePath, {
            resource_type: 'auto', // This will automatically detect the file type (image, video, etc.)
        });
        console.log('File uploaded to Cloudinary:', result.url);
        return result;
    } catch (error) {
        fs.unlinkSync(localfilePath); // Delete the local file if upload fails
        return null;
    }
};

export { Uploadfile };


export default cloudinary;