import mongoose from "mongoose"
import Rating from "../Model/Rating.schema.js"
import Property from "../Model/Listing.schema.js"

export const updatePropertyRating=async(propertyId)=>{
        const result=await Rating.aggregate([
            {
                $match:{
                    property:new mongoose.Types.ObjectId(propertyId)
                },
            },
            {
                $group:{
                    _id:"$property",
                    averageRating:{$avg:"$rating"},
                    ratingCount:{$sum:1},
                },

            }
        ])

        if(result.length>0){
            await Property.findByIdAndUpdate(propertyId,{
                ratings:result[0].averageRating,
                ratingCount:result[0].ratingCount,
            })
        }else{
            await Property.findByIdAndUpdate(propertyId,{
                ratings:0,
                ratingCount:0,
            })
        }
}