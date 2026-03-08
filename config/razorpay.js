const Razorpay = require("razorpay")
require("dotenv").config()
exports.instance = new Razorpay(
    {key_id: process.env.ROZARPAY_KEY, key_secret: process.env.ROZARPAY_SECRET })