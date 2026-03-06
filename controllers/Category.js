const Category = require("../models/Category")

//Create category handler function
exports.CreateCategory = async (req,res)=>{
    try {
        //fetch data
       const {name,description} = req.body
       
       //if not name or not description
       if(!name || !description){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
       }

       //create entry in db
       const categoryDetails = await Category.create({name:name,description:description})
       console.log(categoryDetails)
       //return response

       return res.status(200).json({
        success:true,
        message:"Category created successfully"
       })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get AllCategorys

exports.showAllCategory = async (req, res)=>{
    try {

        //all Categorys
        const allCategorys = await Category.find({},{name:true, description:true})
        res.status(200).json({
            success:true,
            message:"All categorys returns successfully",
            allCategorys:allCategorys
        })
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}