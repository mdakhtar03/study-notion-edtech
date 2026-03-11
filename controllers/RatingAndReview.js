const RatingAndReviews = require("../models/RatingAndReviews")
const Course = require("../models/Course")

exports.RatingAndReviews = async (req,res)=>{
    try {

        //get user id
        const userId = req.body.id;

        //fetchdata from req body
        const {rating, review, courseId}= req.body;
        
        //check if user is enrolled or not
        const isUserExist = await Course.findOne({_id:courseId,studentEnrolled:{$elemMatch: {$eq:userId}}});
        if(!isUserExist)
        {
            return res.status(404).json({
            success:false,
            message:"User Not Exist in the Course"
        })
        }

        //check if user already reviewed the course
        const isUserReviewed = await RatingAndReviews.findById(userId)
        if(isUserReviewed)
        {
            return res.status(403).json({
            success:false,
            message:"User already reviewed the course"
        })
        }

        //validation 
         if(!rating || !review || !courseId)
        {
            return res.status(401).json({
                success:false,
                message:"Kindly fill all the details"
            })
        }
        //create rating and review
        const createdRatingAndReview = await RatingAndReviews.create({user:userId,
                                       rating:rating,
                                       review:review})
        

        if(!createdRatingAndReview)
        {
            return res.status(401).json({
                success:false,
                message:"Fail to create Rating And Review"
            })
        }
        //update course with this rating/review
        const addRatingAndReviewInCourse = await Course.findByIdAndUpdate(courseId,
                                        {$push:{ratingAndReviews:createdRatingAndReview._id}},{new:true})

        //return response
         return res.status(200).json({
            success:true,
            message:"Rating and review created",
            createdRatingAndReview:createdRatingAndReview
        })
                                        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to create Rating and Review"
        })
    }
}


//find all rating and review

exports.allRatingAndReview = async (req,res)=>{
    try {
        //find all rating
        const allRating = await RatingAndReviews.find({})
                                            .sort({rating:'desc'})
                                            .populate({path:"user",
                                                select:"firstName lastName email image"})
                                            .populate({
                                                path:"course",
                                                select:"courseName"
                                            }).exec()
        
                                            
        if(!allRating)
        {
            return res.status(404).json({
            success:false,
            message:"Rating Not Found"
        })}

         return res.status(200).json({
            success:true,
            message:"All Rating",
            allRating:allRating
        })


    } catch (error) {
         return res.status(500).json({
            success:false,
            message:"Failed to get Rating"
        })
    }
}

exports.getAverageRating = async (req,res)=>{
    try {

        const {courseId} = req.body;
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{_id:null, averageRating:{$avg:"$rating"}}
            }
        ])

         if(result.length === 0)
        {
            return res.status(404).json({
            success:false,
            message:"Rating Not Found"
        })}
       

        
        return res.status(200).json({
            success:true,
            message:"AVG Rating rating",
            averageRating:result[0].averageRating,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
    