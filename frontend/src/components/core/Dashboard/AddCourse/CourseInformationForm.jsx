import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { fetchCourseCategories } from "../../../../services/operations/courseDetailsAPI"


const CourseInformationForm = () => {

    const {course, editCourse} = useSelector((state)=>state.course)

    const { register, watch, handleSubmit, setValue, getValues, formState:{errors,isSubmitSuccessful} } = useForm()

    const [loading,setLoading] = useState(false)

    const [courseCategories, setCourseCategories] = useState([])

    const dispatch = useDispatch()
    
    useEffect(()=>{
        const getCategories = async() =>{
            setLoading(true)
            const categories = await fetchCourseCategories()
            if(categories.length > 0){
                setCourseCategories(categories)
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
    })

    const onSubmit = async(data)=>{
        
    }

  return (
    <div>
        
    </div>
  )
}

export default CourseInformationForm