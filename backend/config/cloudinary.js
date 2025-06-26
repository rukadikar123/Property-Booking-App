import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Utility function to upload a file to Cloudinary and return its secure URL
export const uploadOnCloudinary = async (filePath) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  // If no file path is provided, return null
  if (!filePath) {
    return null;
  }
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath);

    //  After upload, delete the local file from server
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    //  Return the secure URL of the uploaded image
    return result?.secure_url;
  } catch (error) {
    console.log(error);
    //  In case of error, still delete the local file to clean up
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};
