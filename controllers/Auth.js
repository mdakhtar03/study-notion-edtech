const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")

//sendOTP
exports.sendOTP = async (req,res)=>{
    try {
         //Fetch email from req Body
        const {email} = req.body;

        //Check that user already exist 
        const checkUserPresent = await User.findOne({email});

        // if user already exist => return a response
        if(checkUserPresent){
            return res.status(401).json({
            success:false,
            message:'User already exist',
            })
        }
        
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated ",otp);
        //check unique OTP or Not
        
    } catch (error) {
        
        }
}

//signUp

//Login

//changePassword