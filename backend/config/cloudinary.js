import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadOnCloudinary = async (filePath) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  if (!filePath) {
    return null;
  }
  try {
    const result = await cloudinary.uploader.upload(filePath);

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return result?.secure_url;
  } catch (error) {
    console.log(error);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};
