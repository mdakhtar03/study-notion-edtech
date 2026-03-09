
const mailSender = require("../utils/mailsender");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User")
const {courseEnrollment} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


//Capture the payment and initiate the Razorpay order

exports.capturePayment = async (req,res)=>{
    try {
        //get courseId and userId
        const {course_Id} = req.body;
        const userId = req.user.id;
        //validation
        if(!course_Id)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid course id"
            })
        }

        //validate course id
        const course = await Course.findById(course_Id)
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course Not found"
            })
        }
        //user already pay for course
        const uid = new mongoose.Types.ObjectId(userId) //-> convert user Id string type to objectId
        
        if(course.studentEnrolled.includes(uid))
            {
                return res.status(200).json({
                    success:false,
                    message:"Student is already Purchase the code"
                })
            } 
        //order create
        const amount = Course.price
        const currency = "INR"
        const option = {
            amount: amount*100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId: course_Id,
                userId
            }
        }
        //Funtion call for start order
        try {
            //initiate the payment
            const paymentResponse = await instance.orders.create(option)
            console.log(paymentResponse)

            return res.status(200).json({
                success:true,
                courseName: course,courseName,
                courseDescription : course.courseDescription,
                thumbnail:course.thumbnail,
                orderId: paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount,
            })

        } catch (error) {
            console.log(error)
            return res.json({
                success:false,
                message:"Could not initiate order"
            })
        }




    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

//verify signature of Razorpay and server
exports.verifySignature = async (req, res)=>{
    try {
        // match server secret and payment secret 
        const webhookSecret = "12345678"

        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256",webhookSecret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest("hex")

        if(signature === digest){
            console.log("Payment is authorized")
            
            //entroll student to the course
            const {courseId,userId} = req.body.payload.payment.entity.notes;
            try {
                const enrolledCourse = await Course.findByIdAndUpdate(courseId,{
                    $push: {studentEnrolled:userId}
                },{new:true})

                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message:"Course not found"
                    })
                }
                console.log(enrolledCourse)
                //find the student and add course to their list enrolled
                const enrolledStudent = await User.findByIdAndUpdate(userId,
                    {$push:{courses:courseId}},{new:true}
                )
                console.log(enrolled)

                //send mail for confirmation
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    "Congratulations, from StudyNotion",
                    "Congratulations, you are onboarded into new StudyNotion"
                )
                console.log(emailResponse)
                return res.status(200).json({
                    success:true,
                    message:"signature verified and course Added"
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:error.message
                })
            }
        }

        else{
            return res.status(400).json({
                success:false,
                message:"Invalid request"
            })
        }
    } catch (error) {
        console.log(error);
                return res.status(500).json({
                    success:false,
                    message:error.message
                })
    }
}