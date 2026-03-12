const mongoose = require("mongoose");
const mailSender = require("../utils/mailsender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate")

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires: 3*60
    }
});

//funtion -> to send emails

async function sendVerificationEmail(email,otp){
    try {
        const mailRepose = await mailSender(email,"Verification Email from Study Notion",
            emailTemplate(otp)
        )
        console.log("Email Send successfully: ", mailRepose);

    } catch (error) {
        console.log("error accured while sending the mail :", error)
        throw error;
    }
}

OTPSchema.pre("save", async function(){
    console.log("New Document saved to database")
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    
})
module.exports = mongoose.model("OTP",OTPSchema)