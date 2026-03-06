const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config()


//SubSection handler

const createSubsection = async (req,res)=>{
    try {
        //fetch data from Req body
        const {title,description,sectionId,timeDuration} = req.body;

        //extract file/video
        const video = req.files.videoFile;

        //validation
        if(!title || !description || !sectionId || !timeDuration || !video){
                return res.status(400).json({
                    success:false,
                    message:"All fields are required"
                })
        }

        //upload video to cloudinary
        const uploadDetails= await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const secure_url = uploadDetails.secure_url;

        //create a sub-Section
        const subSectionDetails =  await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:secure_url
        })
        //update section with this sub section ObjectId
        const updatedSection =await Section.findById(sectionId,{
            $push: {SubSection:subSectionDetails._id}
        },{returnDocument:"after"})
        //HW: log updated section here, after adding populate query


        //return response
        return res.status(200).json({
            success:true,
            message:"Sub-section Created successfully",
            updatedSection
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to created sub-section"
        })
    }
}

//HW: UpdateSubSection 

//HW: delete SubSection