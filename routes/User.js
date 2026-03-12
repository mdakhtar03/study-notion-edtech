const express = require("express")

const router = express.Router();

const {signUp,changePassword,login,sendOTP} = require("../controllers/Auth")
const {resetPasswordToken,resetPassword} = require("../controllers/ResetPassword")
const {auth} = require("../middleware/auth")

//Authentication routes

//Route for signUp
router.post("/signup",signUp)

//Route for login
router.post("/login",login)

//Route for sending OTP
router.post("/sendotp",sendOTP)

//Route for changing the password
router.post("/changepassword",auth,changePassword)



//route that generate reset password token
router.post("/reset-password-token",resetPasswordToken)

//route for reset the password
router.post("/reset-password",resetPassword)

module.exports = router;