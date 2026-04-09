import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI"
import { FaIndianRupeeSign } from "react-icons/fa6";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn";
import { setStep,setCourses } from "../../../../../reducer/slices/CourseSlice";
import CourseThumbnail from "./CourseThumbnail"
import TagsInput from "./TagsInput"
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
const CourseInformationForm = () => {

    const {course, editCourse} = useSelector((state)=>state.course)

    const { register, handleSubmit, setValue, getValues, formState:{errors} } = useForm()
    const {token} = useSelector((state)=>state.auth)
    const [loading,setLoading] = useState(false)

    const [courseCategories, setCourseCategories] = useState([])

    const dispatch = useDispatch()
    
    useEffect(()=>{
        const getCategories = async() =>{
            setLoading(true)
            const result = await fetchCourseCategories()
        
            if(result.allCategorys.length > 0){
                setCourseCategories(result.allCategorys)
            }
            setLoading (false)
        }
        getCategories();
        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.categories)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }

    },[])

    const onSubmit = async(data)=>{
        if(editCourse){
           if(isFormUpdated()){
             const currentValues = getValues();
            const formData = new FormData();
            formData.append("courseId",course._id)
            if(currentValues.courseTitle !== course.courseName ){
                formData.append("courseName",data.courseTitle)
            }
            if(currentValues.courseShortDesc !== course.courseDescription ){
                formData.append("courseDescription",data.courseShortDesc)
            }
            if(currentValues.coursePrice !== course.price ){
                formData.append("price",data.coursePrice)
            }
            if(currentValues.courseTags !== course.tag ){
                formData.append("tag",data.courseTags)
            }
            if(currentValues.courseBenefits !== course.whatYouWillLearn ){
                formData.append("whatYouWillLearn",data.courseBenefits)
            }
            if(currentValues.courseCategory._id !== course.category._id ){
                formData.append("category",data.courseCategory)
            }
            if(currentValues.courseRequirements.toString() !== course.instructions.toString() ){
                formData.append("instructions",JSON.stringify(data.courseRequirements))
            }
           setLoading(true);
        //    const result = await editCourse()
           }
           else{
            toast.error("No Changes made so far")
           }
           return;
        }
        
        //create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("thumbnail", data.thumbnail)
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("status",COURSE_STATUS.DRAFT)

        setLoading(true);
        const result = await addCourseDetails(formData,token);
        if(result){
            dispatch(setStep(2));
            dispatch(setCourses(result));
        }
        setLoading(false);
        console.log("PRINTING FORMDATA >>>>>>>>>>>>>>>>>  ",formData)
        for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
        console.log("PRINTING DATa >>>>>>>>>>>>>>>>>  ",data)
    }



    // console.log("COURSE CATIGORIES.............",courseCategories )


    const isFormUpdated = ()=>{
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName || 
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseCategory._id !== course.category ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail 
         ){
            return true;
        }
        else{
            return false
        }
    }
    
    

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" rounded-lg bg-richblack-800
     border-richblack-700 p-6 flex flex-col gap-y-5  ">
        <div className="flex flex-col">
            <label> Course Title <sup className=' text-pink-200'>*</sup> </label>
            <input id="courseTitle" placeholder="Enter Course Title" 
            {...register("courseTitle",{required:true})} className=" p-3 outline-none bg-richblack-700 rounded-lg w-full" />
            {
                errors.courseTitle && ( <span className=' text-pink-200'> Course Title is Required** </span>)
            }
        </div>
        <div className="flex flex-col">
            <label>Course Short Description <sup className=' text-pink-200'>*</sup> </label>
            <textarea id="courseShortDesc" placeholder="Enter Description" 
            {...register("courseShortDesc",{required:true})} className=" p-3 outline-none bg-richblack-700 rounded-lg w-full" />
            {
                errors.courseShortDesc && ( <span className=' text-pink-200'> Course Description is Required** </span>)
            }
        </div>
        <div className="flex flex-col relative">
            <label>Course Price<sup className=' text-pink-200'>*</sup> </label>
            <>
                    <div className=" relative">
                            <input id="coursePrice" placeholder="Enter Course Price" 
                            {...register("coursePrice",{required:true})} className=" px-7 p-3 outline-none bg-richblack-700 rounded-lg w-full" />
                            <FaIndianRupeeSign className=" absolute top-4 left-2" />
                    </div>
                    {
                        errors.coursePrice && ( <span className=' text-pink-200'> Course Price is Required** </span>)
                    }
            </>
        </div>
        <div className="flex flex-col">
            <label> Category <sup className=' text-pink-200'>*</sup> </label>
            <select 
            className="p-3 outline-none bg-richblack-700 rounded-lg" defaultValue={""}
             {...register("courseCategory",{required:true})}> 
                <option value="" disabled>Choose the Category</option>
             { 
                 !loading && courseCategories.map((category,index)=>(
                    <option key={index} value={category._id} > { category.name } </option>
                ))
             }
             </select>
             { errors.courseCategories && <span> Course Categories is Required** </span>}
        </div>

        {/* Create Tag Component */}
        <TagsInput 
            label="Tags" name="courseTags" placeholder="Enter tags and press Enter" register={register}
            errors={errors} setValue={setValue} getValues={getValues}
        />
         
         {/* Create a component for uploading and showing preview */}
         {/* <UploadThumnail/> */}
            <CourseThumbnail label="Course Thumbnail" name="thumbnail" register={register}
                errors={errors} setValue={setValue} getValues={getValues} />

         {/* Benefits  */}
         <div className="flex flex-col">
            <label> Benefits of the course <sup className=' text-pink-200'>*</sup> </label>
            <textarea placeholder="Enter Benefits of the course" 
            className="p-3 outline-none bg-richblack-700 rounded-lg"
                      id="coursebenefits" 
                      {...register("courseBenefits",{required:true})} 
            />
            { errors.courseBenefits && <span className=' text-pink-200'> Input Benefits of the course </span>}
         </div>
         <RequirementField name="courseRequirements"
                           label="Requirements/Instructions" 
                           register={register}
                           errors={errors}
                           setValue={setValue}
                           getValues={getValues}
                             />
        <div>
            {
                editCourse && ( 
                    <button className=" flex items-center gap-x-2 bg-richblack-300"
                    onClick={()=>dispatch(setStep(2))}>
                         Continue without Saving
                    </button>
                 )
            }
            <IconBtn type={"submit"} isstyle={true} showIcon={false} text={!editCourse ? "Next" :"Save Changes"} />
        </div>
    </form>
  )
}

export default CourseInformationForm