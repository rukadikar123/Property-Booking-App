import { uploadOnCloudinary } from "../config/cloudinary.js";
import Property from "../Model/Listing.schema.js";

export const getpropertyList = async (req, res) => {
  try {
    // Fetch all properties from the database and populate the 'host' field (excluding password)
    const listOfProperty = await Property.find().populate("host", "-password");

    // Check if no properties are found
    if (!listOfProperty || listOfProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Property found",
      });
    }
    // Send success response with the list of properties
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
    const { id } = req.params; // Extract property ID from the request URL parameters
    // Find the property by ID and populate the 'host' field (excluding password)
    const property = await Property.findById(id).populate("host", "-password");

    // If property not found, return 404
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "No Property found",
      });
    }

    // If found, return success response with property data
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
    // Check if the user is a host
    if (!req.user.isHost) {
      return res.status(400).json({
        success: false,
        message: "To add property need to become host first",
      });
    }

    // Destructure required fields from request body
    const { title, description, location, price } = req.body;

    // Validate required fields
    if (!title || !description || !location || !price) {
      return res.status(400).json({
        success: false,
        message: "all fields required",
      });
    }

    let imageURLs = [];

    // Upload each file to Cloudinary and store the secure URLs
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

    // Create the property entry in the database
    const property = await Property.create({
      title,
      description,
      location,
      price,
      images: imageURLs,
      host: req.user._id,
    });

    // Return successful response
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

export const getSearchProperty=async(req,res)=>{
  try {
    const {query}=req.query

    if(!query){
      return res.status(400).json({
        success:false,
        message:"Query is required"
      })
    }

    const SearchedDestinations=await Property.find({
      location:{$regex:query, $options:"i"},
    })

    if(SearchedDestinations.length===0){
      return res.status(404).json({
        success:false,
        message:"No Destination found"
      })
    }

    return res.status(200).json({
      success:true,
      message:"data fetched successfully",
      SearchedDestinations
    })
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: `getSearchProperty: ${error.message}`,
    });
  }
}