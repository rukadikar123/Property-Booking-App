import Wishlist from "../Model/Wishlist.schema.js";

export const ToggleWishlist = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const { propertyId } = req.body;

    if(!propertyId){
      return res.status(400).json({
        success:false,
        message:"Property is required to add or remove"
      })
    }

    const existing = await Wishlist.findOne({
      user: userId,
      property: propertyId,
    });

    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Removed From Wishlist", 
        Wishlisted: false,
      });
    } else {
      await Wishlist.create({
        user: userId,
        property: propertyId,
      });

      return res.status(200).json({
        success:true,
        message:"Added to Wishlist successfully",
        Wishlisted:true
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `ToggleWishlist: ${error.message}`,
    });
  }
};


export const getAllWishlistItems=async(req,res)=>{
  try {
    const {_id:userId}=req.user

    if (!userId){
      return res.status(400).json({
        success:false,
        message:"Unauthorized. Please log in first."
      })
    }

    const wishlist=await Wishlist.find({user:userId}).populate("property")


    return res.status(200).json({
      success:true,
      message:"Wishlist fetched successfully.",
      wishlist
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getAllWishlistItems: ${error.message}`,
    });
  }
}