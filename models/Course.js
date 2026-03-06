const mongoose = require("mongoose")


const courseSchema = new mongoose.Schema({
   courseName:{
    type:String,
    required:true,
   },
   courseDescription:{
    type:String,
    required:true,
   },
   instructor:{
    type:String,
    required:true,
   },
   whatYouWillLearn:{
    type:String,
    required:true,
   },
   courseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
   }],
   ratingAndReviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReviews"
   }],
   price:{
    type:Number,
   },
   thumbnail:{
    type:String
   },
   category:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Category"
   },
   studentEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   }]
}) 

module.exports = mongoose.model("Course",courseSchema)