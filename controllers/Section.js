const Section = require("../models/Section")
const Course = require("../models/Course")
const SubSection = require("../models/SubSection")

exports.createSection = async (req, res)=>{
    try {
        //data fetch
        const {sectionName,courseId} = req.body;
        
        //data validation
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:"All fields are require"
            })
        }
        //create section
        const newSection = await Section.create({sectionName:sectionName})

        //push section it to Course Course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{
            $push: {courseContent:newSection._id}
        }, {returnDocument:"after"})

        //return response
        return res.status(200).json({
            success:true,
            message:"Section created Successfully",
            updatedCourseDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to create Section",
            error:error
        })
    }
}

exports.updateSection = async (req, res) =>{
    try {
        //data input
        const {sectionName, sectionId} = req.body

        //data validation
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success:false,
                message:"All fields are require"
            })
        }
        
        //update data
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{returnDocument:"after"})
        
        //return response
        return res.status(200).json({
            success:true,
            message:"Section Updated section updated successfull",
            updatedSection
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to update Section",
            error
        })
    }
}

exports.deleteSection = async (req,res)=>{
    try {

        //fetch data 
        const {sectionId}=req.params
        const {courseId} = req.body

        //validation
        if(!sectionId || !courseId){
            return res.status(400).json({
            success:false,
            message:"Id is missing",
            })
        }

        // first delete all subsection
        // const section = await Section.findById(sectionId)
        // await SubSection.deleteMany({
        // _id: { $in: section.SubSection }
        //     });


        //delete then delete section
        await Section.findByIdAndDelete(sectionId)


        //TODO  this will be check in testing
        //pull Id from course collection 

        // await Course.findByIdAndUpdate(courseId,{
        //     $pull:{courseContent:sectionId}
        // }, {returnDocument:"after"})

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to delete section"
        })
    }
}