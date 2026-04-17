const Course = require("../models/Course")
const Category = require("../models/Category")
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const mongoose = require("mongoose")
require("dotenv").config();

//create course handler function
exports.createCourse = async (req,res)=>{
    try{
      // fetch all data
      let {
              courseName, 
              courseDescription, 
              whatYouWillLearn, 
              price,
              tag,
              category,
              status,instructions} = req.body;
      
     
              console.log("BacEnd Request BODY ", req.body);
              console.log(" Backend Recived files",req.files);
    
      //validation 
      if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success:false,
                message:"Fill input Field"
            })
      }
      
      if(!status || status === undefined)
      {
        status = "Draft"
      }
     
      //check instructor
      
      const userId = req.user.id;
      const instructorDetails = await User.findById(userId,{accountType:"Instructor"});
     
      
      if(!instructorDetails){
        return res.status(404).json({
          success:false,
          message:"Instructor details not found"
        })
      }
      console.log("Instructor Details ", instructorDetails);

      //check given category is valid or not
      const ObjectId = mongoose.Types.ObjectId;
      const categoryId = new ObjectId(category)
      const categoryDetails = await Category.findById(categoryId)

      if(!categoryDetails){
         return res.status(404).json({
            success:false,
            message:"category not found"
        })
      }
      
      const thumbnail = req.files.thumbnail;
     
      //Upload image to cloudinary
      const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
       //get thumbnail

       tag = JSON.parse(tag);
       instructions = JSON.parse(instructions)
      //create an entry for new course
      const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor:instructorDetails._id,
        whatYouWillLearn:whatYouWillLearn,
        price,
        tag:tag,
        category:categoryDetails._id,
        thumbnail:thumbnailImage.secure_url,
        status:status,
        instructions:instructions,
      })


        //add the new course schema of instructor
        await User.findByIdAndUpdate({_id: instructorDetails._id},{
          $push:{course: newCourse._id}
        },{returnDocument:"after"})


        //Update the category Schema
        await Category.findByIdAndUpdate(category,
          {
            $push:{
              course: newCourse._id
            }
          },
          {returnDocument:"after"}
        )


        console.log("New Course Created")
        return res.status(200).json({
          success:true,
          message:"Course Created Successfully",
          data:newCourse
        })

        
    }catch(error){
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"Failed to create course",

      })
    }
}

//getAllCourses handler function

exports.getAllCourses = async (req,res) =>{
  try {

    const allCourses = await Course.find({},
                                        {courseName:true,
                                          price:true,
                                          thumbnail:true,
                                          instructor:true,
                                          ratingAndReviews:true,
                                          studentEnrolled:true
                                        }
    ).populate("instructor").exec()

      return res.status(200).json({
        success:true,
        message:"data for all courses fetched successfully",
        data:allCourses
      })

  } catch (error) {
    console.error(error);
      return res.status(500).json({
        success:false,
        message:"Failed to fetch course data",
        error:error.message
      })
  }
}


//getCourseDetails
exports.getCourseDetails = async (req,res)=>{
  try {
    const {courseId} = req.body;

    //find course details
    const courseDetails = await Course.find(
              {_id:courseId},
              ).populate(
                {path:"instructor",
                populate:{path:"additionalDetails"}
              })
              .populate("category")
              .populate("ratingAndReviews")
              .populate({
                path:"courseContent",
                populate:{
                  path:"SubSection"
                }
              })
              .exec()

    //validation 
    if(!courseDetails)
    {
      return res.status(400).json({
        success:false,
        message:`Could not find the course with ${courseId}`
      })
    }
    return res.status(200).json({
      success:true,
      message:"Course Details fetched successfully",
      data:courseDetails
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Could not fetched details from give courseId",
      error:error
    })
  }
}