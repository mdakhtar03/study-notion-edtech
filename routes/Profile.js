const express = require("express")
const router = express.Router()

const {updateProfile,deleteAccount,
    getAllUserDetails,updateDisplayPicture,
    getEnrolledCourse} = require("../controllers/Profile")

const {auth,isAdmin,isInstructor,isStudent} = require("../middleware/auth")

router.put("/updateProfile",auth,updateProfile);
router.delete("/deleteProfile",auth,deleteAccount)
router.get("/getUserDetails",auth,getAllUserDetails)
router.put("/updateDisplayPicture",auth,updateDisplayPicture)
router.get("/getuserdetails",auth,getAllUserDetails)

module.exports = router