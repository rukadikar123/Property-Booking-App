import { uploadOnCloudinary } from "../config/cloudinary.js";
import Property from "../Model/Listing.schema.js";

export const getpropertyList = async (req, res) => {
  try {
    const listOfProperty = await Property.find().populate("host", "-password");

    if (!listOfProperty || listOfProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Property found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Properties fetched successfully",
      data: listOfProperty,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getpropertyList: ${error.message}`,
    });
  }
};

export const getProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id).populate("host", "-password");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "No Property found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property fetched successfully",
      data: property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getProperty: ${error.message}`,
    });
  }
};

export const addProperty = async (req, res) => {
  try {
    if (!req.user.isHost) {
      return res.status(400).json({
        success: false,
        message: "To add property need to become host first",
      });
    }

    const { title, description, location, price } = req.body;

    if (!title || !description || !location || !price) {
      return res.status(400).json({
        success: false,
        message: "all fields required",
      });
    }

    let imageURLs = [];

    for (let file of req?.files) {
      let url = await uploadOnCloudinary(file?.path);
      if (url) {
        imageURLs.push(url);
      }
    }
    if (imageURLs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const property = await Property.create({
      title,
      description,
      location,
      price,
      images: imageURLs,
      host: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `addProperty: ${error.message}`,
    });
  }
};
