const express = require("express")
const router = express.Router()

const {capturePayment,verifySignature} = require("../controllers/Payments")
const {auth,isInstructor,isAdmin,isStudent} = require("../middleware/auth")

router.post("/capturepayment",auth,isStudent,capturePayment)
router.post("/verifysiganture",verifySignature)

module.exports = router;