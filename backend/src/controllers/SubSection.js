const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const { uploadImageToCloudinary, deleteAsset } = require("../utils/imageUploader");
require("dotenv").config()


//SubSection handler

exports.createSubsection = async (req,res)=>{
    try {
        //fetch data from Req body
        const {title,description,sectionId} = req.body;

        //extract file/video
        const video = req.files.video;

        //validation
        if(!title || !description || !sectionId || !video){
                return res.status(400).json({
                    success:false,
                    message:"All fields are required"
                })
        }

        //upload video to cloudinary
        const uploadDetails= await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const secureUrl = uploadDetails.secure_url;
        const publicId = uploadDetails.public_id;

        //create a sub-Section
        const subSectionDetails =  await SubSection.create({
            title:title,
            timeDuration:uploadDetails.duration,
            description:description,
            videoUrl:secureUrl,
            publicId:publicId
        })
        //update section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            $push: {SubSection:subSectionDetails._id}
        },{returnDocument:"after"}).populate("SubSection").exec()
        //HW: log updated section here, after adding populate query


        //return response
        return res.status(200).json({
            success:true,
            message:"Sub-section Created successfully",
            data:updatedSection
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to created sub-section"
        })
    }
}

//HW: UpdateSubSection 


exports.updateSubSection = async (req,res)=>{
    try {
        //fetch data
        const {title,description,subSectionId,sectionId} = req.body;

        //validation
        if(!title || !description  || !subSectionId){
            return res.status(400).json({
                success:false,
                message:"Please Enter All fields"
            })
        }
       const subSection = await SubSection.findById(subSectionId)
       if(!subSection){
        return res.status(404).json({
            success:false,
            message: "SubSection is Not Found"
        })
       }
        //update
        if(title !== undefined){
            SubSection.title = title
        }
        if(description !== undefined){
            SubSection.description = description
        }
        if(req.files && req.files.video !== undefined){
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = uploadDetails.duration
        }
        
        await subSection.save()
            //return
            const  updatedSection = Section.findById(sectionId).populate("SubSection")
            return res.status(200).json({
                success:true,
                message:"Section Updated Successfully",
                data:updatedSection
            })
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:"An error occured while updating the section"
      })  
    }
}


//HW: delete SubSection

exports.deleteSubSection = async (req,res)=>{
    try {
        //fetch id of section and SubSection
        const {subSectionId,sectionId} = req.body;

        //Validation
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                    success:false,
                    message:"Please Enter All fields"
                })
        }
        //delete video file from cloudinary
        const subSectionDetails = await SubSection.findById(subSectionId);
        const publicId =  subSectionDetails.publicId;
        const result = await deleteAsset(publicId);
        
        //delete from database
        await SubSection.findByIdAndDelete(subSectionId)

        await Section.findByIdAndUpdate(sectionId,{
            $pull:{SubSection:subSectionId}
        })
        const  updatedSection = Section.findById(sectionId).populate("SubSection")
        return res.status(200).json({
            success:true,
            message:"Successfully Deleted",
            data:updatedSection
        })

    } catch (error) {
        return res.status(500).json({
        success:false,
        message:error.message
      })  
    }
}