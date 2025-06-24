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

    const {id}=req.params;

    const property=await Property.findById(id).populate("host","-password")

    if(!property){
        return res.status(404).json({
        success: false,
        message: "No Property found",
      });
    }

    return res.status(200).json({
        success:true,
        message:"Property fetched successfully",
        data:property
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getProperty: ${error.message}`,
    });
  }
};
