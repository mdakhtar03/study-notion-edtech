const mailSender = require("../utils/mailsender")
exports.contactUs = async (req,res)=>{
    //fetch details
    const {firstName,lastName,email,number}= req.body;
    //validation
    if(!firstName||!lastName||!email||!number)
    {
        return res.status(401).json({
            success:false,
            message:"Input All the field"
        })
    }
    try {

    // send mail to user
    await mailSender(
      email,
      "Contact to StudyNotion",
      `<h2>Dear ${firstName}</h2>
       <p>Your request has been received.</p>
       <p>Our team will contact you soon.</p>`
    )

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully"
    })

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Error while sending mail"
    })
  }
}