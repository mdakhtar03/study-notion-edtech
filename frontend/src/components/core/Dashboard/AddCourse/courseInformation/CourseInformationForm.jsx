import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI"
import { FaIndianRupeeSign } from "react-icons/fa6";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn";
import { setStep } from "../../../../../reducer/slices/CourseSlice";
import CourseThumbnail from "./CourseThumbnail"
const CourseInformationForm = () => {

    const {course, editCourse} = useSelector((state)=>state.course)

    const { register, handleSubmit, setValue, getValues, formState:{errors} } = useForm()

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

        getCategories();
    },[])

    const onSubmit = async(data)=>{
        
    }
    console.log("COURSE CATIGORIES.............",courseCategories )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" rounded-lg bg-richblack-800
     border-richblack-700 p-6  ">
        <div className="flex flex-col">
            <label> Course Title <sup>*</sup> </label>
            <input id="courseTitle" placeholder="Enter Course Title" 
            {...register("courseTitle",{required:true})} className=" p-3 outline-none bg-richblack-700 rounded-lg w-full" />
            {
                errors.courseTitle && ( <span> Course Title is Required** </span>)
            }
        </div>
        <div className="flex flex-col">
            <label>Course Short Description <sup>*</sup> </label>
            <textarea id="courseShortDesc" placeholder="Enter Description" 
            {...register("courseShortDesc",{required:true})} className=" p-3 outline-none bg-richblack-700 rounded-lg w-full" />
            {
                errors.courseShortDesc && ( <span> Course Description is Required** </span>)
            }
        </div>
        <div className="flex flex-col relative">
            <label>Course Price<sup>*</sup> </label>
            <>
                    <input id="coursePrice" placeholder="Enter Course Price" 
                    {...register("coursePrice",{required:true})} className=" px-3 p-3 outline-none bg-richblack-700 rounded-lg w-full" />
                    {
                        errors.coursePrice && ( <span> Course Price is Required** </span>)
                    }
                    <FaIndianRupeeSign className=" absolute top-[55%] " />
            </>
        </div>
        <div className="flex flex-col">
            <label> Category <sup>*</sup> </label>
            <select 
            className="p-3 outline-none bg-richblack-700 rounded-lg" defaultValue={""}
             {...register("courseCategory",{required:true})}> 
                <option value="" disabled>Choose the Category</option>
             { 
                 !loading && courseCategories.map((category,index)=>(
                    <option key={index} > { category.name } </option>
                ))
             }
             </select>
             { errors.courseCategories && <span> Course Categories is Required** </span>}
        </div>
        {/* Create Tag Component */}
        {/* <TagInput 
                label="tags"
                name:"courseTags"
                palceholder
                register,
                errors,
                setValues
                getValues
         /> */}
         
         {/* Create a component for uploading and showing preview */}
         {/* <UploadThumnail/> */}
            <CourseThumbnail/>

         {/* Benefits  */}
         <div className="flex flex-col">
            <label> Benefits of the course <sup>*</sup> </label>
            <textarea placeholder="Enter Benefits of the course" 
            className="p-3 outline-none bg-richblack-700 rounded-lg"
                      id="coursebenefits" 
                      {...register("courseBenefits",{required:true})} 
            />
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
            <IconBtn text={!editCourse ? "Next" : "Save Changes"}  />
        </div>
    </form>
  )
}

export default CourseInformationForm