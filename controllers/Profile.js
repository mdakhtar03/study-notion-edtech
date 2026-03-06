const Course = require("../models/Course");
const Profile  = require("../models/Profile")
const User = require("../models/User")


exports.updateProfile = async (req,res)=>{
    try {
        //get data
        const {dateOfBirth="",about="",contactNumber,gender}= req.body

        //get userId
        const id = req.user.id;

        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId =  userDetails.additionalDetails;

        //update profile
        const profileDetails = await Profile.findById(profileId)
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save()

        // await Profile.findByIdAndUpdate(profileId,{gender,dateOfBirth,about,contactNumber},{runValidators:true})

        //return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

//Delete Account

exports.deleteAccount = async (req,res)=>{
    try {
        //get id
        const id = req.user.id
        //Check for valid ?
        const userDetails = await User.findById(id)
        if(!userDetails)
        {
            return res.status(404).json({
                success:false,
                message:"User Does not exits"
            })
        }

        //delete profile
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileId)

        // delete from Enrolled Course
        await Course.updateMany({studentEnrolled:id},{
            $pull :{studentEnrolled:id}
        })
        // delete user
        await User.findByIdAndDelete(id);

        //return response
        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

//get All user details


exports.getAllUserDetails = async (req,res)=>{
    try {
        //data id 
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").populate("courses").exec()
        //validation
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        res.status(200).json({
            success:true,
            userDetails:userDetails
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}