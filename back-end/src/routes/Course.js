const express = require("express")

const router = express.Router();

//course controller
const {createCourse,getAllCourses,getCourseDetails} = require("../controllers/Course")

//section
const {createSection,updateSection,deleteSection}= require("../controllers/Section")

//subSection
const {createSubsection,updateSubSection,deleteSubSection} = require("../controllers/SubSection")

//category
const {createCategory,showAllCategory,categoryPageDetails} = require("../controllers/Category")


//Rating and Reviews

const {createRating,allRatingAndReview,getAverageRating}  = require("../controllers/RatingAndReview")

//middleware
const {auth,isAdmin,isInstructor,isStudent} = require("../middleware/auth")

// ***********************************************************
//       Router for creating course Only is Instructors
// ***********************************************************
router.post("/createCourse",auth,isInstructor,createCourse)
//Router for createSection
router.post("/addSection" ,auth,isInstructor,createSection )
//Router for update the section
router.post("/updatesection",auth,isInstructor,updateSection)
//Router for deleteSection
router.post("/deleteSection", auth,isInstructor,deleteSection)
//Router for create Subsection
router.post("/addSubSection",auth,isInstructor,createSubsection)
//Router for updateSubsection
router.post("/updatesubsection",auth,isInstructor,updateSubSection)
//Router for delete SubSection
router.post("/deletesubsection",auth,isInstructor,deleteSubSection)
//Router for getAllcourses
router.get("/getallcourses",getAllCourses)
//router for getCourseDetails
router.post("/getCourseDetails",getCourseDetails)


// ********************************************************************************
//                          Category routes(only by Admin)
// ********************************************************************************

//Router for create category
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategory);
router.post("/getcategorypagedetails",categoryPageDetails)



// *********************************************************************
//                              Rating and Review
// *********************************************************************
router.post("/createrating",auth,isStudent,createRating)
router.get("/getreviews",allRatingAndReview)
router.get("/getAverageRating",getAverageRating)

module.exports = router;