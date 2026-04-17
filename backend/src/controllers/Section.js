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

        //push section it to Course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{
            $push: {courseContent:newSection._id}
        }, {new:true}).populate({path:"courseContent", populate:{path:"SubSection"}}).exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Section created Successfully",
            data:updatedCourseDetails
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
        const {sectionName, sectionId, courseId} = req.body

        //data validation
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success:false,
                message:"All fields are require"
            })
        }
        
        //update data
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true})
        
        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"SubSection"
            },
        })
        //return response
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
            data:course
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
        const {sectionId, courseId} = req.body;
        await Course.findOneAndUpdate( { _id: courseId },{
            $pull:{ courseContent : sectionId}
        })
        const section = await Section.findById(sectionId)
        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section Not Found"
            })
        }
        await SubSection.deleteMany({ _id: {$in : section.SubSection}});
        await Section.findByIdAndDelete(sectionId);
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path: "SubSection"
            }
        }).exec()

        res.status(200).json({
            success:true,
            message:"Section deleted",
            data:course
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to delete section"
        })
    }
}