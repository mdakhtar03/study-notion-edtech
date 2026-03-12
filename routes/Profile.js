const express = require("express")
const router = express.Router()

const {updateProfile,deleteAccount,
    getAllUserDetails,updateDisplayPicture,
    getEnrolledCourse} = require("../controllers/Profile")

const {auth,isAdmin,isInstructor,isStudent} = require("../middleware/auth")

router.put("/updateprofile",auth,updateProfile);
router.delete("/deleteprofile",auth,deleteAccount)
router.get("/getalluserdetails",auth,getAllUserDetails)
router.put("/updatedisplayprofile",auth,updateDisplayPicture)
router.get("/getuserdetails",auth,getAllUserDetails)

module.exports = router